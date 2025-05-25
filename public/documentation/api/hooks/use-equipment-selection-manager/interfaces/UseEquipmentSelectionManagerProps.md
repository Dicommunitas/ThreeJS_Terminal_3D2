[**3D Terminal System API Documentation**](../../../README.md)

***

[3D Terminal System API Documentation](../../../README.md) / [hooks/use-equipment-selection-manager](../README.md) / UseEquipmentSelectionManagerProps

# Interface: UseEquipmentSelectionManagerProps

Defined in: [src/hooks/use-equipment-selection-manager.ts:33](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/2d6118765ed06f96efcb299ae199b08c708400c9/src/hooks/use-equipment-selection-manager.ts#L33)

Props para o hook useEquipmentSelectionManager.
 UseEquipmentSelectionManagerProps

## Properties

### equipmentData

> **equipmentData**: [`Equipment`](../../../lib/types/interfaces/Equipment.md)[]

Defined in: [src/hooks/use-equipment-selection-manager.ts:34](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/2d6118765ed06f96efcb299ae199b08c708400c9/src/hooks/use-equipment-selection-manager.ts#L34)

Lista completa de equipamentos, usada para buscar nomes para toasts.

***

### executeCommand()

> **executeCommand**: (`command`) => `void`

Defined in: [src/hooks/use-equipment-selection-manager.ts:35](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/2d6118765ed06f96efcb299ae199b08c708400c9/src/hooks/use-equipment-selection-manager.ts#L35)

Função para executar comandos e adicioná-los ao histórico.

#### Parameters

##### command

[`Command`](../../../lib/types/interfaces/Command.md)

#### Returns

`void`
