
/**
 * Custom hook para gerenciar o estado e a lógica das anotações textuais dos equipamentos.
 * Cada equipamento pode ter no máximo uma anotação.
 *
 * Responsabilidades:
 * - Manter a lista de todas as anotações (`annotations` state).
 * - Controlar a visibilidade do diálogo de adição/edição de anotação (`isAnnotationDialogOpen` state).
 * - Rastrear qual equipamento está sendo alvo da anotação (`annotationTargetEquipment` state).
 * - Manter os dados da anotação que está sendo editada (`editingAnnotation` state).
 * - Fornecer funções para:
 *   - `handleOpenAnnotationDialog`: Abrir o diálogo para um equipamento específico, pré-populando com
 *     a anotação existente, se houver.
 *   - `handleSaveAnnotation`: Salvar (criar ou atualizar) uma anotação. Registra a data/hora da
 *     criação/modificação e exibe um toast de feedback.
 *   - `handleDeleteAnnotation`: Excluir a anotação de um equipamento e exibir feedback.
 *   - `getAnnotationForEquipment`: Recuperar a anotação de um equipamento específico pela sua tag.
 * - Utilizar o hook `useToast` para fornecer feedback ao usuário sobre as operações.
 *
 * Nota: Este hook não gerencia o histórico de comandos (undo/redo) para operações de anotação.
 *       A integração com undo/redo para anotações precisaria ser adicionada se desejado.
 */
"use client";

import { useState, useCallback } from 'react';
import type { Annotation, Equipment } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

/**
 * Props para o hook `useAnnotationManager`.
 * @interface UseAnnotationManagerProps
 * @property {Annotation[]} [initialAnnotations=[]] - Lista inicial opcional de anotações para popular o estado.
 * @property {Equipment[]} equipmentData - Lista completa de todos os equipamentos. Usada para buscar nomes de
 *                                       equipamentos para mensagens de feedback (toasts) e para validar alvos.
 */
export interface UseAnnotationManagerProps {
  initialAnnotations?: Annotation[];
  equipmentData: Equipment[];
}

/**
 * Retorno do hook `useAnnotationManager`.
 * @interface UseAnnotationManagerReturn
 * @property {Annotation[]} annotations - A lista atual de todas as anotações.
 * @property {React.Dispatch<React.SetStateAction<Annotation[]>>} setAnnotations - Função para definir diretamente a lista de anotações (geralmente usada internamente ou para inicialização).
 * @property {boolean} isAnnotationDialogOpen - Indica se o diálogo de anotação está aberto.
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setIsAnnotationDialogOpen - Função para definir o estado de abertura/fechamento do diálogo.
 * @property {Equipment | null} annotationTargetEquipment - O equipamento que é o alvo atual para adicionar/editar uma anotação.
 * @property {Annotation | null} editingAnnotation - A anotação que está atualmente em edição no diálogo (null se for uma nova anotação).
 * @property {(equipment: Equipment | null) => void} handleOpenAnnotationDialog - Abre o diálogo de anotação para o equipamento fornecido.
 * @property {(text: string) => void} handleSaveAnnotation - Salva (cria ou atualiza) a anotação para o `annotationTargetEquipment`.
 * @property {(equipmentTag: string) => void} handleDeleteAnnotation - Exclui a anotação associada à tag do equipamento fornecida.
 * @property {(equipmentTag: string | null) => Annotation | null} getAnnotationForEquipment - Retorna a anotação para a tag do equipamento fornecida, ou null se não existir.
 */
export interface UseAnnotationManagerReturn {
  annotations: Annotation[];
  setAnnotations: React.Dispatch<React.SetStateAction<Annotation[]>>;
  isAnnotationDialogOpen: boolean;
  setIsAnnotationDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  annotationTargetEquipment: Equipment | null;
  editingAnnotation: Annotation | null;
  handleOpenAnnotationDialog: (equipment: Equipment | null) => void;
  handleSaveAnnotation: (text: string) => void;
  handleDeleteAnnotation: (equipmentTag: string) => void;
  getAnnotationForEquipment: (equipmentTag: string | null) => Annotation | null;
}

/**
 * Hook customizado para gerenciar anotações textuais associadas a equipamentos.
 * Permite adicionar, editar e excluir uma anotação por equipamento.
 * @param {UseAnnotationManagerProps} props As props do hook.
 * @returns {UseAnnotationManagerReturn} Um objeto contendo o estado das anotações e funções para manipulá-las.
 */
