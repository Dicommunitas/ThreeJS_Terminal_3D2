
/**
 * @fileOverview Utilitários para configurar elementos básicos e gerenciar meshes de equipamentos em uma cena Three.js.
 *
 * Responsabilidades:
 * - Configurar a iluminação da cena (`setupLighting`).
 * - Configurar o plano de chão/terreno (`setupGroundPlane`).
 * - Configurar o pipeline de renderização, incluindo WebGLRenderer, CSS2DRenderer, EffectComposer e OutlinePass (`setupRenderPipeline`).
 * - Atualizar dinamicamente os meshes dos equipamentos na cena com base nos dados de entrada e na visibilidade das camadas (`updateEquipmentMeshesInScene`).
 *
 * Exporta:
 * - `setupLighting`: Para adicionar luzes padrão à cena.
 * - `setupGroundPlane`: Para adicionar um plano de chão à cena.
 * - `setupRenderPipeline`: Para inicializar os renderizadores e o pipeline de pós-processamento.
 * - `updateEquipmentMeshesInScene`: Para sincronizar os objetos 3D dos equipamentos com os dados da aplicação.
 */
import * as THREE from 'three';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js'; 
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import type { Equipment, Layer, ColorMode } from '@/lib/types';

/**
 * Configura a iluminação padrão para a cena.
 * Adiciona uma AmbientLight, HemisphereLight e DirectionalLight.
 * @param {THREE.Scene} scene A instância da cena Three.js onde as luzes serão adicionadas.
 */
export function setupLighting(scene: THREE.Scene): void {
  const ambientLight = new THREE.AmbientLight(0xffffff, 2.0);
  scene.add(ambientLight);
  // console.log("[SceneElementsSetup.ts setupLighting] AmbientLight added.");

  const hemisphereLight = new THREE.HemisphereLight(0xADD8E6, 0x495436, 0.8);
  scene.add(hemisphereLight);
  // console.log("[SceneElementsSetup.ts setupLighting] HemisphereLight added.");

  const directionalLight = new THREE.DirectionalLight(0xffffff, 3.0);
  directionalLight.position.set(10, 15, 10);
  directionalLight.castShadow = false; // Sombras desabilitadas para performance
  scene.add(directionalLight);
  // console.log("[SceneElementsSetup.ts setupLighting] DirectionalLight added.");
}

/**
 * Configura o plano de chão (terreno) para a cena.
 * Cria um `THREE.Mesh` com `PlaneGeometry` e `MeshStandardMaterial`.
 * @param {THREE.Scene} scene A instância da cena Three.js onde o plano será adicionado.
 * @returns {THREE.Mesh} O mesh do plano de chão criado.
 */
export function setupGroundPlane(scene: THREE.Scene): THREE.Mesh {
  const groundGeometry = new THREE.PlaneGeometry(100, 100);
  const groundMaterial = new THREE.MeshStandardMaterial({
    color: 0xE6D8B0, // Cor de areia
    side: THREE.DoubleSide,
    metalness: 0.1,
    roughness: 0.8,
    transparent: false, // Modificado para opaco, conforme conversa anterior
    opacity: 1.0,       // Modificado para opaco
  });
  const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
  groundMesh.rotation.x = -Math.PI / 2;
  groundMesh.position.y = 0;
  groundMesh.receiveShadow = false; // Sombras desabilitadas para performance
  groundMesh.userData = { tag: 'terrain-ground-plane' }; 
  scene.add(groundMesh);
  // console.log("[SceneElementsSetup.ts setupGroundPlane] Ground plane added to scene.");
  return groundMesh;
}


/**
 * Configura os renderizadores principais (WebGL, CSS2D) e o pipeline de pós-processamento.
 * Centraliza a criação do WebGLRenderer, CSS2DRenderer, EffectComposer e OutlinePass.
 * @param {HTMLElement} mountElement - O elemento DOM onde o canvas WebGL e o renderer de labels serão montados.
 * @param {THREE.Scene} scene - A cena Three.js.
 * @param {THREE.PerspectiveCamera} camera - A câmera da cena.
 * @returns {{
 *   renderer: THREE.WebGLRenderer;
 *   labelRenderer: CSS2DRenderer;
 *   composer: EffectComposer;
 *   outlinePass: OutlinePass;
 * } | null} Um objeto contendo as instâncias configuradas, ou null se mountElement não for válido.
 */
