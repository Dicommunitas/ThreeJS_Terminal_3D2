import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform vec3 uTextColor; // Added for configurable text color via accent
  uniform vec3 uScreenBackgroundColor; // Added for screen background color

  varying vec2 vUv;

  // Noise function for more organic flicker/static
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  void main() {
    vec2 uv = vUv;

    // Slight barrel distortion
    // vec2 screenCenter = vec2(0.5, 0.5);
    // float distortionStrength = 0.03; // Subtle distortion
    // vec2 diff = uv - screenCenter;
    // float rSq = dot(diff, diff);
    // uv = screenCenter + diff * (1.0 + distortionStrength * rSq);
    
    vec4 texColor;
    // if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
    //   texColor = vec4(uScreenBackgroundColor, 1.0); // Use screen background if distorted UV is out of bounds
    // } else {
      texColor = texture2D(uTexture, uv);
    // }


    vec3 finalColor = texColor.rgb;

    // If texture alpha is high, it's text. Use uTextColor. Otherwise, it's background.
    if (texColor.a > 0.5) {
      finalColor = uTextColor;
    } else {
      finalColor = uScreenBackgroundColor;
    }
    
    // Scan lines
    float scanLineIntensity = 0.1;
    float scanLineFrequency = 800.0; // Higher for finer lines
    float scanLineEffect = scanLineIntensity * 0.5 * (1.0 + sin(uv.y * scanLineFrequency));
    finalColor -= scanLineEffect * finalColor; // Modulate existing color

    // Flicker & Noise
    float timeBasedNoise = random(uv + mod(uTime * 0.1, 1.0));
    float flickerIntensity = 0.05 + timeBasedNoise * 0.05; // Vary flicker intensity with noise
    finalColor *= (1.0 - flickerIntensity);

    // Vignette
    float vignetteStrength = 0.5;
    float vignette = length(uv - vec2(0.5, 0.5));
    finalColor *= (1.0 - pow(vignette, 2.0) * vignetteStrength);

    // Chromatic aberration (subtle)
    // float aberrationAmount = 0.001;
    // finalColor.r = texture2D(uTexture, uv + vec2(aberrationAmount, 0.0)).r * (texColor.a > 0.5 ? uTextColor.r : uScreenBackgroundColor.r);
    // finalColor.b = texture2D(uTexture, uv - vec2(aberrationAmount, 0.0)).b * (texColor.a > 0.5 ? uTextColor.b : uScreenBackgroundColor.b);


    gl_FragColor = vec4(clamp(finalColor, 0.0, 1.0), 1.0);
  }
`;

export function createCrtMaterial(textTexture: THREE.CanvasTexture): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTexture: { value: textTexture },
      uTime: { value: 0.0 },
      uTextColor: { value: new THREE.Color(0xBFFF00) }, // Electric Lime
      uScreenBackgroundColor: { value: new THREE.Color(0x1A1A1A) } // Very dark grey
    },
    vertexShader,
    fragmentShader,
  });
}
