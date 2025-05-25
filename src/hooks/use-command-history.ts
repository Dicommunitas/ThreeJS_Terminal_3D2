
/**
 * Custom hook que fornece funcionalidade para gerenciar um histórico de comandos,
 * permitindo operações de desfazer (undo) e refazer (redo).
 *
 * Responsabilidades:
 * - Manter o estado do histórico de comandos:
 *   - `history`: Um array que armazena os objetos `Command` executados.
 *   - `currentIndex`: Um índice que aponta para o último comando executado no array `history`.
 *     Um valor de -1 indica que o histórico está vazio ou todos os comandos foram desfeitos.
 * - Fornecer funções para interagir com o histórico:
 *   - `executeCommand`: Executa um novo comando, o adiciona ao histórico e limpa qualquer
 *     histórico de "redo" futuro (comandos que foram desfeitos e poderiam ser refeitos).
 *   - `undo`: Desfaz o comando no `currentIndex`, chamando sua função `undo()`, e move
 *     o `currentIndex` para trás.
 *   - `redo`: Refaz o comando seguinte ao `currentIndex` (se houver), chamando sua função
 *     `execute()`, e move o `currentIndex` para frente.
 * - Disponibilizar indicadores de estado:
 *   - `canUndo`: Booleano indicando se há comandos para desfazer.
 *   - `canRedo`: Booleano indicando se há comandos para refazer.
 * - Expor o `commandHistory` (o array completo de comandos) para fins de depuração ou logging.
 */
import type { Command } from '@/lib/types';
import { useState, useCallback } from 'react';

/**
 * Interface para o estado interno do histórico de comandos.
 * @interface CommandHistoryState
 * @property {Command[]} history - Array de objetos de comando que foram executados.
 * @property {number} currentIndex - Índice do comando atual no array `history`.
 *                                  -1 se o histórico estiver vazio ou todos os comandos foram desfeitos.
 */
interface CommandHistoryState {
  history: Command[];
  currentIndex: number;
}

/**
 * Retorno do hook `useCommandHistory`.
 * @interface UseCommandHistoryReturn
 * @property {(command: Command) => void} executeCommand - Executa um novo comando e o adiciona ao histórico.
 *                                                        Limpa o histórico de "redo" futuro.
 * @property {() => void} undo - Desfaz o último comando executado, se houver.
 * @property {() => void} redo - Refaz o último comando desfeito, se houver.
 * @property {boolean} canUndo - Verdadeiro se há comandos para desfazer, falso caso contrário.
 * @property {boolean} canRedo - Verdadeiro se há comandos para refazer, falso caso contrário.
 * @property {Command[]} commandHistory - O array completo do histórico de comandos, principalmente para depuração.
 */
interface UseCommandHistoryReturn {
  executeCommand: (command: Command) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  commandHistory: Command[];
}

/**
 * Hook customizado para gerenciar um histórico de comandos, permitindo Undo e Redo.
 * Armazena uma lista de comandos e o índice atual, permitindo navegar para frente e para trás
 * através das ações do usuário que foram encapsuladas como comandos.
 * @param {CommandHistoryState} [initialState] - Estado inicial opcional para o histórico.
 *                                             Padrão: histórico vazio (`history: []`) e `currentIndex: -1`.
 * @returns {UseCommandHistoryReturn} Um objeto com funções para executar, desfazer, refazer comandos,
 * e flags indicando se undo/redo são possíveis, além do próprio histórico.
 */
export function useCommandHistory(initialState?: CommandHistoryState): UseCommandHistoryReturn {
  const [state, setState] = useState<CommandHistoryState>(
    initialState || { history: [], currentIndex: -1 }
  );

  /**
   * Executa um comando e o adiciona ao histórico.
   * Se houver comandos "futuros" (comandos que foram desfeitos e poderiam ser refeitos),
   * eles são descartados, pois uma nova ação invalida essa linha do tempo de redo.
   * @param {Command} command O comando a ser executado. A função `command.execute()` é chamada.
   */
  const executeCommand = useCallback((command: Command) => {
    command.execute(); // Executa a ação do comando
    setState((prevState) => {
      // Remove qualquer comando futuro se estivermos desfazendo e então executando um novo comando
      const newHistory = prevState.history.slice(0, prevState.currentIndex + 1);
      newHistory.push(command);
      return {
        history: newHistory,
        currentIndex: newHistory.length - 1, // O novo comando é agora o último
      };
    });
  }, []);

  /**
   * Desfaz o último comando executado (o comando no `currentIndex`).
   * Se não houver comandos para desfazer (`currentIndex < 0`), não faz nada.
   * Chama a função `undo()` do comando.
   */
  const undo = useCallback(() => {
    setState((prevState) => {
      if (prevState.currentIndex < 0) {
        return prevState; // Não há nada para desfazer
      }
      const commandToUndo = prevState.history[prevState.currentIndex];
      commandToUndo.undo(); // Executa a ação de desfazer do comando
      return {
        ...prevState,
        currentIndex: prevState.currentIndex - 1, // Move o ponteiro para o comando anterior
      };
    });
  }, []);

  /**
   * Refaz o último comando desfeito (o comando após o `currentIndex`).
   * Se não houver comandos para refazer (`currentIndex` já é o último do histórico), não faz nada.
   * Chama a função `execute()` do comando a ser refeito.
   */
  const redo = useCallback(() => {
    setState((prevState) => {
      if (prevState.currentIndex >= prevState.history.length - 1) {
        return prevState; // Não há nada para refazer
      }
      const commandToRedo = prevState.history[prevState.currentIndex + 1];
      commandToRedo.execute(); // Executa (refaz) a ação do comando
      return {
        ...prevState,
        currentIndex: prevState.currentIndex + 1, // Move o ponteiro para o comando refeito
      };
    });
  }, []);

  const canUndo = state.currentIndex >= 0;
  const canRedo = state.currentIndex < state.history.length - 1;
  const commandHistory = state.history;

  return { executeCommand, undo, redo, canUndo, canRedo, commandHistory };
}
