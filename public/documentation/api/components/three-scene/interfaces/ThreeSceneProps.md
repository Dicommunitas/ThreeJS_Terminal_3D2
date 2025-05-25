[**3D Terminal System API Documentation**](../../../README.md)

***

[3D Terminal System API Documentation](../../../README.md) / [components/three-scene](../README.md) / ThreeSceneProps

# Interface: ThreeSceneProps

Defined in: [src/components/three-scene.tsx:76](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/894502f47f0ff64fee1a1aeae66790ab4080c55e/src/components/three-scene.tsx#L76)

Props para o componente ThreeScene.
 ThreeSceneProps

## Properties

### annotations

> **annotations**: `Annotation`[]

Defined in: [src/components/three-scene.tsx:79](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/894502f47f0ff64fee1a1aeae66790ab4080c55e/src/components/three-scene.tsx#L79)

Lista de anotações a serem exibidas como pins na cena.

***

### cameraState?

> `optional` **cameraState**: `CameraState`

Defined in: [src/components/three-scene.tsx:84](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/894502f47f0ff64fee1a1aeae66790ab4080c55e/src/components/three-scene.tsx#L84)

O estado atual da câmera (posição, lookAt) controlado externamente (e.g., por presets ou undo/redo).

***

### colorMode

> **colorMode**: `ColorMode`

Defined in: [src/components/three-scene.tsx:88](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/894502f47f0ff64fee1a1aeae66790ab4080c55e/src/components/three-scene.tsx#L88)

O modo de colorização atual para os equipamentos.

***

### equipment

> **equipment**: `Equipment`[]

Defined in: [src/components/three-scene.tsx:77](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/894502f47f0ff64fee1a1aeae66790ab4080c55e/src/components/three-scene.tsx#L77)

Lista de equipamentos a serem renderizados (já filtrados).

***

### hoveredEquipmentTag

> **hoveredEquipmentTag**: `undefined` \| `null` \| `string`

Defined in: [src/components/three-scene.tsx:82](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/894502f47f0ff64fee1a1aeae66790ab4080c55e/src/components/three-scene.tsx#L82)

Tag do equipamento atualmente sob o cursor, para aplicar o efeito de contorno de hover.

***

### initialCameraLookAt

> **initialCameraLookAt**: `object`

Defined in: [src/components/three-scene.tsx:87](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/894502f47f0ff64fee1a1aeae66790ab4080c55e/src/components/three-scene.tsx#L87)

Ponto de observação (lookAt) inicial da câmera.

#### x

> **x**: `number`

#### y

> **y**: `number`

#### z

> **z**: `number`

***

### initialCameraPosition

> **initialCameraPosition**: `object`

Defined in: [src/components/three-scene.tsx:86](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/894502f47f0ff64fee1a1aeae66790ab4080c55e/src/components/three-scene.tsx#L86)

Posição inicial da câmera.

#### x

> **x**: `number`

#### y

> **y**: `number`

#### z

> **z**: `number`

***

### layers

> **layers**: `Layer`[]

Defined in: [src/components/three-scene.tsx:78](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/894502f47f0ff64fee1a1aeae66790ab4080c55e/src/components/three-scene.tsx#L78)

Configuração das camadas de visibilidade para os tipos de equipamento.

***

### onCameraChange()

> **onCameraChange**: (`cameraState`) => `void`

Defined in: [src/components/three-scene.tsx:85](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/894502f47f0ff64fee1a1aeae66790ab4080c55e/src/components/three-scene.tsx#L85)

Callback invocado quando o estado da câmera muda devido à interação do usuário na cena (e.g., órbita).

#### Parameters

##### cameraState

`CameraState`

#### Returns

`void`

***

### onSelectEquipment()

> **onSelectEquipment**: (`tag`, `isMultiSelectModifierPressed`) => `void`

Defined in: [src/components/three-scene.tsx:81](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/894502f47f0ff64fee1a1aeae66790ab4080c55e/src/components/three-scene.tsx#L81)

Callback invocado quando um equipamento é selecionado/deselecionado na cena.

#### Parameters

##### tag

`null` | `string`

##### isMultiSelectModifierPressed

`boolean`

#### Returns

`void`

***

### onSystemFramed()

> **onSystemFramed**: () => `void`

Defined in: [src/components/three-scene.tsx:90](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/894502f47f0ff64fee1a1aeae66790ab4080c55e/src/components/three-scene.tsx#L90)

Callback chamado após a câmera terminar de enquadrar um sistema.

#### Returns

`void`

***

### selectedEquipmentTags

> **selectedEquipmentTags**: `undefined` \| `string`[]

Defined in: [src/components/three-scene.tsx:80](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/894502f47f0ff64fee1a1aeae66790ab4080c55e/src/components/three-scene.tsx#L80)

Tags dos equipamentos atualmente selecionados, para aplicar o efeito de contorno.

***

### setHoveredEquipmentTag()

> **setHoveredEquipmentTag**: (`tag`) => `void`

Defined in: [src/components/three-scene.tsx:83](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/894502f47f0ff64fee1a1aeae66790ab4080c55e/src/components/three-scene.tsx#L83)

Callback para definir o equipamento em hover.

#### Parameters

##### tag

`null` | `string`

#### Returns

`void`

***

### targetSystemToFrame

> **targetSystemToFrame**: `null` \| `string`

Defined in: [src/components/three-scene.tsx:89](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/894502f47f0ff64fee1a1aeae66790ab4080c55e/src/components/three-scene.tsx#L89)

O sistema que deve ser enquadrado pela câmera. Se não nulo, a câmera tentará focar nos equipamentos deste sistema.
