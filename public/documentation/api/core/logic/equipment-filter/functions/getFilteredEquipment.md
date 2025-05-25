[**3D Terminal System API Documentation**](../../../../README.md)

***

[3D Terminal System API Documentation](../../../../README.md) / [core/logic/equipment-filter](../README.md) / getFilteredEquipment

# Function: getFilteredEquipment()

> **getFilteredEquipment**(`allEquipment`, `criteria`): `Equipment`[]

Defined in: [src/core/logic/equipment-filter.ts:39](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/329dd5ef132dd57d615e45fca2699e6c6fa5c711/src/core/logic/equipment-filter.ts#L39)

Filtra uma lista de equipamentos com base nos critérios fornecidos.
A filtragem ocorre na seguinte ordem: Sistema, depois Área, depois Termo de Busca.
A filtragem textual por `searchTerm` considera nome, tipo e tag, com lógica "E" para múltiplos termos.
Os filtros de sistema e área são aplicados se não forem "All".

## Parameters

### allEquipment

`Equipment`[]

A lista completa de equipamentos a serem filtrados.

### criteria

[`EquipmentFilterCriteria`](../interfaces/EquipmentFilterCriteria.md)

Os critérios de filtro a serem aplicados.

## Returns

`Equipment`[]

A lista de equipamentos filtrada.
