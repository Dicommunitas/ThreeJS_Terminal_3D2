
/**
 * Custom hook para gerenciar o estado e a lógica de seleção e hover de equipamentos na cena 3D.
 *
 * Responsabilidades:
 * - Manter o estado dos equipamentos atualmente selecionados (`selectedEquipmentTags`):
 *   Um array de strings contendo as tags dos equipamentos selecionados.
 * - Manter o estado do equipamento atualmente sob o cursor do mouse (`hoveredEquipmentTag`):
 *   A tag do equipamento em hover, ou null se nenhum.
 * - Fornecer funções para manipular seleção e hover:
 *   - `handleEquipmentClick`: Processa um clique na cena. Pode selecionar um equipamento,
 *     adicionar/remover da seleção múltipla (com Ctrl/Cmd), ou limpar a seleção.
 *     Integra-se com `useCommandHistory` para registrar a ação de seleção.
 *   - `handleSetHoveredEquipmentTag`: Define diretamente qual equipamento está em hover.
 *   - `selectTagsBatch`: Permite a seleção programática de um conjunto de equipamentos,
 *     útil para funcionalidades como "focar e selecionar sistema". Também se integra
 *     com `useCommandHistory`.
 * - Utilizar o hook `useToast` para fornecer feedback ao usuário sobre as operações de seleção.
 */
"use client";

import { useState, useCallback } from 'react';
import type { Command, Equipment } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

/**
 * Props para o hook `useEquipmentSelectionManager`.
 * @interface UseEquipmentSelectionManagerProps
 * @property {Equipment[]} equipmentData - Lista completa de todos os equipamentos. Usada para buscar nomes
 *                                       de equipamentos para mensagens de feedback (toasts).
 * @property {(command: Command) => void} executeCommand - Função para executar comandos (e.g., seleção de equipamento)
 *                                                        e adicioná-los ao histórico de undo/redo.
 */
export interface UseEquipmentSelectionManagerProps {
  equipmentData: Equipment[];
  executeCommand: (command: Command) => void;
}

/**
 * Retorno do hook `useEquipmentSelectionManager`.
 * @interface UseEquipmentSelectionManagerReturn
 * @property {string[]} selectedEquipmentTags - Array das tags dos equipamentos atualmente selecionados.
 * @property {string | null} hoveredEquipmentTag - Tag do equipamento atualmente sob o cursor do mouse, ou null.
 * @property {(tag: string | null, isMultiSelectModifierPressed: boolean) => void} handleEquipmentClick - Manipulador para eventos de clique em equipamentos
 *                                                                                                       (ou em espaço vazio para deselecionar).
 * @property {(tag: string | null) => void} handleSetHoveredEquipmentTag - Define o equipamento atualmente em hover.
 * @property {(tagsToSelect: string[], operationDescription?: string) => void} selectTagsBatch - Seleciona programaticamente um lote de equipamentos.
 *                                                                                               `operationDescription` é usado para o histórico de comandos.
 */
export interface UseEquipmentSelectionManagerReturn {
  selectedEquipmentTags: string[];
  hoveredEquipmentTag: string | null;
  handleEquipmentClick: (tag: string | null, isMultiSelectModifierPressed: boolean) => void;
  handleSetHoveredEquipmentTag: (tag: string | null) => void;
  selectTagsBatch: (tagsToSelect: string[], operationDescription?: string) => void;
}

/**
 * Hook customizado para gerenciar a seleção e o estado de hover dos equipamentos.
 * Encapsula a lógica de seleção única/múltipla, hover, seleção em lote e integração com o histórico de comandos.
 * @param {UseEquipmentSelectionManagerProps} props As props do hook.
 * @returns {UseEquipmentSelectionManagerReturn} O estado da seleção e as funções para manipulá-la.
 */
