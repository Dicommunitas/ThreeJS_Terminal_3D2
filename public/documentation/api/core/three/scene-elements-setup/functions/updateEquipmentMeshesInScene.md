[**3D Terminal System API Documentation**](../../../../README.md)

***

[3D Terminal System API Documentation](../../../../README.md) / [core/three/scene-elements-setup](../README.md) / updateEquipmentMeshesInScene

# Function: updateEquipmentMeshesInScene()

> **updateEquipmentMeshesInScene**(`params`): `void`

Defined in: [src/core/three/scene-elements-setup.ts:174](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/97ab9f0ae2e42171aa40996aacad796786af9976/src/core/three/scene-elements-setup.ts#L174)

Atualiza a lista de meshes de equipamentos na cena com base nos novos dados.
Remove meshes antigos, atualiza existentes (recriando-os para garantir consistência de material/cor)
e adiciona novos, considerando a visibilidade das camadas. Também gerencia a visibilidade do plano de chão.

## Parameters

### params

`UpdateEquipmentMeshesParams`

Os parâmetros para a função.

## Returns

`void`
