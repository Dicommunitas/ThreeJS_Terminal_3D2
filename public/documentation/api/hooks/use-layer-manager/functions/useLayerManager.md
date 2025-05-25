[**3D Terminal System API Documentation**](../../../README.md)

***

[3D Terminal System API Documentation](../../../README.md) / [hooks/use-layer-manager](../README.md) / useLayerManager

# Function: useLayerManager()

> **useLayerManager**(`props`): [`UseLayerManagerReturn`](../interfaces/UseLayerManagerReturn.md)

Defined in: [src/hooks/use-layer-manager.ts:50](https://github.com/Dicommunitas/ThreeJS_Terminal_3D2/blob/50ef787d9f23a1c5f4362ca495ac1334ca854f4f/src/hooks/use-layer-manager.ts#L50)

Hook customizado para gerenciar o estado das camadas de visibilidade e sua manipulação.
Inicializa as camadas com `initialLayers` e permite alternar sua visibilidade,
registrando a ação no histórico de comandos.

## Parameters

### props

[`UseLayerManagerProps`](../interfaces/UseLayerManagerProps.md)

As props do hook, incluindo `executeCommand`.

## Returns

[`UseLayerManagerReturn`](../interfaces/UseLayerManagerReturn.md)

Um objeto contendo o estado das camadas e a função para alternar sua visibilidade.
