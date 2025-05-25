[**3D Terminal System API Documentation**](../../../README.md)

***

[3D Terminal System API Documentation](../../../README.md) / [hooks/use-scene-setup](../README.md) / useSceneSetup

# Function: useSceneSetup()

> **useSceneSetup**(`props`): `UseSceneSetupReturn`

Defined in: [src/hooks/use-scene-setup.ts:60](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/894502f47f0ff64fee1a1aeae66790ab4080c55e/src/hooks/use-scene-setup.ts#L60)

A custom hook for handling the initial setup of a Three.js scene.
Encapsulates the creation of the scene, camera, renderers, controls, lighting, and ground plane.
Also manages the scene's readiness state and handles window resizing.

## Parameters

### props

`UseSceneSetupProps`

The properties for the hook.

## Returns

`UseSceneSetupReturn`

An object containing refs to the core scene elements and the readiness state.
