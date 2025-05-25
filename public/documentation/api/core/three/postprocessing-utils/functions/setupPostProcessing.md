[**3D Terminal System API Documentation**](../../../../README.md)

***

[3D Terminal System API Documentation](../../../../README.md) / [core/three/postprocessing-utils](../README.md) / setupPostProcessing

# Function: setupPostProcessing()

> **setupPostProcessing**(`renderer`, `scene`, `camera`, `initialWidth`, `initialHeight`): `object`

Defined in: [src/core/three/postprocessing-utils.ts:65](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/50ef787d9f23a1c5f4362ca495ac1334ca854f4f/src/core/three/postprocessing-utils.ts#L65)

Configura o pipeline de pós-processamento, incluindo o EffectComposer e o OutlinePass.
Esta função é chamada uma vez durante o setup inicial da cena.

## Parameters

### renderer

`WebGLRenderer`

O renderizador WebGL principal.

### scene

`Scene`

A cena 3D.

### camera

`PerspectiveCamera`

A câmera da cena.

### initialWidth

`number`

A largura inicial do canvas de renderização.

### initialHeight

`number`

A altura inicial do canvas de renderização.

## Returns

`object`

Um objeto contendo o EffectComposer e o OutlinePass configurados.

### composer

> **composer**: `EffectComposer`

### outlinePass

> **outlinePass**: `OutlinePass`
