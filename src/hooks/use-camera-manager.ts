
/**
 * Custom hook para gerenciar o estado e as interações da câmera 3D.
 *
 * Responsabilidades:
 * - Manter o estado atual da câmera (`currentCameraState`): Armazena a posição (`position`)
 *   e o ponto de observação (`lookAt`) atuais da câmera na cena 3D.
 * - Controlar o alvo de enquadramento (`targetSystemToFrame`): Mantém o nome do sistema de equipamentos
 *   que a câmera deve tentar enquadrar. Quando não nulo, o componente `ThreeScene`
 *   usará este valor para calcular e aplicar uma nova visão.
 * - Fornecer Posição e LookAt Iniciais Padrão: Exporta `defaultInitialCameraPosition` e
 *   `defaultInitialCameraLookAt` para uso na configuração inicial da câmera.
 * - Funções de Manipulação:
 *   - `handleSetCameraViewForSystem`: Define o `targetSystemToFrame`, disparando o processo de
 *     enquadramento de um sistema.
 *   - `handleCameraChangeFromScene`: Recebe um novo estado da câmera (geralmente de interações
 *     do usuário com `OrbitControls`) e o registra como um comando no histórico (`executeCommand`),
 *     permitindo operações de undo/redo para movimentos da câmera.
 *   - `onSystemFramed`: Callback chamado pelo `ThreeScene` após o enquadramento de um sistema
 *     ser concluído, resetando `targetSystemToFrame` para `null`.
 */
"use client";

import { useState, useCallback } from 'react';
import type { CameraState, Command } from '@/lib/types';

/** Posição inicial padrão da câmera: { x: 25, y: 20, z: 25 }. */
export const defaultInitialCameraPosition = { x: 25, y: 20, z: 25 };
/** Ponto de observação (lookAt) inicial padrão da câmera: { x: 0, y: 2, z: 0 }. */
export const defaultInitialCameraLookAt = { x: 0, y: 2, z: 0 };

/**
 * Props para o hook `useCameraManager`.
 * @interface UseCameraManagerProps
 * @property {(command: Command) => void} executeCommand - Função para executar comandos (e.g., movimento de câmera)
 *                                                        e adicioná-los ao histórico de undo/redo.
 */
export interface UseCameraManagerProps {
  executeCommand: (command: Command) => void;
}

/**
 * Retorno do hook `useCameraManager`.
 * @interface UseCameraManagerReturn
 * @property {CameraState | undefined} currentCameraState - O estado atual da câmera (posição e ponto de observação).
 *                                                       Pode ser `undefined` antes da inicialização completa.
 * @property {string | null} targetSystemToFrame - O nome do sistema alvo para a câmera enquadrar.
 *                                                Null se nenhum sistema estiver sendo focado.
 * @property {(systemName: string) => void} handleSetCameraViewForSystem - Função para definir o sistema alvo para a câmera enquadrar.
 * @property {(newSceneCameraState: CameraState) => void} handleCameraChangeFromScene - Manipula mudanças de câmera provenientes da cena 3D
 *                                                                                    (e.g., interações do usuário com OrbitControls)
 *                                                                                    e as registra no histórico de comandos.
 * @property {() => void} onSystemFramed - Callback para ser chamado pela `ThreeScene` após o enquadramento do sistema ser concluído.
 *                                       Isso reseta o `targetSystemToFrame`.
 * @property {typeof defaultInitialCameraPosition} defaultInitialCameraPosition - Exporta a posição inicial padrão da câmera.
 * @property {typeof defaultInitialCameraLookAt} defaultInitialCameraLookAt - Exporta o ponto de observação inicial padrão da câmera.
 */
export interface UseCameraManagerReturn {
  currentCameraState: CameraState | undefined;
  targetSystemToFrame: string | null;
  handleSetCameraViewForSystem: (systemName: string) => void;
  handleCameraChangeFromScene: (newSceneCameraState: CameraState) => void;
  onSystemFramed: () => void;
  defaultInitialCameraPosition: { x: number; y: number; z: number };
  defaultInitialCameraLookAt: { x: number; y: number; z: number };
}

