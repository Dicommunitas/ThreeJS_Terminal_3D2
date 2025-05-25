[**3D Terminal System API Documentation**](../../../README.md)

***

[3D Terminal System API Documentation](../../../README.md) / [lib/types](../README.md) / Command

# Interface: Command

Defined in: [src/lib/types.ts:87](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/2d6118765ed06f96efcb299ae199b08c708400c9/src/lib/types.ts#L87)

Representa um comando executável e reversível para o sistema de Undo/Redo.
 Command

## Properties

### description

> **description**: `string`

Defined in: [src/lib/types.ts:92](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/2d6118765ed06f96efcb299ae199b08c708400c9/src/lib/types.ts#L92)

Descrição textual do comando.

***

### execute()

> **execute**: () => `void`

Defined in: [src/lib/types.ts:90](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/2d6118765ed06f96efcb299ae199b08c708400c9/src/lib/types.ts#L90)

Função para executar a ação do comando.

#### Returns

`void`

***

### id

> **id**: `string`

Defined in: [src/lib/types.ts:88](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/2d6118765ed06f96efcb299ae199b08c708400c9/src/lib/types.ts#L88)

Identificador único do comando.

***

### type

> **type**: `"CAMERA_MOVE"` \| `"LAYER_VISIBILITY"` \| `"EQUIPMENT_SELECT"`

Defined in: [src/lib/types.ts:89](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/2d6118765ed06f96efcb299ae199b08c708400c9/src/lib/types.ts#L89)

Tipo do comando.

***

### undo()

> **undo**: () => `void`

Defined in: [src/lib/types.ts:91](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/2d6118765ed06f96efcb299ae199b08c708400c9/src/lib/types.ts#L91)

Função para reverter a ação do comando.

#### Returns

`void`