export function useEquipmentSelectionManager({
  equipmentData,
  executeCommand,
}: UseEquipmentSelectionManagerProps): UseEquipmentSelectionManagerReturn {
  const [selectedEquipmentTags, setSelectedEquipmentTags] = useState<string[]>([]);
  const [hoveredEquipmentTag, setHoveredEquipmentTag] = useState<string | null>(null);
  const { toast } = useToast();

  /**
   * Manipula o clique em um equipamento na cena 3D para seleção.
   * Gerencia seleção única, múltipla (com Ctrl/Cmd) e deseleção.
   * Cria e executa um comando para o histórico de Undo/Redo.
   * @param {string | null} tag - A tag do equipamento clicado, ou null se o clique foi em espaço vazio.
   * @param {boolean} isMultiSelectModifierPressed - True se Ctrl/Cmd (ou Meta) foi pressionado durante o clique.
   */
  const handleEquipmentClick = useCallback((tag: string | null, isMultiSelectModifierPressed: boolean) => {
    const oldSelection = [...selectedEquipmentTags];
    let newSelection: string[];
    let toastMessage = "";
    const equipmentName = tag ? (equipmentData.find(e => e.tag === tag)?.name || tag) : '';

    if (isMultiSelectModifierPressed) { // Lógica para seleção múltipla
      if (tag) { // Se clicou em um equipamento
        if (oldSelection.includes(tag)) { // Se já estava selecionado, remove
          newSelection = oldSelection.filter(t => t !== tag);
          toastMessage = `Equipamento ${equipmentName} removido da seleção.`;
        } else { // Se não estava selecionado, adiciona
          newSelection = [...oldSelection, tag];
          toastMessage = `Equipamento ${equipmentName} adicionado à seleção. ${newSelection.length} itens selecionados.`;
        }
      } else { // Se clicou em espaço vazio com Ctrl/Cmd, mantém a seleção atual
        newSelection = oldSelection; 
      }
    } else { // Lógica para seleção única
      if (tag) { // Se clicou em um equipamento
        if (oldSelection.length === 1 && oldSelection[0] === tag) {
          // Clicou no mesmo item já selecionado unicamente, mantém a seleção (ou poderia deselecionar - depende da UX desejada)
          newSelection = oldSelection; 
        } else { // Seleciona apenas este item
          newSelection = [tag];
          toastMessage = `${equipmentName} selecionado.`;
        }
      } else { // Se clicou em espaço vazio (sem Ctrl/Cmd), limpa a seleção
        newSelection = [];
        if (oldSelection.length > 0) { // Só mostra toast se havia algo selecionado antes
          toastMessage = "Seleção limpa.";
        }
      }
    }
    
    // Compara as seleções (ordenadas) para evitar comandos duplicados se a seleção não mudou
    const oldSelectionSortedJSON = JSON.stringify([...oldSelection].sort());
    const newSelectionSortedJSON = JSON.stringify([...newSelection].sort());

    if (oldSelectionSortedJSON === newSelectionSortedJSON) {
      return; // Nenhuma mudança real na seleção
    }

    const commandDescription = toastMessage ||
                               (newSelection.length > 0 ? `Selecionados ${newSelection.length} equipamento(s).` : (oldSelection.length > 0 ? "Seleção limpa." : "Nenhuma seleção."));
    
    const command: Command = {
      id: `select-equipment-${Date.now()}`,
      type: 'EQUIPMENT_SELECT',
      description: commandDescription,
      execute: () => {
        setSelectedEquipmentTags(newSelection);
        if(commandDescription && commandDescription !== "Nenhuma seleção.") {
            // O toast é atrasado levemente para garantir que o estado do React seja atualizado antes
            // que o toast tente ler alguma informação potencialmente dependente desse estado.
            setTimeout(() => {
              toast({ title: "Seleção", description: commandDescription });
            }, 0);
        }
      },
      undo: () => {
        setSelectedEquipmentTags(oldSelection);
        const undoDescription = oldSelection.length > 0 ? `Seleção anterior com ${oldSelection.length} itens restaurada.` : "Histórico de seleção limpo.";
        setTimeout(() => {
          toast({ title: "Seleção Desfeita", description: undoDescription });
        }, 0);
      },
    };
    executeCommand(command);

  }, [selectedEquipmentTags, equipmentData, executeCommand, toast]);

  /**
   * Define diretamente a tag do equipamento sob o cursor.
   * Esta função é geralmente chamada em resposta a eventos de mousemove na cena 3D.
   * @param {string | null} tag A tag do equipamento, ou null se nenhum estiver sob o cursor.
   */
  const handleSetHoveredEquipmentTag = useCallback((tag: string | null) => {
    setHoveredEquipmentTag(tag);
  }, []);

  /**
   * Seleciona programaticamente um conjunto de tags de equipamento.
   * Usado, por exemplo, ao focar em um sistema para selecionar todos os seus equipamentos.
   * Cria e executa um comando para o histórico de Undo/Redo.
   * @param {string[]} tagsToSelect - Array de tags de equipamento a serem selecionadas.
   * @param {string} [operationDescription] - Descrição opcional para o comando no histórico (e para o toast).
   *                                          Padrão: "Selecionados X equipamentos em lote."
   */
  const selectTagsBatch = useCallback((tagsToSelect: string[], operationDescription?: string) => {
    const oldSelection = [...selectedEquipmentTags];
    // Garante que não haja duplicatas e ordena para comparação consistente
    const newSelection = [...new Set(tagsToSelect)].sort();

    if (JSON.stringify(oldSelection.sort()) === JSON.stringify(newSelection)) {
      return; // Nenhuma mudança real na seleção
    }

    const desc = operationDescription || `Selecionados ${newSelection.length} equipamentos em lote.`;

    const command: Command = {
      id: `batch-select-equipment-${Date.now()}`,
      type: 'EQUIPMENT_SELECT',
      description: desc,
      execute: () => {
        setSelectedEquipmentTags(newSelection);
        if (desc) {
          setTimeout(() => {
            toast({ title: "Seleção em Lote", description: desc });
          }, 0);
        }
      },
      undo: () => {
        setSelectedEquipmentTags(oldSelection);
        const undoDescription = `Seleção em lote anterior com ${oldSelection.length} itens restaurada.`;
        setTimeout(() => {
          toast({ title: "Seleção em Lote Desfeita", description: undoDescription });
        }, 0);
      },
    };
    executeCommand(command);
  }, [selectedEquipmentTags, executeCommand, toast]);


  return {
    selectedEquipmentTags,
    hoveredEquipmentTag,
    handleEquipmentClick,
    handleSetHoveredEquipmentTag,
    selectTagsBatch,
  };
}
