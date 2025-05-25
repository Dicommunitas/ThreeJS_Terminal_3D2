[**3D Terminal System API Documentation**](../../../../README.md)

***

[3D Terminal System API Documentation](../../../../README.md) / [core/three/mouse-interaction-manager](../README.md) / processSceneMouseMove

# Function: processSceneMouseMove()

> **processSceneMouseMove**(`event`, `mountRefCurrent`, `camera`, `equipmentMeshes`, `setHoveredEquipmentTagCallback`): `void`

Defined in: [src/core/three/mouse-interaction-manager.ts:82](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/2d6118765ed06f96efcb299ae199b08c708400c9/src/core/three/mouse-interaction-manager.ts#L82)

Processa um evento de movimento do mouse na cena para detectar equipamento em hover.
Realiza raycasting para identificar o equipamento sob o cursor e chama o callback `setHoveredEquipmentTagCallback`.

## Parameters

### event

`MouseEvent`

O evento de movimento do mouse.

### mountRefCurrent

`HTMLDivElement`

O elemento DOM atual onde a cena está montada.

### camera

`PerspectiveCamera`

A câmera de perspectiva da cena.

### equipmentMeshes

`Object3D`\<`Object3DEventMap`\>[]

Array de meshes 3D representando os equipamentos visíveis.

### setHoveredEquipmentTagCallback

(`tag`) => `void`

Callback para definir a tag do equipamento em hover.

## Returns

`void`