/**
 * Hook customizado para gerenciar o estado e as interações da câmera 3D.
 * Responsável pelo estado da câmera, foco em sistemas e integração com o histórico de comandos.
 * @param {UseCameraManagerProps} props As props do hook, incluindo `executeCommand` para integração com o histórico.
 * @returns {UseCameraManagerReturn} Um objeto contendo o estado da câmera e funções para interagir com ela.
 */
export function useCameraManager({ executeCommand }: UseCameraManagerProps): UseCameraManagerReturn {
  const [currentCameraState, setCurrentCameraState] = useState<CameraState | undefined>({
    position: defaultInitialCameraPosition,
    lookAt: defaultInitialCameraLookAt,
  });
  const [targetSystemToFrame, setTargetSystemToFrame] = useState<string | null>(null);

  /**
   * Define o sistema alvo para a câmera enquadrar.
   * Esta função apenas define o estado `targetSystemToFrame`. A lógica de cálculo
   * da visão e atualização da câmera é realizada pelo componente `ThreeScene`
   * que observa este estado.
   * @param {string} systemName O nome do sistema para focar.
   */
  const handleSetCameraViewForSystem = useCallback((systemName: string) => {
    setTargetSystemToFrame(systemName);
  }, []);

  /**
   * Manipula as mudanças de câmera provenientes da cena 3D (e.g., órbita do usuário).
   * Registra a mudança no histórico de comandos se o novo estado for significativamente
   * diferente do estado atual, evitando registros duplicados para movimentos triviais.
   * @param {CameraState} newSceneCameraState O novo estado da câmera da cena.
   */
  const handleCameraChangeFromScene = useCallback((newSceneCameraState: CameraState) => {
    const oldCameraStateSnapshot = currentCameraState ? {
      position: { ...currentCameraState.position },
      lookAt: { ...currentCameraState.lookAt }
    } : undefined;

    // Evita registrar comando se a câmera não mudou significativamente
    if (oldCameraStateSnapshot &&
        Math.abs(oldCameraStateSnapshot.position.x - newSceneCameraState.position.x) < 0.01 &&
        Math.abs(oldCameraStateSnapshot.position.y - newSceneCameraState.position.y) < 0.01 &&
        Math.abs(oldCameraStateSnapshot.position.z - newSceneCameraState.position.z) < 0.01 &&
        Math.abs(oldCameraStateSnapshot.lookAt.x - newSceneCameraState.lookAt.x) < 0.01 &&
        Math.abs(oldCameraStateSnapshot.lookAt.y - newSceneCameraState.lookAt.y) < 0.01 &&
        Math.abs(oldCameraStateSnapshot.lookAt.z - newSceneCameraState.lookAt.z) < 0.01) {
      return; // Sem mudança significativa, não registra comando
    }

    const command: Command = {
      id: `orbit-camera-${Date.now()}`,
      type: 'CAMERA_MOVE',
      description: 'Câmera movimentada pelo usuário',
      execute: () => setCurrentCameraState(newSceneCameraState),
      undo: () => setCurrentCameraState(oldCameraStateSnapshot),
    };
    executeCommand(command);
  }, [currentCameraState, executeCommand]);

  /**
   * Callback para ser chamado pela ThreeScene após o enquadramento do sistema ser concluído.
   * Reseta o `targetSystemToFrame` para `null`, indicando que o enquadramento foi finalizado.
   */
  const onSystemFramed = useCallback(() => {
    setTargetSystemToFrame(null);
  }, []);

  return {
    currentCameraState,
    targetSystemToFrame,
    handleSetCameraViewForSystem,
    handleCameraChangeFromScene,
    onSystemFramed,
    defaultInitialCameraPosition,
    defaultInitialCameraLookAt,
  };
}
