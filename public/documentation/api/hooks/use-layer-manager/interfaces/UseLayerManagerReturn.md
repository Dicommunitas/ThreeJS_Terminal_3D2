[**3D Terminal System API Documentation**](../../../README.md)

***

[3D Terminal System API Documentation](../../../README.md) / [hooks/use-layer-manager](../README.md) / UseLayerManagerReturn

# Interface: UseLayerManagerReturn

Defined in: [src/hooks/use-layer-manager.ts:38](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/7cc56be20ce03492e7afbc2e75ffa70f9c523fe8/src/hooks/use-layer-manager.ts#L38)

Retorno do hook useLayerManager.
 UseLayerManagerReturn

## Properties

### handleToggleLayer()

> **handleToggleLayer**: (`layerId`) => `void`

Defined in: [src/hooks/use-layer-manager.ts:40](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/7cc56be20ce03492e7afbc2e75ffa70f9c523fe8/src/hooks/use-layer-manager.ts#L40)

Alterna a visibilidade de uma camada específica, registrando a ação no histórico.

#### Parameters

##### layerId

`string`

#### Returns

`void`

***

### layers

> **layers**: `Layer`[]

Defined in: [src/hooks/use-layer-manager.ts:39](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/7cc56be20ce03492e7afbc2e75ffa70f9c523fe8/src/hooks/use-layer-manager.ts#L39)

A lista atual de camadas e seus estados de visibilidade.
