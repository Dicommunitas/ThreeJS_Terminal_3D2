[**3D Terminal System API Documentation**](../../../../README.md)

***

[3D Terminal System API Documentation](../../../../README.md) / [core/three/mouse-interaction-manager](../README.md) / processSceneClick

# Function: processSceneClick()

> **processSceneClick**(`event`, `mountRefCurrent`, `camera`, `equipmentMeshes`, `onSelectEquipmentCallback`): `void`

Defined in: [src/core/three/mouse-interaction-manager.ts:43](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/329dd5ef132dd57d615e45fca2699e6c6fa5c711/src/core/three/mouse-interaction-manager.ts#L43)

Processa um evento de clique do mouse na cena para selecionar equipamento.
Realiza raycasting para identificar o equipamento clicado e chama o callback `onSelectEquipmentCallback`.

## Parameters

### event

`MouseEvent`

O evento de clique do mouse.

### mountRefCurrent

`HTMLDivElement`

O elemento DOM atual onde a cena está montada.

### camera

`PerspectiveCamera`

A câmera de perspectiva da cena.

### equipmentMeshes

`Object3D`\<`Object3DEventMap`\>[]

Array de meshes 3D representando os equipamentos visíveis na cena.

### onSelectEquipmentCallback

(`tag`, `isMultiSelect`) => `void`

Callback a ser chamado
       com a tag do equipamento selecionado (ou null se o clique foi em espaço vazio ou objeto não identificável)
       e um booleano indicando se a tecla Ctrl/Cmd (para seleção múltipla) estava pressionada.

## Returns

`void`
