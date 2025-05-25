
/**
 * Define as principais interfaces de tipo usadas em toda a aplicação Terminal 3D.
 * Estas estruturas de dados são cruciais para a consistência e tipagem do projeto,
 * descrevendo entidades como Equipamentos, Camadas, Estado da Câmera, Comandos e Anotações.
 * A clareza e precisão destas interfaces facilitam o desenvolvimento, a manutenção e
 * a compreensão do fluxo de dados através dos componentes e hooks.
 */

/**
 * Representa um equipamento na cena 3D. Contém todas as propriedades
 * necessárias para sua renderização, identificação e manipulação de estado.
 *
 * @interface Equipment
 * @property {string} tag - Identificador único e imutável do equipamento (e.g., "bldg-01", "tank-alpha"). Usado como chave.
 * @property {string} name - Nome legível do equipamento para exibição na UI (e.g., "Main Office", "Storage Tank Alpha").
 * @property {'Building' | 'Crane' | 'Tank' | 'Terrain' | 'Pipe' | 'Valve'} type - Categoria do equipamento, influencia sua geometria e interações.
 *           'Terrain' é um tipo especial para o plano de chão.
 * @property {string} [sistema] - O sistema operacional ou funcional ao qual o equipamento pertence (e.g., "GA", "ODB"). Opcional.
 * @property {string} [area] - A área física ou lógica onde o equipamento está localizado (e.g., "Área 31", "Área de Processo"). Opcional.
 * @property {string} [operationalState] - Estado operacional atual do equipamento (e.g., 'operando', 'manutenção', 'em falha', 'não operando', 'Não aplicável').
 *                                        Usado para colorização e informação. Opcional.
 * @property {string} [product] - Produto atualmente associado ou processado pelo equipamento (e.g., "70H", "660", "Não aplicável").
 *                               Usado para colorização e informação. Opcional.
 * @property {{ x: number; y: number; z: number }} position - Coordenadas (x, y, z) do centro geométrico do equipamento no espaço da cena.
 * @property {{ x: number; y: number; z: number }} [rotation] - Rotação do equipamento em radianos nos eixos x, y, z. Opcional.
 * @property {{ width: number; height: number; depth: number }} [size] - Dimensões (largura, altura, profundidade) para equipamentos com geometria de caixa (e.g., 'Building', 'Crane'). Opcional se `radius` e `height` forem usados.
 * @property {number} [radius] - Raio para equipamentos com geometria cilíndrica (e.g., 'Tank', 'Pipe') ou esférica (e.g., 'Valve'). Opcional se `size` for usado.
 * @property {number} [height] - Altura para equipamentos com geometria cilíndrica (e.g., 'Tank', 'Crane'). Para 'Pipe', representa o comprimento. Opcional se `size` for usado.
 * @property {string} color - Cor base do equipamento em formato hexadecimal (e.g., '#78909C'). Usada no modo de colorização 'Equipamento'.
 * @property {string} [details] - Detalhes textuais adicionais sobre o equipamento. Exibido no `InfoPanel`. Opcional.
 */
export interface Equipment {
  tag: string;
  name: string;
  type: 'Building' | 'Crane' | 'Tank' | 'Terrain' | 'Pipe' | 'Valve';
  sistema?: string;
  area?: string;
  operationalState?: string;
  product?: string;
  position: { x: number; y: number; z: number };
  rotation?: { x: number; y: number; z: number };
  size?: { width: number; height: number; depth: number };
  radius?: number;
  height?: number;
  color: string;
  details?: string;
}

