
/**
 * Componente React principal para renderizar e interagir com a cena 3D usando Three.js.
 * Este componente atua como o orquestrador central para a visualização 3D, sendo responsável por:
 *
 * - **Configuração Inicial da Cena:**
 *   - Criação da cena Three.js (`THREE.Scene`), câmera (`THREE.PerspectiveCamera`).
 *   - Configuração dos renderizadores: `WebGLRenderer` para a cena principal, `CSS2DRenderer` para rótulos HTML.
 *   - Configuração do pipeline de pós-processamento com `EffectComposer`, incluindo `RenderPass` e `OutlinePass`.
 *   - (Delegação para `scene-elements-setup.ts` para: `setupRenderPipeline`, `setupLighting`, `setupGroundPlane`).
 *
 * - **Gerenciamento de Elementos da Cena:**
 *   - Criação de geometrias e materiais para equipamentos individuais (função interna `createSingleEquipmentMesh`).
 *   - Atualização dinâmica dos meshes de equipamentos na cena com base nos dados de entrada (`equipment` prop)
 *     e visibilidade das camadas (`layers` prop), delegando para `updateEquipmentMeshesInScene` de `scene-elements-setup.ts`.
 *   - Exibição e atualização de pins de anotação (`CSS2DObject`), delegando para `updateAnnotationPins` de `label-renderer-utils.ts`.
 *
 * - **Interação e Controles:**
 *   - Configuração e atualização dos `OrbitControls` para navegação do usuário.
 *   - Processamento de interações do mouse (clique para seleção, movimento para hover) delegando para
 *     `processSceneClick` e `processSceneMouseMove` de `mouse-interaction-manager.ts`.
 *   - Aplicação de efeitos visuais de contorno (OutlinePass) para seleção e hover, utilizando o hook `useSceneOutline`
 *     (que internamente usa `updateOutlineEffect` de `postprocessing-utils.ts`).
 *
 * - **Controle de Câmera e Animação:**
 *   - Aplicação de estados de câmera programáticos (e.g., vindos de presets ou histórico de comandos).
 *   - Lógica para enquadrar ("focar") sistemas específicos de equipamentos, utilizando `calculateViewForMeshes` de `camera-utils.ts`.
 *   - Gerenciamento do loop de animação (`requestAnimationFrame`) através do hook `useAnimationLoop`.
 *
 * - **Gerenciamento de Ciclo de Vida e Estado:**
 *   - Manutenção do estado `isSceneReady` para sincronizar operações dependentes da prontidão da cena.
 *   - Manipulação do redimensionamento da janela/contêiner para atualizar câmera e renderizadores.
 *   - Limpeza de recursos Three.js (geometrias, materiais, renderizadores, ouvintes de eventos) na desmontagem do componente.
 *
 * Este componente é crucial para a funcionalidade de visualização 3D e integra diversos módulos e hooks
 * para manter a organização e separação de responsabilidades.
 */
"use client";

