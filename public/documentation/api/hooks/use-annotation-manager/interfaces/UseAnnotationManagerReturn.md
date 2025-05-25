[**3D Terminal System API Documentation**](../../../README.md)

***

[3D Terminal System API Documentation](../../../README.md) / [hooks/use-annotation-manager](../README.md) / UseAnnotationManagerReturn

# Interface: UseAnnotationManagerReturn

Defined in: [src/hooks/use-annotation-manager.ts:55](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/329dd5ef132dd57d615e45fca2699e6c6fa5c711/src/hooks/use-annotation-manager.ts#L55)

Retorno do hook `useAnnotationManager`.
 UseAnnotationManagerReturn

## Properties

### annotations

> **annotations**: `Annotation`[]

Defined in: [src/hooks/use-annotation-manager.ts:56](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/329dd5ef132dd57d615e45fca2699e6c6fa5c711/src/hooks/use-annotation-manager.ts#L56)

A lista atual de todas as anotações.

***

### annotationTargetEquipment

> **annotationTargetEquipment**: `null` \| `Equipment`

Defined in: [src/hooks/use-annotation-manager.ts:60](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/329dd5ef132dd57d615e45fca2699e6c6fa5c711/src/hooks/use-annotation-manager.ts#L60)

O equipamento que é o alvo atual para adicionar/editar uma anotação.

***

### editingAnnotation

> **editingAnnotation**: `null` \| `Annotation`

Defined in: [src/hooks/use-annotation-manager.ts:61](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/329dd5ef132dd57d615e45fca2699e6c6fa5c711/src/hooks/use-annotation-manager.ts#L61)

A anotação que está atualmente em edição no diálogo (null se for uma nova anotação).

***

### getAnnotationForEquipment()

> **getAnnotationForEquipment**: (`equipmentTag`) => `null` \| `Annotation`

Defined in: [src/hooks/use-annotation-manager.ts:65](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/329dd5ef132dd57d615e45fca2699e6c6fa5c711/src/hooks/use-annotation-manager.ts#L65)

Retorna a anotação para a tag do equipamento fornecida, ou null se não existir.

#### Parameters

##### equipmentTag

`null` | `string`

#### Returns

`null` \| `Annotation`

***

### handleDeleteAnnotation()

> **handleDeleteAnnotation**: (`equipmentTag`) => `void`

Defined in: [src/hooks/use-annotation-manager.ts:64](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/329dd5ef132dd57d615e45fca2699e6c6fa5c711/src/hooks/use-annotation-manager.ts#L64)

Exclui a anotação associada à tag do equipamento fornecida.

#### Parameters

##### equipmentTag

`string`

#### Returns

`void`

***

### handleOpenAnnotationDialog()

> **handleOpenAnnotationDialog**: (`equipment`) => `void`

Defined in: [src/hooks/use-annotation-manager.ts:62](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/329dd5ef132dd57d615e45fca2699e6c6fa5c711/src/hooks/use-annotation-manager.ts#L62)

Abre o diálogo de anotação para o equipamento fornecido.

#### Parameters

##### equipment

`null` | `Equipment`

#### Returns

`void`

***

### handleSaveAnnotation()

> **handleSaveAnnotation**: (`text`) => `void`

Defined in: [src/hooks/use-annotation-manager.ts:63](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/329dd5ef132dd57d615e45fca2699e6c6fa5c711/src/hooks/use-annotation-manager.ts#L63)

Salva (cria ou atualiza) a anotação para o `annotationTargetEquipment`.

#### Parameters

##### text

`string`

#### Returns

`void`

***

### isAnnotationDialogOpen

> **isAnnotationDialogOpen**: `boolean`

Defined in: [src/hooks/use-annotation-manager.ts:58](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/329dd5ef132dd57d615e45fca2699e6c6fa5c711/src/hooks/use-annotation-manager.ts#L58)

Indica se o diálogo de anotação está aberto.

***

### setAnnotations

> **setAnnotations**: `Dispatch`\<`SetStateAction`\<`Annotation`[]\>\>

Defined in: [src/hooks/use-annotation-manager.ts:57](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/329dd5ef132dd57d615e45fca2699e6c6fa5c711/src/hooks/use-annotation-manager.ts#L57)

Função para definir diretamente a lista de anotações (geralmente usada internamente ou para inicialização).

***

### setIsAnnotationDialogOpen

> **setIsAnnotationDialogOpen**: `Dispatch`\<`SetStateAction`\<`boolean`\>\>

Defined in: [src/hooks/use-annotation-manager.ts:59](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/329dd5ef132dd57d615e45fca2699e6c6fa5c711/src/hooks/use-annotation-manager.ts#L59)

Função para definir o estado de abertura/fechamento do diálogo.
