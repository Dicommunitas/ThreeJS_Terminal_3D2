[**3D Terminal System API Documentation**](../../../../README.md)

***

[3D Terminal System API Documentation](../../../../README.md) / [core/three/mouse-interaction-manager](../README.md) / processSceneClick

# Function: processSceneClick()

> **processSceneClick**(`event`, `mountRefCurrent`, `camera`, `equipmentMeshes`, `onSelectEquipmentCallback`): `void`

Defined in: [src/core/three/mouse-interaction-manager.ts:34](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/894502f47f0ff64fee1a1aeae66790ab4080c55e/src/core/three/mouse-interaction-manager.ts#L34)

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

Array de meshes 3D representando os equipamentos visíveis.

### onSelectEquipmentCallback

(`tag`, `isMultiSelect`) => `void`

Callback a ser chamado
       com a tag do equipamento selecionado (ou null) e um booleano para seleção múltipla.

## Returns

`void`
