[**3D Terminal System API Documentation**](../../../README.md)

***

[3D Terminal System API Documentation](../../../README.md) / [app/page](../README.md) / default

# Function: default()

> **default**(): `Element`

Defined in: [src/app/page.tsx:55](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/50ef787d9f23a1c5f4362ca495ac1334ca854f4f/src/app/page.tsx#L55)

Componente principal da página Terminal 3D (Terminal3DPage).

Orquestra os diversos hooks de gerenciamento de estado da aplicação:
- `useCommandHistory`: Para funcionalidades de Undo/Redo.
- `useEquipmentDataManager`: Gerencia a "fonte da verdade" dos dados dos equipamentos e suas modificações diretas (estado operacional, produto).
- `useCameraManager`: Controla o estado da câmera 3D, incluindo presets e foco em sistemas.
- `useFilterManager`: Gerencia os estados e a lógica de filtragem dos equipamentos (busca por texto, sistema, área).
- `useAnnotationManager`: Lida com o estado e as operações CRUD para anotações dos equipamentos.
- `useEquipmentSelectionManager`: Gerencia a seleção de equipamentos (single, multi) e o estado de hover.
- `useLayerManager`: Controla o estado de visibilidade das diferentes camadas de objetos na cena.

Também gerencia estados locais como `colorMode` para a colorização da cena.

Responsável por:
- Renderizar a estrutura principal da UI, incluindo a `Sidebar` e a `MainSceneArea`.
- Passar os estados e callbacks apropriados dos hooks para os componentes filhos.
- Definir lógicas de alto nível que coordenam múltiplos hooks (e.g., `handleFocusAndSelectSystem`).
- Calcular dados derivados (e.g., `selectedEquipmentDetails`, listas de opções para filtros) usando `useMemo`.

## Returns

`Element`

O componente da página Terminal 3D.
