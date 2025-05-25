[**3D Terminal System API Documentation**](../../../README.md)

***

[3D Terminal System API Documentation](../../../README.md) / [hooks/use-annotation-manager](../README.md) / UseAnnotationManagerReturn

# Interface: UseAnnotationManagerReturn

Defined in: [src/hooks/use-annotation-manager.ts:57](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/894502f47f0ff64fee1a1aeae66790ab4080c55e/src/hooks/use-annotation-manager.ts#L57)

Retorno do hook useAnnotationManager.
 UseAnnotationManagerReturn

## Properties

### annotations

> **annotations**: `Annotation`[]

Defined in: [src/hooks/use-annotation-manager.ts:58](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/894502f47f0ff64fee1a1aeae66790ab4080c55e/src/hooks/use-annotation-manager.ts#L58)

A lista atual de anotações.

***

### annotationTargetEquipment

> **annotationTargetEquipment**: `null` \| `Equipment`

Defined in: [src/hooks/use-annotation-manager.ts:62](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/894502f47f0ff64fee1a1aeae66790ab4080c55e/src/hooks/use-annotation-manager.ts#L62)

O equipamento atualmente alvo para adicionar/editar uma anotação.

***

### editingAnnotation

> **editingAnnotation**: `null` \| `Annotation`

Defined in: [src/hooks/use-annotation-manager.ts:63](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/894502f47f0ff64fee1a1aeae66790ab4080c55e/src/hooks/use-annotation-manager.ts#L63)

A anotação atualmente em edição (se houver).

***

### getAnnotationForEquipment()

> **getAnnotationForEquipment**: (`equipmentTag`) => `null` \| `Annotation`

Defined in: [src/hooks/use-annotation-manager.ts:67](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/894502f47f0ff64fee1a1aeae66790ab4080c55e/src/hooks/use-annotation-manager.ts#L67)

Obtém a anotação de um equipamento específico pela sua tag.

#### Parameters

##### equipmentTag

`null` | `string`

#### Returns

`null` \| `Annotation`

***

### handleDeleteAnnotation()

> **handleDeleteAnnotation**: (`equipmentTag`) => `void`

Defined in: [src/hooks/use-annotation-manager.ts:66](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/894502f47f0ff64fee1a1aeae66790ab4080c55e/src/hooks/use-annotation-manager.ts#L66)

Exclui a anotação de um equipamento.

#### Parameters

##### equipmentTag

`string`

#### Returns

`void`

***

### handleOpenAnnotationDialog()

> **handleOpenAnnotationDialog**: (`equipment`) => `void`

Defined in: [src/hooks/use-annotation-manager.ts:64](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/894502f47f0ff64fee1a1aeae66790ab4080c55e/src/hooks/use-annotation-manager.ts#L64)

Abre o diálogo para adicionar/editar anotação para um equipamento.

#### Parameters

##### equipment

`null` | `Equipment`

#### Returns

`void`

***

### handleSaveAnnotation()

> **handleSaveAnnotation**: (`text`) => `void`

Defined in: [src/hooks/use-annotation-manager.ts:65](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/894502f47f0ff64fee1a1aeae66790ab4080c55e/src/hooks/use-annotation-manager.ts#L65)

Salva a anotação (cria uma nova ou atualiza uma existente).

#### Parameters

##### text

`string`

#### Returns

`void`

***

### isAnnotationDialogOpen

> **isAnnotationDialogOpen**: `boolean`

Defined in: [src/hooks/use-annotation-manager.ts:60](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/894502f47f0ff64fee1a1aeae66790ab4080c55e/src/hooks/use-annotation-manager.ts#L60)

Indica se o diálogo de anotação está aberto.

***

### setAnnotations

> **setAnnotations**: `Dispatch`\<`SetStateAction`\<`Annotation`[]\>\>

Defined in: [src/hooks/use-annotation-manager.ts:59](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/894502f47f0ff64fee1a1aeae66790ab4080c55e/src/hooks/use-annotation-manager.ts#L59)

Função para definir diretamente a lista de anotações (usada internamente).

***

### setIsAnnotationDialogOpen

> **setIsAnnotationDialogOpen**: `Dispatch`\<`SetStateAction`\<`boolean`\>\>

Defined in: [src/hooks/use-annotation-manager.ts:61](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/894502f47f0ff64fee1a1aeae66790ab4080c55e/src/hooks/use-annotation-manager.ts#L61)

Define o estado de abertura do diálogo.