export function setupRenderPipeline(
  mountElement: HTMLElement,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
): {
  renderer: THREE.WebGLRenderer;
  labelRenderer: CSS2DRenderer;
  composer: EffectComposer;
  outlinePass: OutlinePass;
} | null {
  if (!mountElement) {
    return null;
  }
  const initialWidth = Math.max(1, mountElement.clientWidth);
  const initialHeight = Math.max(1, mountElement.clientHeight);

  // WebGL Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(initialWidth, initialHeight);
  renderer.shadowMap.enabled = false; // Sombras desabilitadas para performance
  scene.background = new THREE.Color(0xA9C1D1); // Cor de fundo azulada/cinza claro
  scene.fog = new THREE.Fog(0xA9C1D1, 200, 1000); // Névoa distante, conforme ajuste anterior
  // console.log("[SceneElementsSetup.ts setupRenderPipeline] WebGLRenderer created.");


  // CSS2D Renderer para rótulos HTML
  const labelRenderer = new CSS2DRenderer();
  labelRenderer.setSize(initialWidth, initialHeight);
  labelRenderer.domElement.style.position = 'absolute';
  labelRenderer.domElement.style.top = '0px';
  labelRenderer.domElement.style.left = '0px';
  labelRenderer.domElement.style.pointerEvents = 'none';
  // console.log("[SceneElementsSetup.ts setupRenderPipeline] CSS2DRenderer created.");

  // EffectComposer e Passes para Pós-Processamento
  const composer = new EffectComposer(renderer);
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  const outlinePass = new OutlinePass(new THREE.Vector2(initialWidth, initialHeight), scene, camera);
  outlinePass.edgeStrength = 0; // Contorno desligado inicialmente
  outlinePass.edgeGlow = 0.0;
  outlinePass.edgeThickness = 1.0;
  outlinePass.visibleEdgeColor.set('#ffffff'); // Cor padrão, será sobrescrita por useSceneOutline
  outlinePass.hiddenEdgeColor.set('#190a05');
  outlinePass.pulsePeriod = 0;
  composer.addPass(outlinePass);
  // console.log("[SceneElementsSetup.ts setupRenderPipeline] EffectComposer with RenderPass and OutlinePass created.");

  if (!renderer.domElement.parentNode) {
    mountElement.appendChild(renderer.domElement);
  }
  if (!labelRenderer.domElement.parentNode) {
    mountElement.appendChild(labelRenderer.domElement);
  }
  // console.log("[SceneElementsSetup.ts setupRenderPipeline] Renderers appended to mountElement.");

  return { renderer, labelRenderer, composer, outlinePass };
}

/**
 * Interface para os parâmetros da função `updateEquipmentMeshesInScene`.
 * @interface UpdateEquipmentMeshesParams
 * @property {THREE.Scene} scene - A cena Three.js.
 * @property {React.MutableRefObject<THREE.Object3D[]>} equipmentMeshesRef - Ref para o array de meshes de equipamentos existentes.
 * @property {Equipment[]} newEquipmentData - A nova lista de equipamentos a serem renderizados (já filtrada).
 * @property {Layer[]} layers - A lista de camadas para determinar a visibilidade por tipo.
 * @property {ColorMode} colorMode - O modo de colorização atual para os equipamentos.
 * @property {(item: Equipment) => THREE.Object3D} createSingleEquipmentMesh - Função callback para criar um mesh de equipamento individual.
 * @property {React.MutableRefObject<THREE.Mesh | null>} groundMeshRef - Ref para o mesh do plano de chão, para controle de visibilidade.
 */
interface UpdateEquipmentMeshesParams {
  scene: THREE.Scene;
  equipmentMeshesRef: React.MutableRefObject<THREE.Object3D[]>;
  newEquipmentData: Equipment[];
  layers: Layer[];
  colorMode: ColorMode;
  createSingleEquipmentMesh: (item: Equipment) => THREE.Object3D;
  groundMeshRef: React.MutableRefObject<THREE.Mesh | null>;
}

/**
 * Atualiza a lista de meshes de equipamentos na cena com base nos novos dados.
 * Remove meshes antigos, atualiza existentes (recriando-os para garantir consistência de material/cor)
 * e adiciona novos, considerando a visibilidade das camadas. Também gerencia a visibilidade do plano de chão.
 *
 * @param {UpdateEquipmentMeshesParams} params - Os parâmetros para a função.
 */
