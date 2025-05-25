[**3D Terminal System API Documentation**](../../../README.md)

***

[3D Terminal System API Documentation](../../../README.md) / [hooks/use-command-history](../README.md) / useCommandHistory

# Function: useCommandHistory()

> **useCommandHistory**(`initialState?`): `UseCommandHistoryReturn`

Defined in: [src/hooks/use-command-history.ts:50](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/97ab9f0ae2e42171aa40996aacad796786af9976/src/hooks/use-command-history.ts#L50)

Hook customizado para gerenciar um histórico de comandos, permitindo Undo e Redo.
Armazena uma lista de comandos e o índice atual, permitindo navegar para frente e para trás
através das ações do usuário.

## Parameters

### initialState?

`CommandHistoryState`

Estado inicial opcional para o histórico.
                                            Padrão: histórico vazio e currentIndex -1.

## Returns

`UseCommandHistoryReturn`

Um objeto com funções para executar, desfazer, refazer comandos,
e flags indicando se undo/redo são possíveis.