/**
 * Representa uma camada de visualização na interface do usuário.
 * Camadas permitem ao usuário controlar a visibilidade de grupos de equipamentos
 * ou outros elementos da cena (como anotações ou o terreno).
 *
 * @interface Layer
 * @property {string} id - Identificador único da camada (e.g., 'layer-tanks', 'layer-annotations').
 * @property {string} name - Nome legível da camada para exibição na UI (e.g., "Tanques", "Anotações").
 * @property {Equipment['type'] | 'All' | 'Annotations' | 'Terrain'} equipmentType
 *           - O tipo de elemento que esta camada controla.
 *           - `Equipment['type']`: Controla equipamentos de um tipo específico (e.g., 'Building', 'Tank').
 *           - `'All'`: Potencialmente para controlar todos os equipamentos (uso específico a ser definido).
 *           - `'Annotations'`: Controla a visibilidade dos pins de anotação.
 *           - `'Terrain'`: Controla a visibilidade do plano de chão.
 * @property {boolean} isVisible - Indica se a camada (e os elementos que ela controla) está atualmente visível.
 */
export interface Layer {
  id: string;
  name: string;
  equipmentType: Equipment['type'] | 'All' | 'Annotations' | 'Terrain';
  isVisible: boolean;
}

/**
 * Representa o estado da câmera 3D, definido por sua posição e o ponto para o qual está olhando.
 * @interface CameraState
 * @property {{ x: number; y: number; z: number }} position - As coordenadas (x, y, z) da posição da câmera no espaço da cena.
 * @property {{ x: number; y: number; z: number }} lookAt - As coordenadas (x, y, z) do ponto no espaço para o qual a câmera está direcionada.
 */
export interface CameraState {
  position: { x: number; y: number; z: number };
  lookAt: { x: number; y: number; z: number };
}

/**
 * Representa um comando executável e reversível para o sistema de Undo/Redo.
 * Cada ação do usuário que pode ser desfeita (e.g., mover a câmera, alternar visibilidade de camada,
 * selecionar equipamento) deve ser encapsulada como um `Command`.
 *
 * @interface Command
 * @property {string} id - Identificador único do comando, geralmente incluindo um timestamp para unicidade.
 * @property {'CAMERA_MOVE' | 'LAYER_VISIBILITY' | 'EQUIPMENT_SELECT'} type - Tipo do comando, para categorização.
 * @property {() => void} execute - Função que realiza a ação do comando.
 * @property {() => void} undo - Função que reverte a ação do comando, restaurando o estado anterior.
 * @property {string} description - Descrição textual do comando, usada para logging ou exibição na UI (e.g., em toasts de undo/redo).
 */
export interface Command {
  id: string;
  type: 'CAMERA_MOVE' | 'LAYER_VISIBILITY' | 'EQUIPMENT_SELECT'; // Adicionar outros tipos conforme necessário
  execute: () => void;
  undo: () => void;
  description: string;
}

/**
 * Representa uma anotação textual associada a um equipamento específico.
 * Cada equipamento pode ter no máximo uma anotação.
 *
 * @interface Annotation
 * @property {string} equipmentTag - A tag do equipamento ao qual esta anotação está vinculada.
 *                                  Serve como chave estrangeira para o objeto `Equipment`.
 * @property {string} text - O conteúdo textual da anotação.
 * @property {string} createdAt - Data e hora em formato string ISO 8601 (e.g., "2023-10-27T10:30:00.000Z")
 *                                indicando quando a anotação foi criada ou atualizada pela última vez.
 */
export interface Annotation {
  equipmentTag: string;
  text: string;
  createdAt: string; // ISO 8601 date string
}

/**
 * Define os modos de colorização disponíveis para os equipamentos na cena 3D.
 * O usuário pode selecionar um desses modos para alterar a forma como os equipamentos são coloridos.
 *
 * - **'Produto'**: Colore os equipamentos com base no produto que eles manipulam/contêm.
 *                  A cor é gerada proceduralmente a partir do código do produto.
 * - **'Estado Operacional'**: Colore os equipamentos com base em seu estado operacional atual
 *                             (e.g., 'operando', 'manutenção', 'em falha').
 * - **'Equipamento'**: Utiliza a cor base definida individualmente para cada equipamento
 *                      em seus dados (`Equipment.color`).
 * @type ColorMode
 */
export type ColorMode = 'Produto' | 'Estado Operacional' | 'Equipamento';
