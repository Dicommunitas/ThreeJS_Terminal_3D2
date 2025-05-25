
/**
 * Custom hook responsável por buscar, armazenar e gerenciar os dados dos equipamentos
 * utilizados na aplicação. Este hook atua como a "fonte da verdade" para os dados brutos
 * dos equipamentos.
 *
 * Responsabilidades:
 * - Inicializar e manter o estado da lista completa de equipamentos (`equipmentData` state),
 *   utilizando `initialEquipment` de `src/core/data/initial-data.ts` como valor inicial.
 * - Fornecer funções para modificar propriedades específicas dos equipamentos:
 *   - `handleOperationalStateChange`: Atualiza o `operationalState` de um equipamento
 *     identificado por sua `equipmentTag`.
 *   - `handleProductChange`: Atualiza o `product` de um equipamento identificado
 *     por sua `equipmentTag`.
 * - Utilizar o hook `useToast` para fornecer feedback visual ao usuário após a modificação
 *   de dados de um equipamento.
 *
 * Nota: Este hook lida com a modificação direta dos dados dos equipamentos. A integração com
 *       o sistema de histórico de comandos (undo/redo) para essas modificações não está
 *       implementada aqui e precisaria ser adicionada se desejado, envolvendo a criação de
 *       comandos específicos para alterações de estado/produto.
 */
import { useState, useCallback } from 'react';
import type { Equipment } from '@/lib/types';
import { initialEquipment } from '@/core/data/initial-data'; // Dados iniciais dos equipamentos
import { useToast } from '@/hooks/use-toast'; // Para feedback ao usuário

/**
 * Retorno do hook `useEquipmentDataManager`.
 * @interface UseEquipmentDataManagerReturn
 * @property {Equipment[]} equipmentData - A lista atual de todos os equipamentos. Esta é a "fonte da verdade".
 * @property {(equipmentTag: string, newState: string) => void} handleOperationalStateChange - Função para modificar
 *                                                                                              o estado operacional
 *                                                                                              de um equipamento específico.
 * @property {(equipmentTag: string, newProduct: string) => void} handleProductChange - Função para modificar o produto
 *                                                                                       associado a um equipamento específico.
 */
export interface UseEquipmentDataManagerReturn {
  equipmentData: Equipment[];
  handleOperationalStateChange: (equipmentTag: string, newState: string) => void;
  handleProductChange: (equipmentTag: string, newProduct: string) => void;
}

/**
 * Hook customizado para gerenciar os dados dos equipamentos (a "fonte da verdade" dos equipamentos).
 * Inicializa os dados com `initialEquipment` e fornece funções para modificar
 * propriedades como estado operacional e produto.
 *
 * @returns {UseEquipmentDataManagerReturn} Um objeto contendo os dados dos equipamentos
 *                                          e funções para modificá-los.
 */
export function useEquipmentDataManager(): UseEquipmentDataManagerReturn {
  const [equipmentData, setEquipmentData] = useState<Equipment[]>(initialEquipment);
  const { toast } = useToast();

  /**
   * Manipula a alteração do estado operacional de um equipamento.
   * Encontra o equipamento pela `equipmentTag`, atualiza seu `operationalState`
   * no estado `equipmentData`, e exibe um toast de confirmação.
   * @param {string} equipmentTag - A tag do equipamento a ser modificado.
   * @param {string} newState - O novo estado operacional para o equipamento.
   */
  const handleOperationalStateChange = useCallback((equipmentTag: string, newState: string) => {
    setEquipmentData(prevData =>
      prevData.map(equip =>
        equip.tag === equipmentTag ? { ...equip, operationalState: newState } : equip
      )
    );
    const equip = equipmentData.find(e => e.tag === equipmentTag); // Encontra para usar o nome no toast
    toast({ title: "Estado Atualizado", description: `Estado de ${equip?.name || 'Equipamento'} alterado para ${newState}.` });
  }, [equipmentData, toast]); // `equipmentData` é dependência para pegar o nome atualizado no toast, embora setEquipmentData seja assíncrono.

  /**
   * Manipula a alteração do produto de um equipamento.
   * Encontra o equipamento pela `equipmentTag`, atualiza seu `product`
   * no estado `equipmentData`, e exibe um toast de confirmação.
   * @param {string} equipmentTag - A tag do equipamento a ser modificado.
   * @param {string} newProduct - O novo produto para o equipamento.
   */
  const handleProductChange = useCallback((equipmentTag: string, newProduct: string) => {
    setEquipmentData(prevData =>
      prevData.map(equip =>
        equip.tag === equipmentTag ? { ...equip, product: newProduct } : equip
      )
    );
    const equip = equipmentData.find(e => e.tag === equipmentTag); // Encontra para usar o nome no toast
    toast({ title: "Produto Atualizado", description: `Produto de ${equip?.name || 'Equipamento'} alterado para ${newProduct}.` });
  }, [equipmentData, toast]); // `equipmentData` é dependência pelo mesmo motivo acima.

  return {
    equipmentData,
    handleOperationalStateChange,
    handleProductChange,
  };
}
