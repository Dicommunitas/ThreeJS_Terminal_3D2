[**3D Terminal System API Documentation**](../../../../README.md)

***

[3D Terminal System API Documentation](../../../../README.md) / [core/three/equipment-geometry-factory](../README.md) / createGeometryForItem

# Function: createGeometryForItem()

> **createGeometryForItem**(`item`): `BufferGeometry`

Defined in: [src/core/three/equipment-geometry-factory.ts:26](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/894502f47f0ff64fee1a1aeae66790ab4080c55e/src/core/three/equipment-geometry-factory.ts#L26)

Cria e retorna uma `THREE.BufferGeometry` apropriada para o tipo de equipamento.
Seleciona a geometria correta (Box, Cylinder, Sphere) com base no `item.type`
e utiliza as dimensões fornecidas no objeto `item`.

## Parameters

### item

`Equipment`

O objeto de equipamento contendo tipo e dimensões.

## Returns

`BufferGeometry`

A geometria criada para o equipamento.
                                 Retorna um `BoxGeometry(1,1,1)` para tipos desconhecidos.
