[**3D Terminal System API Documentation**](../../../README.md)

***

[3D Terminal System API Documentation](../../../README.md) / [hooks/use-equipment-selection-manager](../README.md) / UseEquipmentSelectionManagerReturn

# Interface: UseEquipmentSelectionManagerReturn

Defined in: [src/hooks/use-equipment-selection-manager.ts:50](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/329dd5ef132dd57d615e45fca2699e6c6fa5c711/src/hooks/use-equipment-selection-manager.ts#L50)

Retorno do hook `useEquipmentSelectionManager`.
 UseEquipmentSelectionManagerReturn

## Properties

### handleEquipmentClick()

> **handleEquipmentClick**: (`tag`, `isMultiSelectModifierPressed`) => `void`

Defined in: [src/hooks/use-equipment-selection-manager.ts:53](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/329dd5ef132dd57d615e45fca2699e6c6fa5c711/src/hooks/use-equipment-selection-manager.ts#L53)

Manipulador para eventos de clique em equipamentos
                                                                                                      (ou em espaço vazio para deselecionar).

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

Defined in: [src/hooks/use-equipment-selection-manager.ts:54](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/329dd5ef132dd57d615e45fca2699e6c6fa5c711/src/hooks/use-equipment-selection-manager.ts#L54)

Define o equipamento atualmente em hover.

#### Parameters

##### tag

`null` | `string`

#### Returns

`void`

***

### hoveredEquipmentTag

> **hoveredEquipmentTag**: `null` \| `string`

Defined in: [src/hooks/use-equipment-selection-manager.ts:52](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/329dd5ef132dd57d615e45fca2699e6c6fa5c711/src/hooks/use-equipment-selection-manager.ts#L52)

Tag do equipamento atualmente sob o cursor do mouse, ou null.

***

### selectedEquipmentTags

> **selectedEquipmentTags**: `string`[]

Defined in: [src/hooks/use-equipment-selection-manager.ts:51](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/329dd5ef132dd57d615e45fca2699e6c6fa5c711/src/hooks/use-equipment-selection-manager.ts#L51)

Array das tags dos equipamentos atualmente selecionados.

***

### selectTagsBatch()

> **selectTagsBatch**: (`tagsToSelect`, `operationDescription?`) => `void`

Defined in: [src/hooks/use-equipment-selection-manager.ts:55](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/329dd5ef132dd57d615e45fca2699e6c6fa5c711/src/hooks/use-equipment-selection-manager.ts#L55)

Seleciona programaticamente um lote de equipamentos.
                                                                                              `operationDescription` é usado para o histórico de comandos.

#### Parameters

##### tagsToSelect

`string`[]

##### operationDescription?

`string`

#### Returns

`void`
