[**3D Terminal System API Documentation**](../../../README.md)

***

[3D Terminal System API Documentation](../../../README.md) / [hooks/use-equipment-data-manager](../README.md) / UseEquipmentDataManagerReturn

# Interface: UseEquipmentDataManagerReturn

Defined in: [src/hooks/use-equipment-data-manager.ts:19](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/894502f47f0ff64fee1a1aeae66790ab4080c55e/src/hooks/use-equipment-data-manager.ts#L19)

Retorno do hook useEquipmentDataManager.
 UseEquipmentDataManagerReturn

## Properties

### equipmentData

> **equipmentData**: `Equipment`[]

Defined in: [src/hooks/use-equipment-data-manager.ts:20](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/894502f47f0ff64fee1a1aeae66790ab4080c55e/src/hooks/use-equipment-data-manager.ts#L20)

A lista atual de todos os equipamentos.

***

### handleOperationalStateChange()

> **handleOperationalStateChange**: (`equipmentTag`, `newState`) => `void`

Defined in: [src/hooks/use-equipment-data-manager.ts:21](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/894502f47f0ff64fee1a1aeae66790ab4080c55e/src/hooks/use-equipment-data-manager.ts#L21)

Modifica o estado operacional de um equipamento.

#### Parameters

##### equipmentTag

`string`

##### newState

`string`

#### Returns

`void`

***

### handleProductChange()

> **handleProductChange**: (`equipmentTag`, `newProduct`) => `void`

Defined in: [src/hooks/use-equipment-data-manager.ts:22](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/894502f47f0ff64fee1a1aeae66790ab4080c55e/src/hooks/use-equipment-data-manager.ts#L22)

Modifica o produto de um equipamento.

#### Parameters

##### equipmentTag

`string`

##### newProduct

`string`

#### Returns

`void`
