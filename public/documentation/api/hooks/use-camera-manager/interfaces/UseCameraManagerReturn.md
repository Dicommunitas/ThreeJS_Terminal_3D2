[**3D Terminal System API Documentation**](../../../README.md)

***

[3D Terminal System API Documentation](../../../README.md) / [hooks/use-camera-manager](../README.md) / UseCameraManagerReturn

# Interface: UseCameraManagerReturn

Defined in: [src/hooks/use-camera-manager.ts:52](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/97ab9f0ae2e42171aa40996aacad796786af9976/src/hooks/use-camera-manager.ts#L52)

Retorno do hook useCameraManager.
 UseCameraManagerReturn

## Properties

### currentCameraState

> **currentCameraState**: `undefined` \| `CameraState`

Defined in: [src/hooks/use-camera-manager.ts:53](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/97ab9f0ae2e42171aa40996aacad796786af9976/src/hooks/use-camera-manager.ts#L53)

O estado atual da câmera (posição e ponto de observação).

***

### defaultInitialCameraLookAt

> **defaultInitialCameraLookAt**: `object`

Defined in: [src/hooks/use-camera-manager.ts:59](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/97ab9f0ae2e42171aa40996aacad796786af9976/src/hooks/use-camera-manager.ts#L59)

Ponto de observação inicial padrão da câmera.

#### x

> **x**: `number`

#### y

> **y**: `number`

#### z

> **z**: `number`

***

### defaultInitialCameraPosition

> **defaultInitialCameraPosition**: `object`

Defined in: [src/hooks/use-camera-manager.ts:58](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/97ab9f0ae2e42171aa40996aacad796786af9976/src/hooks/use-camera-manager.ts#L58)

Posição inicial padrão da câmera.

#### x

> **x**: `number`

#### y

> **y**: `number`

#### z

> **z**: `number`

***

### handleCameraChangeFromScene()

> **handleCameraChangeFromScene**: (`newSceneCameraState`) => `void`

Defined in: [src/hooks/use-camera-manager.ts:56](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/97ab9f0ae2e42171aa40996aacad796786af9976/src/hooks/use-camera-manager.ts#L56)

Manipula mudanças de câmera provenientes da cena 3D e as registra no histórico.

#### Parameters

##### newSceneCameraState

`CameraState`

#### Returns

`void`

***

### handleSetCameraViewForSystem()

> **handleSetCameraViewForSystem**: (`systemName`) => `void`

Defined in: [src/hooks/use-camera-manager.ts:55](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/97ab9f0ae2e42171aa40996aacad796786af9976/src/hooks/use-camera-manager.ts#L55)

Define o sistema alvo para a câmera enquadrar.

#### Parameters

##### systemName

`string`

#### Returns

`void`

***

### onSystemFramed()

> **onSystemFramed**: () => `void`

Defined in: [src/hooks/use-camera-manager.ts:57](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/97ab9f0ae2e42171aa40996aacad796786af9976/src/hooks/use-camera-manager.ts#L57)

Callback para ser chamado pela ThreeScene após o enquadramento do sistema ser concluído, resetando o `targetSystemToFrame`.

#### Returns

`void`

***

### targetSystemToFrame

> **targetSystemToFrame**: `null` \| `string`

Defined in: [src/hooks/use-camera-manager.ts:54](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/97ab9f0ae2e42171aa40996aacad796786af9976/src/hooks/use-camera-manager.ts#L54)

O nome do sistema alvo para a câmera enquadrar. Null se nenhum sistema estiver sendo focado.
