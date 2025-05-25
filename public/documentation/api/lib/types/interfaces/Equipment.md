[**3D Terminal System API Documentation**](../../../README.md)

***

[3D Terminal System API Documentation](../../../README.md) / [lib/types](../README.md) / Equipment

# Interface: Equipment

Defined in: [src/lib/types.ts:34](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/2d6118765ed06f96efcb299ae199b08c708400c9/src/lib/types.ts#L34)

Representa um equipamento na cena 3D.
 Equipment

## Properties

### area?

> `optional` **area**: `string`

Defined in: [src/lib/types.ts:39](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/2d6118765ed06f96efcb299ae199b08c708400c9/src/lib/types.ts#L39)

Área onde o equipamento está localizado.

***

### color

> **color**: `string`

Defined in: [src/lib/types.ts:47](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/2d6118765ed06f96efcb299ae199b08c708400c9/src/lib/types.ts#L47)

Cor base em formato hexadecimal (e.g., '#78909C').

***

### details?

> `optional` **details**: `string`

Defined in: [src/lib/types.ts:48](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/2d6118765ed06f96efcb299ae199b08c708400c9/src/lib/types.ts#L48)

Detalhes textuais adicionais (opcional).

***

### height?

> `optional` **height**: `number`

Defined in: [src/lib/types.ts:46](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/2d6118765ed06f96efcb299ae199b08c708400c9/src/lib/types.ts#L46)

Altura para equipamentos cilíndricos (comprimento para tubos).

***

### name

> **name**: `string`

Defined in: [src/lib/types.ts:36](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/2d6118765ed06f96efcb299ae199b08c708400c9/src/lib/types.ts#L36)

Nome legível do equipamento.

***

### operationalState?

> `optional` **operationalState**: `string`

Defined in: [src/lib/types.ts:40](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/2d6118765ed06f96efcb299ae199b08c708400c9/src/lib/types.ts#L40)

Estado operacional atual (e.g., 'operando', 'manutenção').

***

### position

> **position**: `object`

Defined in: [src/lib/types.ts:42](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/2d6118765ed06f96efcb299ae199b08c708400c9/src/lib/types.ts#L42)

Coordenadas do centro geométrico.

#### x

> **x**: `number`

#### y

> **y**: `number`

#### z

> **z**: `number`

***

### product?

> `optional` **product**: `string`

Defined in: [src/lib/types.ts:41](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/2d6118765ed06f96efcb299ae199b08c708400c9/src/lib/types.ts#L41)

Produto associado (e.g., "70H" ou "Não aplicável").

***

### radius?

> `optional` **radius**: `number`

Defined in: [src/lib/types.ts:45](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/2d6118765ed06f96efcb299ae199b08c708400c9/src/lib/types.ts#L45)

Raio para equipamentos cilíndricos ou esféricos.

***

### rotation?

> `optional` **rotation**: `object`

Defined in: [src/lib/types.ts:43](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/2d6118765ed06f96efcb299ae199b08c708400c9/src/lib/types.ts#L43)

Rotação em radianos (opcional).

#### x

> **x**: `number`

#### y

> **y**: `number`

#### z

> **z**: `number`

***

### sistema?

> `optional` **sistema**: `string`

Defined in: [src/lib/types.ts:38](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/2d6118765ed06f96efcb299ae199b08c708400c9/src/lib/types.ts#L38)

Sistema ao qual o equipamento pertence.

***

### size?

> `optional` **size**: `object`

Defined in: [src/lib/types.ts:44](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/2d6118765ed06f96efcb299ae199b08c708400c9/src/lib/types.ts#L44)

Dimensões para equipamentos tipo caixa.

#### depth

> **depth**: `number`

#### height

> **height**: `number`

#### width

> **width**: `number`

***

### tag

> **tag**: `string`

Defined in: [src/lib/types.ts:35](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/2d6118765ed06f96efcb299ae199b08c708400c9/src/lib/types.ts#L35)

Identificador único do equipamento.

***

### type

> **type**: `"Building"` \| `"Crane"` \| `"Tank"` \| `"Terrain"` \| `"Pipe"` \| `"Valve"`

Defined in: [src/lib/types.ts:37](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/2d6118765ed06f96efcb299ae199b08c708400c9/src/lib/types.ts#L37)

Tipo do equipamento.