import React, { useRef, useEffect, useCallback, useState } from 'react';
import * as THREE from 'three';
import type { OrbitControls as OrbitControlsType } from 'three/examples/jsm/controls/OrbitControls.js'; // Correção para importação de tipo
import type { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import type { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import type { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';

import type { Equipment, Layer, CameraState, Annotation, ColorMode } from '@/lib/types';
import { getEquipmentColor } from '@/core/graphics/color-utils';
import { createGeometryForItem } from '@/core/three/equipment-geometry-factory';
import { setupLighting, setupGroundPlane, setupRenderPipeline, updateEquipmentMeshesInScene } from '@/core/three/scene-elements-setup';
import { updateAnnotationPins } from '@/core/three/label-renderer-utils';
import { calculateViewForMeshes } from '@/core/three/camera-utils';
import { processSceneClick, processSceneMouseMove } from '@/core/three/mouse-interaction-manager';
import { useAnimationLoop } from '@/hooks/use-animation-loop';
import { useSceneOutline } from '@/hooks/use-scene-outline';


/**
 * Props para o componente ThreeScene.
 * @interface ThreeSceneProps
 * @property {Equipment[]} equipment - Lista de equipamentos a serem renderizados (já filtrados).
 * @property {Layer[]} layers - Configuração das camadas de visibilidade para os tipos de equipamento.
 * @property {Annotation[]} annotations - Lista de anotações a serem exibidas como pins na cena.
 * @property {string[]} selectedEquipmentTags - Tags dos equipamentos atualmente selecionados, para aplicar o efeito de contorno.
 * @property {(tag: string | null, isMultiSelect: boolean) => void} onSelectEquipment - Callback invocado quando um equipamento é selecionado/deselecionado na cena.
 * @property {string | null} hoveredEquipmentTag - Tag do equipamento atualmente sob o cursor, para aplicar o efeito de contorno de hover.
 * @property {(tag: string | null) => void} setHoveredEquipmentTag - Callback para definir o equipamento em hover.
 * @property {CameraState | undefined} cameraState - O estado atual da câmera (posição, lookAt) controlado externamente (e.g., por presets ou undo/redo).
 * @property {(cameraState: CameraState) => void} onCameraChange - Callback invocado quando o estado da câmera muda devido à interação do usuário na cena (e.g., órbita).
 * @property {{ x: number; y: number; z: number }} initialCameraPosition - Posição inicial da câmera.
 * @property {{ x: number; y: number; z: number }} initialCameraLookAt - Ponto de observação (lookAt) inicial da câmera.
 * @property {ColorMode} colorMode - O modo de colorização atual para os equipamentos.
 * @property {string | null} targetSystemToFrame - O sistema que deve ser enquadrado pela câmera. Se não nulo, a câmera tentará focar nos equipamentos deste sistema.
 * @property {() => void} onSystemFramed - Callback chamado após a câmera terminar de enquadrar um sistema.
 */
export interface ThreeSceneProps {
  equipment: Equipment[];
  layers: Layer[];
  annotations: Annotation[];
  selectedEquipmentTags: string[] | undefined;
  onSelectEquipment: (tag: string | null, isMultiSelectModifierPressed: boolean) => void;
  hoveredEquipmentTag: string | null | undefined;
  setHoveredEquipmentTag: (tag: string | null) => void;
  cameraState?: CameraState;
  onCameraChange: (cameraState: CameraState) => void;
  initialCameraPosition: { x: number; y: number; z: number };
  initialCameraLookAt: { x: number; y: number; z: number };
  colorMode: ColorMode;
  targetSystemToFrame: string | null;
  onSystemFramed: () => void;
}

/**
 * Componente React principal para renderizar e interagir com a cena 3D usando Three.js.
 * Orquestra a configuração da cena, renderização de equipamentos, anotações,
 * interações de mouse, efeitos visuais e controle de câmera.
 * Utiliza vários utilitários e hooks para modularizar suas responsabilidades.
 *
 * @param {ThreeSceneProps} props As props do componente.
 * @returns {JSX.Element} O elemento div que serve como contêiner para a cena 3D.
 */
const ThreeScene: React.FC<ThreeSceneProps> = (props) => {
  const {
    equipment,
    layers,
    annotations,
    selectedEquipmentTags,
    onSelectEquipment,
    hoveredEquipmentTag,
    setHoveredEquipmentTag,
    cameraState: programmaticCameraState, // Renomeado para clareza
    onCameraChange,
    initialCameraPosition,
    initialCameraLookAt,
    colorMode,
    targetSystemToFrame,
    onSystemFramed,
  } = props;

  // console.log('[ThreeScene.tsx] Rendering. Props:', {
  //   equipmentCount: equipment.length,
  //   layers: JSON.stringify(layers),
  //   colorMode,
  //   selectedEquipmentTags,
  //   hoveredEquipmentTag,
  //   programmaticCameraState
  // });

  // Refs para elementos centrais do Three.js
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const labelRendererRef = useRef<CSS2DRenderer | null>(null);
  const controlsRef = useRef<OrbitControlsType | null>(null);
  const composerRef = useRef<EffectComposer | null>(null);
  const outlinePassRef = useRef<OutlinePass | null>(null);

  // Refs para objetos da cena
  const equipmentMeshesRef = useRef<THREE.Object3D[]>([]);
  const annotationPinObjectsRef = useRef<CSS2DObject[]>([]);
  const groundMeshRef = useRef<THREE.Mesh | null>(null);

  // Estado para controlar se a cena está pronta para interações e renderização
  const [isSceneReady, setIsSceneReady] = useState(false);

  // Refs para callbacks para evitar stale closures em manipuladores de eventos e useEffects
  // Isso garante que as versões mais recentes das funções de callback sejam usadas.
  const onSelectEquipmentRef = useRef(onSelectEquipment);
  const setHoveredEquipmentTagCallbackRef = useRef(setHoveredEquipmentTag);
  const onCameraChangeRef = useRef(onCameraChange);
  const onSystemFramedRef = useRef(onSystemFramed);

  useEffect(() => { onSelectEquipmentRef.current = onSelectEquipment; }, [onSelectEquipment]);
  useEffect(() => { setHoveredEquipmentTagCallbackRef.current = setHoveredEquipmentTag; }, [setHoveredEquipmentTag]);
  useEffect(() => { onCameraChangeRef.current = onCameraChange; }, [onCameraChange]);
  useEffect(() => { onSystemFramedRef.current = onSystemFramed; }, [onSystemFramed]);

  /**
   * @function createSingleEquipmentMesh
   * Cria um mesh 3D para um equipamento individual.
   * Utiliza a fábrica de geometria (`createGeometryForItem`) e o utilitário de cor (`getEquipmentColor`).
   * Define a posição, rotação, `userData` e propriedades de sombra do mesh.
   * @param {Equipment} item - O objeto de equipamento para o qual o mesh será criado.
   * @returns {THREE.Object3D} O mesh 3D criado.
   */
  const createSingleEquipmentMesh = useCallback((item: Equipment): THREE.Object3D => {
    const finalColor = getEquipmentColor(item, colorMode);
    const material = new THREE.MeshStandardMaterial({
      color: finalColor,
      metalness: 0.3,
      roughness: 0.6,
    });

    material.transparent = false; 
    material.opacity = 1.0;

    // console.log(`[ThreeScene.tsx createSingleEquipmentMesh] Item: ${item.tag}, Type: ${item.type}, OpState: ${item.operationalState}, Color: #${finalColor.getHexString()}, Opacity: ${material.opacity}, Transparent: ${material.transparent}, Visible: true`);

    const geometry = createGeometryForItem(item);
    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(item.position.x, item.position.y, item.position.z);
    if (item.rotation) {
      mesh.rotation.set(item.rotation.x, item.rotation.y, item.rotation.z);
    }
    mesh.userData = { tag: item.tag, type: item.type, sistema: item.sistema }; // Adiciona sistema para o OutlinePass
    mesh.castShadow = false;
    mesh.receiveShadow = false;
    mesh.visible = true; // Explicitamente set to true initially
    return mesh;
  }, [colorMode]);

  /**
   * @function handleResize
   * Manipula o redimensionamento do contêiner da cena.
   * Atualiza o aspect ratio da câmera e os tamanhos dos renderizadores e do composer.
   * É memoizada com `useCallback` para estabilidade da referência.
   */
  const handleResize = useCallback(() => {
    if (mountRef.current && cameraRef.current && rendererRef.current) {
      const width = Math.max(1, mountRef.current.clientWidth);
      const height = Math.max(1, mountRef.current.clientHeight);

      if (cameraRef.current) {
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
      }
      
      rendererRef.current?.setSize(width, height);
      labelRendererRef.current?.setSize(width, height);
      composerRef.current?.setSize(width, height);
      outlinePassRef.current?.resolution.set(width, height);
    }
  }, []);

  /**
   * useEffect principal para configuração inicial da cena Three.js.
   * Executa apenas uma vez na montagem do componente.
   * Configura cena, câmera, renderizador WebGL, luzes, chão, OrbitControls,
   * renderizador de rótulos 2D, e o pipeline de pós-processamento (EffectComposer, OutlinePass).
   * Também configura o observador de redimensionamento e define `isSceneReady`.
   */
  useEffect(() => {
    // console.log("[ThreeScene.tsx Main Setup useEffect] RUNNING");
    const currentMount = mountRef.current;
    if (!currentMount) {
      return;
    }
    
    // console.log("[ThreeScene.tsx Setup] Scene created.");
    sceneRef.current = new THREE.Scene();

    cameraRef.current = new THREE.PerspectiveCamera(75, Math.max(1, currentMount.clientWidth) / Math.max(1, currentMount.clientHeight), 0.1, 2000);
    if (initialCameraPosition && initialCameraLookAt) {
        cameraRef.current.position.set(initialCameraPosition.x, initialCameraPosition.y, initialCameraPosition.z);
        cameraRef.current.lookAt(initialCameraLookAt.x, initialCameraLookAt.y, initialCameraLookAt.z);
    } else {
        cameraRef.current.position.set(25, 20, 25);
        cameraRef.current.lookAt(0, 2, 0);
    }
    // console.log("[ThreeScene.tsx Setup] Camera Initial - FOV:", cameraRef.current.fov, ", Near:", cameraRef.current.near, ", Far:", cameraRef.current.far, ", Position:", cameraRef.current.position.toArray(), " Looking At:", initialCameraLookAt || {x:0,y:2,z:0} );
    
    const pipeline = setupRenderPipeline(currentMount, sceneRef.current, cameraRef.current);
    if (!pipeline) {
      setIsSceneReady(false);
      return;
    }
    rendererRef.current = pipeline.renderer;
    labelRendererRef.current = pipeline.labelRenderer;
    composerRef.current = pipeline.composer;
    outlinePassRef.current = pipeline.outlinePass;
    
    setupLighting(sceneRef.current);
    
    groundMeshRef.current = setupGroundPlane(sceneRef.current);
    
    const handleControlsChangeEnd = () => { 
        if (cameraRef.current && controlsRef.current && onCameraChangeRef.current) {
            const newCameraState: CameraState = {
                position: { x: cameraRef.current.position.x, y: cameraRef.current.position.y, z: cameraRef.current.position.z },
                lookAt: { x: controlsRef.current.target.x, y: controlsRef.current.target.y, z: controlsRef.current.target.z },
            };
            onCameraChangeRef.current(newCameraState);
        }
    };

    import('three/examples/jsm/controls/OrbitControls.js').then(module => {
        const OrbitControls = module.OrbitControls;
        if (OrbitControls && cameraRef.current && rendererRef.current?.domElement && !controlsRef.current) { 
            const currentControls = new OrbitControls(cameraRef.current, rendererRef.current.domElement);
            currentControls.enableDamping = true;
            currentControls.dampingFactor = 0.1;

            if (initialCameraLookAt) {
                currentControls.target.set(initialCameraLookAt.x, initialCameraLookAt.y, initialCameraLookAt.z);
            } else {
                currentControls.target.set(0, 2, 0); 
            }
            // console.log("[ThreeScene.tsx Setup] OrbitControls Initial Target:", currentControls.target.toArray());
            
            currentControls.mouseButtons = {
                LEFT: THREE.MOUSE.ROTATE,
                MIDDLE: THREE.MOUSE.ROTATE,
                RIGHT: THREE.MOUSE.PAN
            };

            currentControls.update();
            controlsRef.current = currentControls; 
            
            currentControls.addEventListener('end', handleControlsChangeEnd);

        } else if (!OrbitControls) {
            console.error("[ThreeScene.tsx Setup] OrbitControls module did not load correctly.");
        }
    }).catch(err => console.error("[ThreeScene.tsx Setup] Error loading OrbitControls", err));

    handleResize(); 
    
    const resizeObserver = new ResizeObserver(handleResize);
    if (currentMount) {
      resizeObserver.observe(currentMount);
    }
    
    const initialSetupTimeoutId = setTimeout(() => {
      handleResize(); 
      setIsSceneReady(true);
      // console.log("[ThreeScene.tsx Setup] Scene is now READY (after delay).");
    }, 150);

    return () => {
      // console.log("[ThreeScene.tsx Main Setup useEffect] CLEANUP RUNNING");
      clearTimeout(initialSetupTimeoutId);
      if (currentMount) {
        resizeObserver.unobserve(currentMount);
      }
      
      if (controlsRef.current) {
        controlsRef.current.removeEventListener('end', handleControlsChangeEnd);
        controlsRef.current.dispose();
        controlsRef.current = null;
      }
      
      composerRef.current?.dispose(); 
      composerRef.current = null;
      outlinePassRef.current = null; 

      if (labelRendererRef.current?.domElement?.parentNode) {
        labelRendererRef.current.domElement.parentNode.removeChild(labelRendererRef.current.domElement);
      }
      labelRendererRef.current = null; 

      if (rendererRef.current?.domElement?.parentNode) {
        rendererRef.current.domElement.parentNode.removeChild(rendererRef.current.domElement);
      }
      rendererRef.current?.dispose();
      rendererRef.current = null;
      
      equipmentMeshesRef.current.forEach(mesh => {
        sceneRef.current?.remove(mesh); 
        if (mesh instanceof THREE.Mesh) {
            mesh.geometry?.dispose();
            if (Array.isArray(mesh.material)) {
                mesh.material.forEach(m => m.dispose());
            } else if (mesh.material) {
                (mesh.material as THREE.Material).dispose();
            }
        }
      });
      equipmentMeshesRef.current = [];

      annotationPinObjectsRef.current.forEach(pin => {
        sceneRef.current?.remove(pin);
        if (pin.element.parentNode) {
          pin.element.parentNode.removeChild(pin.element);
        }
      });
      annotationPinObjectsRef.current = [];

      if (groundMeshRef.current) {
        sceneRef.current?.remove(groundMeshRef.current);
        groundMeshRef.current.geometry?.dispose();
        if (Array.isArray(groundMeshRef.current.material)) {
            (groundMeshRef.current.material as THREE.Material[]).forEach(m => m.dispose());
        } else {
            (groundMeshRef.current.material as THREE.Material)?.dispose();
        }
        groundMeshRef.current = null;
      }

      sceneRef.current?.clear(); 
      sceneRef.current = null;
      
      cameraRef.current = null; 
      
      setIsSceneReady(false);
      // console.log("[ThreeScene.tsx Main Setup useEffect] CLEANUP FINISHED");
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 


  /**
   * useEffect para atualizar os meshes dos equipamentos na cena.
   * É acionado quando `equipment`, `layers`, `colorMode` ou `isSceneReady` mudam.
   * Utiliza `updateEquipmentMeshesInScene` de `scene-elements-setup.ts`.
   */
  useEffect(() => {
    // console.log(`[ThreeScene.tsx EquipmentUpdate useEffect] Triggered. Equipment count: ${equipment?.length}, isSceneReady: ${isSceneReady}, colorMode: ${colorMode}, Layers: ${JSON.stringify(layers)}`);
    if (!isSceneReady || !sceneRef.current || !Array.isArray(equipment)) {
      // console.log('[ThreeScene.tsx EquipmentUpdate useEffect] SKIPPING: Scene not ready, sceneRef not current, or equipment not an array.');
      return;
    }
    updateEquipmentMeshesInScene({
      scene: sceneRef.current,
      equipmentMeshesRef: equipmentMeshesRef,
      newEquipmentData: equipment,
      layers,
      colorMode,
      createSingleEquipmentMesh, 
      groundMeshRef,
    });
    // console.log(`[ThreeScene.tsx EquipmentUpdate useEffect] Done. Meshes in ref after update: ${equipmentMeshesRef.current.length}`);
  }, [equipment, layers, colorMode, isSceneReady, createSingleEquipmentMesh]); 

  /**
   * useEffect para gerenciar os pins de anotação.
   * É acionado quando `annotations`, `layers`, `equipment` ou `isSceneReady` mudam.
   * Utiliza `updateAnnotationPins` de `label-renderer-utils.ts`.
   */
  useEffect(() => {
    if (!isSceneReady || !sceneRef.current || !labelRendererRef.current || !Array.isArray(annotations) || !Array.isArray(equipment)) {
      return;
    }
    updateAnnotationPins({
      scene: sceneRef.current,
      labelRenderer: labelRendererRef.current,
      annotations: annotations,
      equipmentData: equipment, 
      layers: layers,
      existingPinsRef: annotationPinObjectsRef,
    });
  }, [annotations, layers, equipment, isSceneReady]); 

  // Hook para gerenciar o efeito de contorno (OutlinePass).
  useSceneOutline({
    outlinePassRef,
    equipmentMeshesRef,
    selectedEquipmentTags: selectedEquipmentTags,
    hoveredEquipmentTag: hoveredEquipmentTag,
    isSceneReady,
  });

  /**
   * useEffect para aplicar o estado da câmera controlado programaticamente.
   * É acionado quando `programmaticCameraState` ou `isSceneReady` mudam.
   * Modifica a posição e o alvo da câmera e dos controles de órbita.
   */
  useEffect(() => {
    if (programmaticCameraState && cameraRef.current && controlsRef.current && isSceneReady) {
      const camera = cameraRef.current;
      const controls = controlsRef.current;
      
      const targetPosition = programmaticCameraState.position ? new THREE.Vector3(programmaticCameraState.position.x, programmaticCameraState.position.y, programmaticCameraState.position.z) : camera.position.clone();
      const targetLookAt = programmaticCameraState.lookAt ? new THREE.Vector3(programmaticCameraState.lookAt.x, programmaticCameraState.lookAt.y, programmaticCameraState.lookAt.z) : controls.target.clone();
      
      const positionChanged = !camera.position.equals(targetPosition);
      const lookAtChanged = !controls.target.equals(targetLookAt);

      if (positionChanged || lookAtChanged) {
        const oldEnabled = controls.enabled;
        controls.enabled = false;
        if (positionChanged) camera.position.copy(targetPosition);
        if (lookAtChanged) controls.target.copy(targetLookAt);
        controls.update();
        controls.enabled = oldEnabled;
      }
    }
  }, [programmaticCameraState, isSceneReady]);

  /**
   * useEffect para focar a câmera em um sistema específico.
   * É acionado quando `targetSystemToFrame`, `isSceneReady` ou `equipment` mudam.
   * Utiliza `calculateViewForMeshes` de `camera-utils.ts`.
   */
  useEffect(() => {
    if (!targetSystemToFrame || !sceneRef.current || !cameraRef.current || !controlsRef.current || !isSceneReady || equipmentMeshesRef.current.length === 0) {
      if (targetSystemToFrame && typeof onSystemFramedRef.current === 'function') {
        onSystemFramedRef.current();
      }
      return;
    }
    const systemMeshes = equipmentMeshesRef.current.filter(mesh => mesh.userData.sistema === targetSystemToFrame && mesh.visible);

    if (systemMeshes.length === 0) {
      if (typeof onSystemFramedRef.current === 'function') onSystemFramedRef.current();
      return;
    }
    const newView = calculateViewForMeshes(systemMeshes, cameraRef.current);
    if (newView && typeof onCameraChangeRef.current === 'function') {
      onCameraChangeRef.current({
        position: {x: newView.position.x, y: newView.position.y, z: newView.position.z },
        lookAt: {x: newView.lookAt.x, y: newView.lookAt.y, z: newView.lookAt.z },
      });
    }
    if (typeof onSystemFramedRef.current === 'function') {
      onSystemFramedRef.current();
    }
  }, [targetSystemToFrame, isSceneReady, equipment]); 

  // Hook para gerenciar o loop de animação.
  useAnimationLoop({
    isSceneReady,
    sceneRef,
    cameraRef,
    controlsRef,
    composerRef,
    labelRendererRef,
  });

  /**
   * Manipulador para o evento de movimento do mouse na cena.
   * Utiliza o `mouse-interaction-manager` para processar o hover.
   */
  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!isSceneReady || !mountRef.current || !cameraRef.current || !sceneRef.current || !equipmentMeshesRef.current) {
        return;
    }
    
    processSceneMouseMove(
        event,
        mountRef.current,
        cameraRef.current,
        equipmentMeshesRef.current,
        (tag) => { 
            if (typeof setHoveredEquipmentTagCallbackRef.current === 'function') {
                setHoveredEquipmentTagCallbackRef.current(tag);
            }
        }
    );
  }, [isSceneReady]);

  /**
   * Manipulador para o evento de clique na cena.
   * Utiliza o `mouse-interaction-manager` para processar a seleção.
   */
  const handleClick = useCallback((event: MouseEvent) => {
    if (event.button !== 0) { 
      return;
    }

    if (!isSceneReady || !mountRef.current || !cameraRef.current || !sceneRef.current || !equipmentMeshesRef.current ) {
        return;
    }
    
    processSceneClick(
        event,
        mountRef.current,
        cameraRef.current,
        equipmentMeshesRef.current,
        (tag, isMultiSelect) => { 
             if (typeof onSelectEquipmentRef.current === 'function') {
                onSelectEquipmentRef.current(tag, isMultiSelect);
            }
        }
    );
  }, [isSceneReady]); 

  /**
   * useEffect para adicionar e remover ouvintes de eventos do mouse (click e mousemove).
   */
  useEffect(() => {
    const currentMount = mountRef.current;
    if (currentMount && isSceneReady) { 
      currentMount.addEventListener('click', handleClick);
      currentMount.addEventListener('mousemove', handleMouseMove);

      return () => {
        currentMount.removeEventListener('click', handleClick);
        currentMount.removeEventListener('mousemove', handleMouseMove);
      };
    } else if (currentMount) {
        currentMount.removeEventListener('click', handleClick);
        currentMount.removeEventListener('mousemove', handleMouseMove);
    }
  }, [handleClick, handleMouseMove, isSceneReady]);


  return <div ref={mountRef} className="w-full h-full" />;
};

export default ThreeScene;


