
/**
 * @fileOverview Custom hook para gerenciar o estado e a lógica de seleção e hover de equipamentos.
 *
 * Responsabilidades:
 * - Manter o estado dos equipamentos selecionados (`selectedEquipmentTags`).
 * - Manter o estado do equipamento sob o cursor (`hoveredEquipmentTag`).
 * - Fornecer funções para:
 *   - Manipular a seleção via clique (única/múltipla) na cena 3D (`handleEquipmentClick`).
 *   - Definir o equipamento sob o cursor (`handleSetHoveredEquipmentTag`).
 *   - Realizar seleção em lote de equipamentos (`selectTagsBatch`), útil para focar em sistemas.
 * - Integrar as ações de seleção com o sistema de histórico de comandos (`useCommandHistory`)
 *   para permitir operações de desfazer/refazer.
 * - Utilizar `useToast` para fornecer feedback ao usuário sobre as operações de seleção.
 *
 * Exporta:
 * - `useEquipmentSelectionManager`: O hook customizado.
 * - `UseEquipmentSelectionManagerProps`: Props para o hook.
 * - `UseEquipmentSelectionManagerReturn`: Tipo de retorno do hook.
 */
"use client";

import { useState, useCallback } from 'react';
import type { Command, Equipment } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

/**
 * Props para o hook useEquipmentSelectionManager.
 * @interface UseEquipmentSelectionManagerProps
 * @property {Equipment[]} equipmentData - Lista completa de equipamentos, usada para buscar nomes para toasts.
 * @property {(command: Command) => void} executeCommand - Função para executar comandos e adicioná-los ao histórico.
 */
export interface UseEquipmentSelectionManagerProps {
  equipmentData: Equipment[];
  executeCommand: (command: Command) => void;
}

/**
 * Retorno do hook useEquipmentSelectionManager.
 * @interface UseEquipmentSelectionManagerReturn
 * @property {string[]} selectedEquipmentTags - Array das tags dos equipamentos atualmente selecionados.
 * @property {string | null} hoveredEquipmentTag - Tag do equipamento atualmente sob o cursor, ou null.
 * @property {(tag: string | null, isMultiSelectModifierPressed: boolean) => void} handleEquipmentClick - Manipula o clique em um equipamento para seleção.
 * @property {(tag: string | null) => void} handleSetHoveredEquipmentTag - Define o equipamento sob o cursor.
 * @property {(tagsToSelect: string[], operationDescription?: string) => void} selectTagsBatch - Seleciona um lote de equipamentos programaticamente.
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
 * Encapsula a lógica de seleção única/múltipla, hover, seleção em lote e integração com o histórico.
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
   * @param {boolean} isMultiSelectModifierPressed - True se Ctrl/Cmd foi pressionado durante o clique.
   */
  const handleEquipmentClick = useCallback((tag: string | null, isMultiSelectModifierPressed: boolean) => {
    const oldSelection = [...selectedEquipmentTags];
    let newSelection: string[];
    let toastMessage = "";
    const equipmentName = tag ? (equipmentData.find(e => e.tag === tag)?.name || tag) : '';

    if (isMultiSelectModifierPressed) {
      if (tag) {
        if (oldSelection.includes(tag)) {
          newSelection = oldSelection.filter(t => t !== tag);
          toastMessage = `Equipamento ${equipmentName} removido da seleção.`;
        } else {
          newSelection = [...oldSelection, tag];
          toastMessage = `Equipamento ${equipmentName} adicionado à seleção. ${newSelection.length} itens selecionados.`;
        }
      } else {
        newSelection = oldSelection; 
      }
    } else { 
      if (tag) { 
        if (oldSelection.length === 1 && oldSelection[0] === tag) {
          newSelection = oldSelection; 
        } else {
          newSelection = [tag];
          toastMessage = `${equipmentName} selecionado.`;
        }
      } else { 
        newSelection = [];
        if (oldSelection.length > 0) { 
          toastMessage = "Seleção limpa.";
        }
      }
    }
    
    const oldSelectionSortedJSON = JSON.stringify([...oldSelection].sort());
    const newSelectionSortedJSON = JSON.stringify([...newSelection].sort());

    if (oldSelectionSortedJSON === newSelectionSortedJSON) {
      return;
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
   * @param {string | null} tag A tag do equipamento, ou null se nenhum estiver sob o cursor.
   */
  const handleSetHoveredEquipmentTag = useCallback((tag: string | null) => {
    setHoveredEquipmentTag(tag);
  }, []);

  /**
   * Seleciona programaticamente um conjunto de tags de equipamento.
   * Usado, por exemplo, ao focar em um sistema.
   * Cria e executa um comando para o histórico de Undo/Redo.
   * @param {string[]} tagsToSelect - Array de tags de equipamento a serem selecionadas.
   * @param {string} [operationDescription] - Descrição opcional para o comando no histórico.
   */
  const selectTagsBatch = useCallback((tagsToSelect: string[], operationDescription?: string) => {
    const oldSelection = [...selectedEquipmentTags];
    const newSelection = [...new Set(tagsToSelect)].sort();

    if (JSON.stringify(oldSelection.sort()) === JSON.stringify(newSelection)) {
      return;
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

