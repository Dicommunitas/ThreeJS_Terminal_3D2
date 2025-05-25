[**3D Terminal System API Documentation**](../../../README.md)

***

[3D Terminal System API Documentation](../../../README.md) / [hooks/use-filter-manager](../README.md) / UseFilterManagerReturn

# Interface: UseFilterManagerReturn

Defined in: [src/hooks/use-filter-manager.ts:48](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/329dd5ef132dd57d615e45fca2699e6c6fa5c711/src/hooks/use-filter-manager.ts#L48)

Retorno do hook `useFilterManager`.
 UseFilterManagerReturn

## Properties

### availableAreas

> **availableAreas**: `string`[]

Defined in: [src/hooks/use-filter-manager.ts:56](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/329dd5ef132dd57d615e45fca2699e6c6fa5c711/src/hooks/use-filter-manager.ts#L56)

Lista ordenada de áreas únicas disponíveis para seleção no filtro, incluindo "All".

***

### availableSistemas

> **availableSistemas**: `string`[]

Defined in: [src/hooks/use-filter-manager.ts:55](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/329dd5ef132dd57d615e45fca2699e6c6fa5c711/src/hooks/use-filter-manager.ts#L55)

Lista ordenada de sistemas únicos disponíveis para seleção no filtro, incluindo "All".

***

### filteredEquipment

> **filteredEquipment**: `Equipment`[]

Defined in: [src/hooks/use-filter-manager.ts:57](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/329dd5ef132dd57d615e45fca2699e6c6fa5c711/src/hooks/use-filter-manager.ts#L57)

A lista de equipamentos resultante após a aplicação de todos os filtros ativos.

***

### searchTerm

> **searchTerm**: `string`

Defined in: [src/hooks/use-filter-manager.ts:49](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/329dd5ef132dd57d615e45fca2699e6c6fa5c711/src/hooks/use-filter-manager.ts#L49)

O termo de busca textual atualmente aplicado.

***

### selectedArea

> **selectedArea**: `string`

Defined in: [src/hooks/use-filter-manager.ts:53](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/329dd5ef132dd57d615e45fca2699e6c6fa5c711/src/hooks/use-filter-manager.ts#L53)

A área atualmente selecionada para filtro (e.g., "Área 31", "All").

***

### selectedSistema

> **selectedSistema**: `string`

Defined in: [src/hooks/use-filter-manager.ts:51](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/329dd5ef132dd57d615e45fca2699e6c6fa5c711/src/hooks/use-filter-manager.ts#L51)

O sistema atualmente selecionado para filtro (e.g., "GA", "All").

***

### setSearchTerm

> **setSearchTerm**: `Dispatch`\<`SetStateAction`\<`string`\>\>

Defined in: [src/hooks/use-filter-manager.ts:50](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/329dd5ef132dd57d615e45fca2699e6c6fa5c711/src/hooks/use-filter-manager.ts#L50)

Função para atualizar o `searchTerm`.

***

### setSelectedArea

> **setSelectedArea**: `Dispatch`\<`SetStateAction`\<`string`\>\>

Defined in: [src/hooks/use-filter-manager.ts:54](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/329dd5ef132dd57d615e45fca2699e6c6fa5c711/src/hooks/use-filter-manager.ts#L54)

Função para atualizar o `selectedArea`.

***

### setSelectedSistema

> **setSelectedSistema**: `Dispatch`\<`SetStateAction`\<`string`\>\>

Defined in: [src/hooks/use-filter-manager.ts:52](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/329dd5ef132dd57d615e45fca2699e6c6fa5c711/src/hooks/use-filter-manager.ts#L52)

Função para atualizar o `selectedSistema`.
