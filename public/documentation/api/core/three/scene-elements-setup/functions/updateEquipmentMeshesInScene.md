[**3D Terminal System API Documentation**](../../../../README.md)

***

[3D Terminal System API Documentation](../../../../README.md) / [core/three/scene-elements-setup](../README.md) / updateEquipmentMeshesInScene

# Function: updateEquipmentMeshesInScene()

> **updateEquipmentMeshesInScene**(`params`): `void`

Defined in: [src/core/three/scene-elements-setup.ts:179](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/329dd5ef132dd57d615e45fca2699e6c6fa5c711/src/core/three/scene-elements-setup.ts#L179)

Atualiza a lista de meshes de equipamentos na cena com base nos novos dados.
Remove meshes antigos, atualiza existentes (recriando-os para garantir consistência de material/cor)
e adiciona novos, considerando a visibilidade das camadas. Também gerencia a visibilidade do plano de chão.
Esta função é otimizada para recriar meshes apenas quando necessário, mas a lógica atual recria
para simplificar a atualização de cor e outras propriedades visuais baseadas em `colorMode` ou dados do equipamento.

## Parameters

### params

`UpdateEquipmentMeshesParams`

Os parâmetros para a função.

## Returns

`void`