export function updateEquipmentMeshesInScene({
  scene,
  equipmentMeshesRef,
  newEquipmentData,
  layers,
  colorMode,
  createSingleEquipmentMesh,
  groundMeshRef,
}: UpdateEquipmentMeshesParams): void {
  // console.log(`[SceneElementsSetup.ts updateEquipmentMeshesInScene] Start. New data count: ${newEquipmentData.length}. Layers: ${JSON.stringify(layers)}`);
  if (!scene) {
    // console.warn("[SceneElementsSetup.ts updateEquipmentMeshesInScene] Scene is null. Aborting.");
    return;
  }
  if (!equipmentMeshesRef || equipmentMeshesRef.current === undefined || equipmentMeshesRef.current === null) {
    // console.warn("[SceneElementsSetup.ts updateEquipmentMeshesInScene] equipmentMeshesRef is invalid. Aborting.");
    return;
  }
   
  const currentMeshesByTag: Map<string, THREE.Object3D> = new Map();
  equipmentMeshesRef.current.forEach(mesh => {
    if (mesh.userData.tag) {
      currentMeshesByTag.set(mesh.userData.tag, mesh);
    }
  });

  const tagsInNewData = new Set(newEquipmentData.map(e => e.tag));
  const newVisibleMeshesList: THREE.Object3D[] = [];

  // 1. Remover meshes que não estão nos novos dados ou cuja camada os tornou invisíveis
  equipmentMeshesRef.current.forEach(mesh => {
    const itemTag = mesh.userData.tag;
    const itemInNewData = newEquipmentData.find(e => e.tag === itemTag);
    const layerForItem = itemInNewData ? layers.find(l => l.equipmentType === itemInNewData.type) : undefined;
    const isVisibleByLayer = layerForItem?.isVisible ?? (itemInNewData ? true : false); 

    if (!tagsInNewData.has(itemTag) || (itemInNewData && !isVisibleByLayer)) {
      // console.log(`[SceneElementsSetup.ts updateEquipmentMeshesInScene] Removing mesh: ${itemTag}. InNewData: ${tagsInNewData.has(itemTag)}, VisibleByLayer: ${isVisibleByLayer}`);
      scene.remove(mesh);
      if (mesh instanceof THREE.Mesh) {
        mesh.geometry?.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach(m => m.dispose());
        } else if (mesh.material) {
          (mesh.material as THREE.Material).dispose();
        }
      }
      currentMeshesByTag.delete(itemTag);
    }
  });

  // 2. Adicionar novos ou atualizar existentes (aqui, recriamos para garantir material/cor)
  newEquipmentData.forEach(item => {
    const layerForItem = layers.find(l => l.equipmentType === item.type);
    const isVisibleByLayer = layerForItem?.isVisible ?? true; 

    if (!isVisibleByLayer) {
      // console.log(`[SceneElementsSetup.ts updateEquipmentMeshesInScene] Skipping mesh (layer not visible): ${item.tag}`);
      return;
    }

    let existingMesh = currentMeshesByTag.get(item.tag);

    if (existingMesh) {
        // console.log(`[SceneElementsSetup.ts updateEquipmentMeshesInScene] Removing existing mesh to update: ${item.tag}`);
        scene.remove(existingMesh);
        if (existingMesh instanceof THREE.Mesh) {
            existingMesh.geometry?.dispose();
             if (Array.isArray(existingMesh.material)) {
                (existingMesh.material as THREE.Material[]).forEach(m => m.dispose());
            } else if (existingMesh.material) {
                (existingMesh.material as THREE.Material).dispose();
            }
        }
    }
    
    // console.log(`[SceneElementsSetup.ts updateEquipmentMeshesInScene] Creating new mesh for ${item.tag}.`);
    const newOrUpdatedMesh = createSingleEquipmentMesh(item); 
    newOrUpdatedMesh.visible = isVisibleByLayer;
    scene.add(newOrUpdatedMesh);
    newVisibleMeshesList.push(newOrUpdatedMesh);
    // console.log(`[SceneElementsSetup.ts updateEquipmentMeshesInScene] Added/Updated mesh ${item.tag} to scene. Visible: ${isVisibleByLayer}`);
  });

  equipmentMeshesRef.current = newVisibleMeshesList;
  // console.log(`[SceneElementsSetup.ts updateEquipmentMeshesInScene] Final equipmentMeshesRef.current count: ${equipmentMeshesRef.current.length}`);
  // equipmentMeshesRef.current.forEach(m => console.log(`[SceneElementsSetup.ts updateEquipmentMeshesInScene] Mesh in scene: ${m.userData.tag}, visible: ${m.visible}`));


  // 3. Gerenciar visibilidade do plano de chão
  const terrainLayer = layers.find(l => l.id === 'layer-terrain');
  if (terrainLayer && groundMeshRef && groundMeshRef.current) {
    const isGroundInScene = scene.children.some(child => child.uuid === groundMeshRef.current?.uuid);
    const groundShouldBeVisible = terrainLayer.isVisible;
    // console.log(`[SceneElementsSetup.ts updateEquipmentMeshesInScene] Ground plane: layer.isVisible=${groundShouldBeVisible}, isGroundInScene=${isGroundInScene}`);
    
    if (groundShouldBeVisible && !isGroundInScene) {
      scene.add(groundMeshRef.current);
      // console.log("[SceneElementsSetup.ts updateEquipmentMeshesInScene] Added ground plane to scene.");
    } else if (!groundShouldBeVisible && isGroundInScene) {
      scene.remove(groundMeshRef.current);
      // console.log("[SceneElementsSetup.ts updateEquipmentMeshesInScene] Removed ground plane from scene.");
    }
    groundMeshRef.current.visible = groundShouldBeVisible;
  }
}

