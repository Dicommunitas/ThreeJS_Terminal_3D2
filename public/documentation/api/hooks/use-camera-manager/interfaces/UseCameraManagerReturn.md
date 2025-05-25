[**3D Terminal System API Documentation**](../../../README.md)

***

[3D Terminal System API Documentation](../../../README.md) / [hooks/use-camera-manager](../README.md) / UseCameraManagerReturn

# Interface: UseCameraManagerReturn

Defined in: [src/hooks/use-camera-manager.ts:58](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/329dd5ef132dd57d615e45fca2699e6c6fa5c711/src/hooks/use-camera-manager.ts#L58)

Retorno do hook `useCameraManager`.
 UseCameraManagerReturn

## Properties

### currentCameraState

> **currentCameraState**: `undefined` \| `CameraState`

Defined in: [src/hooks/use-camera-manager.ts:59](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/329dd5ef132dd57d615e45fca2699e6c6fa5c711/src/hooks/use-camera-manager.ts#L59)

O estado atual da câmera (posição e ponto de observação).
                                                      Pode ser `undefined` antes da inicialização completa.

***

### defaultInitialCameraLookAt

> **defaultInitialCameraLookAt**: `object`

Defined in: [src/hooks/use-camera-manager.ts:65](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/329dd5ef132dd57d615e45fca2699e6c6fa5c711/src/hooks/use-camera-manager.ts#L65)

Exporta o ponto de observação inicial padrão da câmera.

#### x

> **x**: `number`

#### y

> **y**: `number`

#### z

> **z**: `number`

***

### defaultInitialCameraPosition

> **defaultInitialCameraPosition**: `object`

Defined in: [src/hooks/use-camera-manager.ts:64](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/329dd5ef132dd57d615e45fca2699e6c6fa5c711/src/hooks/use-camera-manager.ts#L64)

Exporta a posição inicial padrão da câmera.

#### x

> **x**: `number`

#### y

> **y**: `number`

#### z

> **z**: `number`

***

### handleCameraChangeFromScene()

> **handleCameraChangeFromScene**: (`newSceneCameraState`) => `void`

Defined in: [src/hooks/use-camera-manager.ts:62](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/329dd5ef132dd57d615e45fca2699e6c6fa5c711/src/hooks/use-camera-manager.ts#L62)

Manipula mudanças de câmera provenientes da cena 3D
                                                                                   (e.g., interações do usuário com OrbitControls)
                                                                                   e as registra no histórico de comandos.

#### Parameters

##### newSceneCameraState

`CameraState`

#### Returns

`void`

***

### handleSetCameraViewForSystem()

> **handleSetCameraViewForSystem**: (`systemName`) => `void`

Defined in: [src/hooks/use-camera-manager.ts:61](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/329dd5ef132dd57d615e45fca2699e6c6fa5c711/src/hooks/use-camera-manager.ts#L61)

Função para definir o sistema alvo para a câmera enquadrar.

#### Parameters

##### systemName

`string`

#### Returns

`void`

***

### onSystemFramed()

> **onSystemFramed**: () => `void`

Defined in: [src/hooks/use-camera-manager.ts:63](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/329dd5ef132dd57d615e45fca2699e6c6fa5c711/src/hooks/use-camera-manager.ts#L63)

Callback para ser chamado pela `ThreeScene` após o enquadramento do sistema ser concluído.
                                      Isso reseta o `targetSystemToFrame`.

#### Returns

`void`

***

### targetSystemToFrame

> **targetSystemToFrame**: `null` \| `string`

Defined in: [src/hooks/use-camera-manager.ts:60](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/329dd5ef132dd57d615e45fca2699e6c6fa5c711/src/hooks/use-camera-manager.ts#L60)

O nome do sistema alvo para a câmera enquadrar.
                                               Null se nenhum sistema estiver sendo focado.