export function useAnnotationManager({ initialAnnotations = [], equipmentData }: UseAnnotationManagerProps): UseAnnotationManagerReturn {
  const [annotations, setAnnotations] = useState<Annotation[]>(initialAnnotations);
  const [isAnnotationDialogOpen, setIsAnnotationDialogOpen] = useState(false);
  const [annotationTargetEquipment, setAnnotationTargetEquipment] = useState<Equipment | null>(null);
  const [editingAnnotation, setEditingAnnotation] = useState<Annotation | null>(null);
  const { toast } = useToast();

  /**
   * Abre o diálogo de anotação para um equipamento específico.
   * Se o equipamento já possui uma anotação, preenche o diálogo para edição.
   * Se nenhum equipamento for fornecido ou o equipamento não for encontrado, exibe um toast de erro.
   * @param {Equipment | null} equipment O equipamento para o qual a anotação será gerenciada.
   */
  const handleOpenAnnotationDialog = useCallback((equipment: Equipment | null) => {
    if (equipment) {
      const existing = annotations.find(a => a.equipmentTag === equipment.tag);
      setEditingAnnotation(existing || null);
      setAnnotationTargetEquipment(equipment);
      setIsAnnotationDialogOpen(true);
    } else {
      toast({ title: "Nenhum Equipamento Selecionado", description: "Por favor, selecione um equipamento para gerenciar sua anotação.", variant: "destructive" });
    }
  }, [annotations, toast]);

  /**
   * Salva uma anotação (nova ou existente) para o `annotationTargetEquipment`.
   * Atualiza a data de criação/modificação (`createdAt`) da anotação.
   * Fecha o diálogo e limpa os estados de edição após salvar.
   * Exibe um toast de confirmação.
   * @param {string} text O texto da anotação a ser salvo.
   */
  const handleSaveAnnotation = useCallback((text: string) => {
    if (!annotationTargetEquipment) return;

    const equipmentName = annotationTargetEquipment.name;
    const currentDate = new Date().toISOString(); // Formato ISO 8601 para data/hora

    setAnnotations(prevAnnotations => {
      const existingAnnotationIndex = prevAnnotations.findIndex(a => a.equipmentTag === annotationTargetEquipment.tag);
      let newAnnotationsList: Annotation[];
      let toastDescription: string;

      if (existingAnnotationIndex > -1) {
        // Atualiza anotação existente
        newAnnotationsList = [...prevAnnotations];
        newAnnotationsList[existingAnnotationIndex] = {
          ...newAnnotationsList[existingAnnotationIndex],
          text: text,
          createdAt: currentDate, // Atualiza data de modificação
        };
        toastDescription = `Anotação para ${equipmentName} atualizada.`;
      } else {
        // Cria nova anotação
        const newAnnotation: Annotation = {
          equipmentTag: annotationTargetEquipment.tag,
          text,
          createdAt: currentDate,
        };
        newAnnotationsList = [...prevAnnotations, newAnnotation];
        toastDescription = `Anotação para ${equipmentName} adicionada.`;
      }
      toast({ title: "Anotação Salva", description: toastDescription });
      return newAnnotationsList;
    });

    setIsAnnotationDialogOpen(false);
    setEditingAnnotation(null);
    setAnnotationTargetEquipment(null);
  }, [annotationTargetEquipment, toast]);

  /**
   * Exclui a anotação de um equipamento específico.
   * Exibe um toast de confirmação ou de erro se nenhuma anotação for encontrada.
   * Se o diálogo de anotação estava aberto para o equipamento excluído, ele é fechado.
   * @param {string} equipmentTag A tag do equipamento cuja anotação será excluída.
   */
  const handleDeleteAnnotation = useCallback((equipmentTag: string) => {
    const equipment = equipmentData.find(e => e.tag === equipmentTag);
    if (!equipment) return; // Equipamento não encontrado, não faz nada

    setAnnotations(prevAnnotations => {
      const newAnnotationsList = prevAnnotations.filter(a => a.equipmentTag !== equipmentTag);
      if (prevAnnotations.length === newAnnotationsList.length) {
        // Nenhuma anotação foi removida, significa que não existia
        toast({ title: "Nenhuma Anotação", description: `Nenhuma anotação encontrada para ${equipment.name} para excluir.`, variant: "destructive" });
        return prevAnnotations;
      }
      toast({ title: "Anotação Excluída", description: `Anotação para ${equipment.name} foi excluída.` });
      return newAnnotationsList;
    });

    // Se o diálogo estava aberto para este equipamento, fecha e limpa
    if (annotationTargetEquipment?.tag === equipmentTag) {
        setIsAnnotationDialogOpen(false);
        setEditingAnnotation(null);
        setAnnotationTargetEquipment(null);
    }
  }, [toast, equipmentData, annotationTargetEquipment]);

  /**
   * Obtém a anotação para um equipamento específico.
   * @param {string | null} equipmentTag A tag do equipamento. Se null, retorna null.
   * @returns {Annotation | null} A anotação encontrada, ou null se não existir nenhuma para a tag fornecida.
   */
  const getAnnotationForEquipment = useCallback((equipmentTag: string | null): Annotation | null => {
    if (!equipmentTag) return null;
    return annotations.find(a => a.equipmentTag === equipmentTag) || null;
  }, [annotations]);

  return {
    annotations,
    setAnnotations,
    isAnnotationDialogOpen,
    setIsAnnotationDialogOpen,
    annotationTargetEquipment,
    editingAnnotation,
    handleOpenAnnotationDialog,
    handleSaveAnnotation,
    handleDeleteAnnotation,
    getAnnotationForEquipment,
  };
}
