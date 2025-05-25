
/**
 * Utilitários para determinar a cor dos equipamentos na cena 3D
 * com base no modo de colorização selecionado e nos atributos do equipamento.
 *
 * Responsabilidades:
 * - Fornecer uma função `getEquipmentColor` que calcula a cor final de um equipamento
 *   a ser renderizada na cena 3D.
 * - Implementar a lógica de coloração para diferentes modos:
 *   - **'Equipamento'**: Utiliza a cor base definida nos dados do equipamento (`item.color`).
 *   - **'Estado Operacional'**: Mapeia estados operacionais específicos (e.g., 'operando', 'manutenção',
 *     'em falha', 'não operando') para cores predefinidas (vermelho, amarelo, roxo, verde, respectivamente).
 *     Se o estado for 'Não aplicável' ou não reconhecido, usa a cor base.
 *   - **'Produto'**: Gera uma cor proceduralmente a partir dos três primeiros caracteres do código do produto.
 *     Se o produto não for aplicável ou for muito curto, usa a cor base.
 * - Incluir uma função auxiliar `getCharNumericValue` para converter caracteres de produto em valores numéricos
 *   usados na geração procedural de cores.
 */
import * as THREE from 'three';
import type { Equipment, ColorMode } from '@/lib/types';

/**
 * Converte um caractere ('0'-'9' ou 'A'-'Z') para um valor numérico (0-35).
 * '0'-'9' mapeiam para 0-9.
 * 'A'-'Z' (case-insensitive) mapeiam para 10-35.
 * Caracteres inválidos retornam 0.
 * Esta função é usada para gerar componentes de cor (R, G, B) a partir de códigos de produto.
 * @param {string} char O caractere a ser convertido.
 * @returns {number} O valor numérico correspondente (0-35), ou 0 para caracteres inválidos.
 */
function getCharNumericValue(char: string): number {
  const upperChar = char.toUpperCase();
  if (char >= '0' && char <= '9') {
    return parseInt(char, 10);
  } else if (upperChar >= 'A' && upperChar <= 'Z') {
    return upperChar.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
  }
  return 0; // Retorna 0 para caracteres não alfanuméricos ou inválidos
}

/**
 * Determina a cor final de um equipamento com base no modo de colorização e seus atributos.
 * @param {Equipment} item O equipamento para o qual a cor será determinada.
 * @param {ColorMode} colorMode O modo de colorização selecionado ('Equipamento', 'Estado Operacional', 'Produto').
 * @returns {THREE.Color} A cor calculada para o equipamento, como uma instância de `THREE.Color`.
 */
export function getEquipmentColor(item: Equipment, colorMode: ColorMode): THREE.Color {
  const baseColor = new THREE.Color(item.color); // Cor base definida nos dados do equipamento
  let finalColor = new THREE.Color(); // Cor a ser retornada

  switch (colorMode) {
    case 'Produto':
      if (item.product && item.product !== "Não aplicável" && item.product.length >= 3) {
        // Gera cor a partir dos 3 primeiros caracteres do produto
        const rVal = getCharNumericValue(item.product.charAt(0));
        const gVal = getCharNumericValue(item.product.charAt(1));
        const bVal = getCharNumericValue(item.product.charAt(2));
        // Normaliza os valores para o intervalo [0, 1]
        finalColor.setRGB(rVal / 35.0, gVal / 35.0, bVal / 35.0);
      } else {
        // Se o produto não for aplicável ou muito curto, usa a cor base
        finalColor.copy(baseColor);
      }
      break;
    case 'Estado Operacional':
      switch (item.operationalState) {
        case 'operando': finalColor.setHex(0xFF0000); break;       // Vermelho para 'operando'
        case 'não operando': finalColor.setHex(0x00FF00); break; // Verde para 'não operando'
        case 'manutenção': finalColor.setHex(0xFFFF00); break;   // Amarelo para 'manutenção'
        case 'em falha': finalColor.setHex(0xDA70D6); break;       // Roxo Orchid (quase rosa) para 'em falha'
        case 'Não aplicável': // Se o estado não for aplicável
        default: // Para qualquer outro estado não mapeado
          finalColor.copy(baseColor); // Usa a cor base
          break;
      }
      break;
    case 'Equipamento': // Colorir pela cor base definida no equipamento
    default:
      finalColor.copy(baseColor);
      break;
  }
  // console.log(`[ColorUtils.ts getEquipmentColor] Item: ${item.tag}, ColorMode: ${colorMode}, BaseColor: #${baseColor.getHexString()}, FinalColor: #${finalColor.getHexString()}, OpState: ${item.operationalState}`);
  return finalColor;
}
