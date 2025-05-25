[**3D Terminal System API Documentation**](../../../README.md)

***

[3D Terminal System API Documentation](../../../README.md) / [hooks/use-mouse-interaction](../README.md) / useMouseInteraction

# Function: useMouseInteraction()

> **useMouseInteraction**(`scene`, `camera`, `interactiveObjects`, `onObjectClick`, `onObjectHover`, `domElement`): `void`

Defined in: [src/hooks/use-mouse-interaction.ts:20](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/3ee0fc36a3337518d3717231e10fb625cedcf942/src/hooks/use-mouse-interaction.ts#L20)

A custom hook to handle mouse interactions (hover and click) with objects in a Three.js scene.

## Parameters

### scene

The Three.js scene.

`null` | `Scene`

### camera

The Three.js camera.

`null` | `Camera`

### interactiveObjects

`Object3D`\<`Object3DEventMap`\>[]

An array of objects in the scene that should be interactive.

### onObjectClick

(`object`) => `void`

Callback function to be called when an interactive object is clicked.

### onObjectHover

(`object`) => `void`

Callback function to be called when the mouse hovers over an interactive object, or null when no object is hovered.

### domElement

The DOM element (canvas) to attach event listeners to.

`null` | `HTMLElement`

## Returns

`void`
