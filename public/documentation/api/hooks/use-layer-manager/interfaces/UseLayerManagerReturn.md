[**3D Terminal System API Documentation**](../../../README.md)

***

[3D Terminal System API Documentation](../../../README.md) / [hooks/use-layer-manager](../README.md) / UseLayerManagerReturn

# Interface: UseLayerManagerReturn

Defined in: [src/hooks/use-layer-manager.ts:38](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/3ee0fc36a3337518d3717231e10fb625cedcf942/src/hooks/use-layer-manager.ts#L38)

Retorno do hook useLayerManager.
 UseLayerManagerReturn

## Properties

### handleToggleLayer()

> **handleToggleLayer**: (`layerId`) => `void`

Defined in: [src/hooks/use-layer-manager.ts:40](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/3ee0fc36a3337518d3717231e10fb625cedcf942/src/hooks/use-layer-manager.ts#L40)

Alterna a visibilidade de uma camada específica, registrando a ação no histórico.

#### Parameters

##### layerId

`string`

#### Returns

`void`

***

### layers

> **layers**: `Layer`[]

Defined in: [src/hooks/use-layer-manager.ts:39](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/3ee0fc36a3337518d3717231e10fb625cedcf942/src/hooks/use-layer-manager.ts#L39)

A lista atual de camadas e seus estados de visibilidade.
