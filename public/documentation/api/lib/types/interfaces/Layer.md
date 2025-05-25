[**3D Terminal System API Documentation**](../../../README.md)

***

[3D Terminal System API Documentation](../../../README.md) / [lib/types](../README.md) / Layer

# Interface: Layer

Defined in: [src/lib/types.ts:60](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/2d6118765ed06f96efcb299ae199b08c708400c9/src/lib/types.ts#L60)

Representa uma camada de visualização na interface.
Controla a visibilidade de grupos de equipamentos ou outros elementos.
 Layer

## Properties

### equipmentType

> **equipmentType**: `"Building"` \| `"Crane"` \| `"Tank"` \| `"Terrain"` \| `"Pipe"` \| `"Valve"` \| `"All"` \| `"Annotations"`

Defined in: [src/lib/types.ts:63](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/2d6118765ed06f96efcb299ae199b08c708400c9/src/lib/types.ts#L63)

O tipo de elemento que esta camada controla.

***

### id

> **id**: `string`

Defined in: [src/lib/types.ts:61](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/2d6118765ed06f96efcb299ae199b08c708400c9/src/lib/types.ts#L61)

Identificador único da camada (e.g., 'layer-tanks').

***

### isVisible

> **isVisible**: `boolean`

Defined in: [src/lib/types.ts:64](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/2d6118765ed06f96efcb299ae199b08c708400c9/src/lib/types.ts#L64)

Indica se a camada está atualmente visível.

***

### name

> **name**: `string`

Defined in: [src/lib/types.ts:62](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/2d6118765ed06f96efcb299ae199b08c708400c9/src/lib/types.ts#L62)

Nome legível da camada para exibição na UI.
