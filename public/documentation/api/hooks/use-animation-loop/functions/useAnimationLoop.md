[**3D Terminal System API Documentation**](../../../README.md)

***

[3D Terminal System API Documentation](../../../README.md) / [hooks/use-animation-loop](../README.md) / useAnimationLoop

# Function: useAnimationLoop()

> **useAnimationLoop**(`props`): `void`

Defined in: [src/hooks/use-animation-loop.ts:44](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/97ab9f0ae2e42171aa40996aacad796786af9976/src/hooks/use-animation-loop.ts#L44)

Hook customizado para gerenciar o loop de animação de uma cena Three.js.
Ele configura e executa o `requestAnimationFrame` para renderizar a cena
e atualizar os controles, o composer e o renderizador de rótulos.
O loop só é iniciado quando `isSceneReady` é verdadeiro e todos os refs necessários estão populados.

## Parameters

### props

`UseAnimationLoopProps`

As props necessárias para o loop de animação.

## Returns

`void`
