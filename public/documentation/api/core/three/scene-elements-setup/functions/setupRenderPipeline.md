[**3D Terminal System API Documentation**](../../../../README.md)

***

[3D Terminal System API Documentation](../../../../README.md) / [core/three/scene-elements-setup](../README.md) / setupRenderPipeline

# Function: setupRenderPipeline()

> **setupRenderPipeline**(`mountElement`, `scene`, `camera`): `null` \| \{ `composer`: `EffectComposer`; `labelRenderer`: `CSS2DRenderer`; `outlinePass`: `OutlinePass`; `renderer`: `WebGLRenderer`; \}

Defined in: [src/core/three/scene-elements-setup.ts:88](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/329dd5ef132dd57d615e45fca2699e6c6fa5c711/src/core/three/scene-elements-setup.ts#L88)

Configura os renderizadores principais (WebGL, CSS2D) e o pipeline de pós-processamento.
Centraliza a criação do WebGLRenderer, CSS2DRenderer, EffectComposer e OutlinePass.

## Parameters

### mountElement

`HTMLElement`

O elemento DOM onde o canvas WebGL e o renderer de labels serão montados.

### scene

`Scene`

A cena Three.js.

### camera

`PerspectiveCamera`

A câmera da cena.

## Returns

`null` \| \{ `composer`: `EffectComposer`; `labelRenderer`: `CSS2DRenderer`; `outlinePass`: `OutlinePass`; `renderer`: `WebGLRenderer`; \}

Um objeto contendo as instâncias configuradas, ou null se mountElement não for válido.
