[**3D Terminal System API Documentation**](../../../README.md)

***

[3D Terminal System API Documentation](../../../README.md) / [hooks/use-filter-manager](../README.md) / useFilterManager

# Function: useFilterManager()

> **useFilterManager**(`props`): [`UseFilterManagerReturn`](../interfaces/UseFilterManagerReturn.md)

Defined in: [src/hooks/use-filter-manager.ts:65](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/50ef787d9f23a1c5f4362ca495ac1334ca854f4f/src/hooks/use-filter-manager.ts#L65)

Hook customizado para gerenciar a lógica de filtragem de equipamentos.
Encapsula os estados dos filtros, as listas de opções de filtro disponíveis e a lista
resultante de equipamentos filtrados.

## Parameters

### props

`UseFilterManagerProps`

As propriedades para o hook, incluindo `allEquipment`.

## Returns

[`UseFilterManagerReturn`](../interfaces/UseFilterManagerReturn.md)

O estado dos filtros, setters, opções de filtro e a lista filtrada.
