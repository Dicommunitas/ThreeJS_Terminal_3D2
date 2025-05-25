[**3D Terminal System API Documentation**](../../../README.md)

***

[3D Terminal System API Documentation](../../../README.md) / [hooks/use-filter-manager](../README.md) / UseFilterManagerReturn

# Interface: UseFilterManagerReturn

Defined in: [src/hooks/use-filter-manager.ts:46](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/50ef787d9f23a1c5f4362ca495ac1334ca854f4f/src/hooks/use-filter-manager.ts#L46)

Retorno do hook useFilterManager.
 UseFilterManagerReturn

## Properties

### availableAreas

> **availableAreas**: `string`[]

Defined in: [src/hooks/use-filter-manager.ts:54](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/50ef787d9f23a1c5f4362ca495ac1334ca854f4f/src/hooks/use-filter-manager.ts#L54)

Lista de áreas únicas disponíveis para seleção, incluindo "All".

***

### availableSistemas

> **availableSistemas**: `string`[]

Defined in: [src/hooks/use-filter-manager.ts:53](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/50ef787d9f23a1c5f4362ca495ac1334ca854f4f/src/hooks/use-filter-manager.ts#L53)

Lista de sistemas únicos disponíveis para seleção, incluindo "All".

***

### filteredEquipment

> **filteredEquipment**: `Equipment`[]

Defined in: [src/hooks/use-filter-manager.ts:55](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/50ef787d9f23a1c5f4362ca495ac1334ca854f4f/src/hooks/use-filter-manager.ts#L55)

A lista de equipamentos após a aplicação dos filtros.

***

### searchTerm

> **searchTerm**: `string`

Defined in: [src/hooks/use-filter-manager.ts:47](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/50ef787d9f23a1c5f4362ca495ac1334ca854f4f/src/hooks/use-filter-manager.ts#L47)

O termo de busca textual atual.

***

### selectedArea

> **selectedArea**: `string`

Defined in: [src/hooks/use-filter-manager.ts:51](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/50ef787d9f23a1c5f4362ca495ac1334ca854f4f/src/hooks/use-filter-manager.ts#L51)

A área selecionada para filtro (ou "All").

***

### selectedSistema

> **selectedSistema**: `string`

Defined in: [src/hooks/use-filter-manager.ts:49](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/50ef787d9f23a1c5f4362ca495ac1334ca854f4f/src/hooks/use-filter-manager.ts#L49)

O sistema selecionado para filtro (ou "All").

***

### setSearchTerm

> **setSearchTerm**: `Dispatch`\<`SetStateAction`\<`string`\>\>

Defined in: [src/hooks/use-filter-manager.ts:48](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/50ef787d9f23a1c5f4362ca495ac1334ca854f4f/src/hooks/use-filter-manager.ts#L48)

Função para definir o termo de busca.

***

### setSelectedArea

> **setSelectedArea**: `Dispatch`\<`SetStateAction`\<`string`\>\>

Defined in: [src/hooks/use-filter-manager.ts:52](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/50ef787d9f23a1c5f4362ca495ac1334ca854f4f/src/hooks/use-filter-manager.ts#L52)

Função para definir a área selecionada.

***

### setSelectedSistema

> **setSelectedSistema**: `Dispatch`\<`SetStateAction`\<`string`\>\>

Defined in: [src/hooks/use-filter-manager.ts:50](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/50ef787d9f23a1c5f4362ca495ac1334ca854f4f/src/hooks/use-filter-manager.ts#L50)

Função para definir o sistema selecionado.
