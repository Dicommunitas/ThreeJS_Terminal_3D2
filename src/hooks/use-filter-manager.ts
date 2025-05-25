
/**
 * Custom hook para gerenciar os estados de filtragem e a lógica de filtragem de equipamentos.
 *
 * Responsabilidades:
 * - Manter os estados para os critérios de filtro:
 *   - `searchTerm`: Termo de busca textual inserido pelo usuário.
 *   - `selectedSistema`: O sistema selecionado para filtrar os equipamentos.
 *   - `selectedArea`: A área selecionada para filtrar os equipamentos.
 * - Derivar listas de opções únicas disponíveis para os filtros de Sistema e Área:
 *   - `availableSistemas`: Obtém todos os valores únicos de `sistema` dos equipamentos,
 *     adiciona uma opção "All" (para mostrar todos os sistemas) e ordena a lista.
 *   - `availableAreas`: Similarmente para `area`.
 * - Calcular a lista de equipamentos que correspondem aos critérios de filtro atuais (`filteredEquipment`):
 *   Utiliza a função `getFilteredEquipment` de `src/core/logic/equipment-filter.ts`,
 *   passando os estados de filtro atuais.
 * - Fornecer as funções setter do React para `searchTerm`, `selectedSistema`, e `selectedArea`,
 *   permitindo que outros componentes modifiquem os critérios de filtro.
 */
'use client';

import { useState, useMemo, type Dispatch, type SetStateAction } from 'react';
import type { Equipment } from '@/lib/types';
import { getFilteredEquipment, type EquipmentFilterCriteria } from '@/core/logic/equipment-filter';

/**
 * Props para o hook `useFilterManager`.
 * @interface UseFilterManagerProps
 * @property {Equipment[]} allEquipment - A lista completa de todos os equipamentos que podem ser filtrados.
 */
interface UseFilterManagerProps {
  allEquipment: Equipment[];
}

/**
 * Retorno do hook `useFilterManager`.
 * @interface UseFilterManagerReturn
 * @property {string} searchTerm - O termo de busca textual atualmente aplicado.
 * @property {Dispatch<SetStateAction<string>>} setSearchTerm - Função para atualizar o `searchTerm`.
 * @property {string} selectedSistema - O sistema atualmente selecionado para filtro (e.g., "GA", "All").
 * @property {Dispatch<SetStateAction<string>>} setSelectedSistema - Função para atualizar o `selectedSistema`.
 * @property {string} selectedArea - A área atualmente selecionada para filtro (e.g., "Área 31", "All").
 * @property {Dispatch<SetStateAction<string>>} setSelectedArea - Função para atualizar o `selectedArea`.
 * @property {string[]} availableSistemas - Lista ordenada de sistemas únicos disponíveis para seleção no filtro, incluindo "All".
 * @property {string[]} availableAreas - Lista ordenada de áreas únicas disponíveis para seleção no filtro, incluindo "All".
 * @property {Equipment[]} filteredEquipment - A lista de equipamentos resultante após a aplicação de todos os filtros ativos.
 */
export interface UseFilterManagerReturn {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  selectedSistema: string;
  setSelectedSistema: Dispatch<SetStateAction<string>>;
  selectedArea: string;
  setSelectedArea: Dispatch<SetStateAction<string>>;
  availableSistemas: string[];
  availableAreas: string[];
  filteredEquipment: Equipment[];
}

/**
 * Hook customizado para gerenciar a lógica de filtragem de equipamentos.
 * Encapsula os estados dos filtros (termo de busca, sistema, área),
 * deriva as listas de opções de filtro disponíveis a partir dos dados dos equipamentos,
 * e calcula a lista resultante de equipamentos filtrados.
 *
 * @param {UseFilterManagerProps} props As propriedades para o hook, incluindo `allEquipment` (a lista completa de equipamentos).
 * @returns {UseFilterManagerReturn} Um objeto contendo o estado dos filtros, as funções para atualizá-los,
 *                                 as listas de opções de filtro disponíveis e a lista de equipamentos filtrados.
 */
export function useFilterManager({ allEquipment }: UseFilterManagerProps): UseFilterManagerReturn {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSistema, setSelectedSistema] = useState('All'); // "All" indica sem filtro por sistema
  const [selectedArea, setSelectedArea] = useState('All');     // "All" indica sem filtro por área

  /**
   * Lista de sistemas únicos disponíveis, derivada de `allEquipment`.
   * Inclui "All" como a primeira opção e é ordenada alfabeticamente.
   * Memoizada para otimizar performance, recalculando apenas se `allEquipment` mudar.
   */
  const availableSistemas = useMemo(() => {
    const sistemas = new Set<string>(['All']); // Inicia com "All"
    allEquipment.forEach(equip => {
      if (equip.sistema) sistemas.add(equip.sistema);
    });
    return Array.from(sistemas).sort((a, b) => (a === 'All' ? -1 : b === 'All' ? 1 : a.localeCompare(b)));
  }, [allEquipment]);

  /**
   * Lista de áreas únicas disponíveis, derivada de `allEquipment`.
   * Inclui "All" como a primeira opção e é ordenada alfabeticamente.
   * Memoizada para otimizar performance.
   */
  const availableAreas = useMemo(() => {
    const areas = new Set<string>(['All']); // Inicia com "All"
    allEquipment.forEach(equip => {
      if (equip.area) areas.add(equip.area);
    });
    return Array.from(areas).sort((a, b) => (a === 'All' ? -1 : b === 'All' ? 1 : a.localeCompare(b)));
  }, [allEquipment]);

  /**
   * Lista de equipamentos filtrada com base nos critérios atuais (`searchTerm`, `selectedSistema`, `selectedArea`).
   * Utiliza a função `getFilteredEquipment` para aplicar a lógica de filtragem combinada.
   * Memoizada para recalcular apenas quando os critérios de filtro ou `allEquipment` mudarem.
   */
  const filteredEquipment = useMemo(() => {
    const criteria: EquipmentFilterCriteria = {
      searchTerm,
      selectedSistema,
      selectedArea,
    };
    // Garante que allEquipment seja um array antes de filtrar
    return getFilteredEquipment(Array.isArray(allEquipment) ? allEquipment : [], criteria);
  }, [allEquipment, searchTerm, selectedSistema, selectedArea]);

  return {
    searchTerm,
    setSearchTerm,
    selectedSistema,
    setSelectedSistema,
    selectedArea,
    setSelectedArea,
    availableSistemas,
    availableAreas,
    filteredEquipment,
  };
}
