[**3D Terminal System API Documentation**](../../../README.md)

***

[3D Terminal System API Documentation](../../../README.md) / [hooks/use-equipment-selection-manager](../README.md) / UseEquipmentSelectionManagerReturn

# Interface: UseEquipmentSelectionManagerReturn

Defined in: [src/hooks/use-equipment-selection-manager.ts:47](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/894502f47f0ff64fee1a1aeae66790ab4080c55e/src/hooks/use-equipment-selection-manager.ts#L47)

Retorno do hook useEquipmentSelectionManager.
 UseEquipmentSelectionManagerReturn

## Properties

### handleEquipmentClick()

> **handleEquipmentClick**: (`tag`, `isMultiSelectModifierPressed`) => `void`

Defined in: [src/hooks/use-equipment-selection-manager.ts:50](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/894502f47f0ff64fee1a1aeae66790ab4080c55e/src/hooks/use-equipment-selection-manager.ts#L50)

Manipula o clique em um equipamento para seleção.

#### Parameters

##### tag

`null` | `string`

##### isMultiSelectModifierPressed

`boolean`

#### Returns

`void`

***

### handleSetHoveredEquipmentTag()

> **handleSetHoveredEquipmentTag**: (`tag`) => `void`

Defined in: [src/hooks/use-equipment-selection-manager.ts:51](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/894502f47f0ff64fee1a1aeae66790ab4080c55e/src/hooks/use-equipment-selection-manager.ts#L51)

Define o equipamento sob o cursor.

#### Parameters

##### tag

`null` | `string`

#### Returns

`void`

***

### hoveredEquipmentTag

> **hoveredEquipmentTag**: `null` \| `string`

Defined in: [src/hooks/use-equipment-selection-manager.ts:49](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/894502f47f0ff64fee1a1aeae66790ab4080c55e/src/hooks/use-equipment-selection-manager.ts#L49)

Tag do equipamento atualmente sob o cursor, ou null.

***

### selectedEquipmentTags

> **selectedEquipmentTags**: `string`[]

Defined in: [src/hooks/use-equipment-selection-manager.ts:48](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/894502f47f0ff64fee1a1aeae66790ab4080c55e/src/hooks/use-equipment-selection-manager.ts#L48)

Array das tags dos equipamentos atualmente selecionados.

***

### selectTagsBatch()

> **selectTagsBatch**: (`tagsToSelect`, `operationDescription?`) => `void`

Defined in: [src/hooks/use-equipment-selection-manager.ts:52](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/894502f47f0ff64fee1a1aeae66790ab4080c55e/src/hooks/use-equipment-selection-manager.ts#L52)

Seleciona um lote de equipamentos programaticamente.

#### Parameters

##### tagsToSelect

`string`[]

##### operationDescription?

`string`

#### Returns

`void`
