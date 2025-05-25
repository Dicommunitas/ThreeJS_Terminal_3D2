[**3D Terminal System API Documentation**](../../../README.md)

***

[3D Terminal System API Documentation](../../../README.md) / [hooks/use-command-history](../README.md) / useCommandHistory

# Function: useCommandHistory()

> **useCommandHistory**(`initialState?`): `UseCommandHistoryReturn`

Defined in: [src/hooks/use-command-history.ts:67](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/329dd5ef132dd57d615e45fca2699e6c6fa5c711/src/hooks/use-command-history.ts#L67)

Hook customizado para gerenciar um histórico de comandos, permitindo Undo e Redo.
Armazena uma lista de comandos e o índice atual, permitindo navegar para frente e para trás
através das ações do usuário que foram encapsuladas como comandos.

## Parameters

### initialState?

`CommandHistoryState`

Estado inicial opcional para o histórico.
                                            Padrão: histórico vazio (`history: []`) e `currentIndex: -1`.

## Returns

`UseCommandHistoryReturn`

Um objeto com funções para executar, desfazer, refazer comandos,
e flags indicando se undo/redo são possíveis, além do próprio histórico.
