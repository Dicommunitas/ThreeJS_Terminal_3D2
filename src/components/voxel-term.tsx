"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { createCrtMaterial } from './crt-shader-material';

const TEXT_CANVAS_WIDTH = 1024;
const TEXT_CANVAS_HEIGHT = 768;
const FONT_SIZE = 18; // Adjusted for better readability
const LINE_HEIGHT = FONT_SIZE * 1.3;
const PROMPT = '> ';
const MAX_HISTORY_LINES = Math.floor((TEXT_CANVAS_HEIGHT - FONT_SIZE) / LINE_HEIGHT) - 2; // Reserve space for input line

interface CommandHistoryItem {
  id: string;
  text: string;
  type: 'command' | 'output' | 'error';
}

const VoxelTerm: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const screenMeshRef = useRef<THREE.Mesh | null>(null);
  const crtMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  const textCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const textTextureRef = useRef<THREE.CanvasTexture | null>(null);
  const clockRef = useRef(new THREE.Clock());

  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<CommandHistoryItem[]>([]);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(true); // Assume focused by default

  const font = `bold ${FONT_SIZE}px var(--font-geist-mono, "Courier New", monospace)`;
  const textColor = '#BFFF00'; // Electric Lime
  const errorColor = '#FF0000'; // Red for errors
  const accentColor = '#00FFFF'; // Cyan for specific outputs

  const drawText = useCallback(() => {
    if (!textCanvasRef.current || !textTextureRef.current) return;

    const canvas = textCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas (texture background is handled by shader)
    ctx.fillStyle = 'rgba(0,0,0,0)'; // Transparent background for canvas
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.font = font;
    ctx.textBaseline = 'top';

    let yPos = FONT_SIZE * 0.5;

    const visibleHistory = commandHistory.slice(-MAX_HISTORY_LINES);

    visibleHistory.forEach(item => {
      if (yPos > TEXT_CANVAS_HEIGHT - LINE_HEIGHT * 2) return; // Stop if no space
      switch (item.type) {
        case 'command':
          ctx.fillStyle = textColor;
          break;
        case 'output':
          ctx.fillStyle = accentColor;
          break;
        case 'error':
          ctx.fillStyle = errorColor;
          break;
        default:
          ctx.fillStyle = textColor;
      }
      ctx.fillText(item.text, 10, yPos);
      yPos += LINE_HEIGHT;
    });
    
    ctx.fillStyle = textColor;
    const cursor = isFocused && cursorVisible ? '_' : '';
    ctx.fillText(`${PROMPT}${currentCommand}${cursor}`, 10, yPos);

    textTextureRef.current.needsUpdate = true;
  }, [currentCommand, commandHistory, cursorVisible, font, textColor, errorColor, accentColor, isFocused]);


  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    sceneRef.current = new THREE.Scene();
    cameraRef.current = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    rendererRef.current = new THREE.WebGLRenderer({ antialias: true });
    rendererRef.current.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    rendererRef.current.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(rendererRef.current.domElement);

    // Text canvas and texture
    textCanvasRef.current = document.createElement('canvas');
    textCanvasRef.current.width = TEXT_CANVAS_WIDTH;
    textCanvasRef.current.height = TEXT_CANVAS_HEIGHT;
    textTextureRef.current = new THREE.CanvasTexture(textCanvasRef.current);
    textTextureRef.current.minFilter = THREE.LinearFilter;
    textTextureRef.current.magFilter = THREE.LinearFilter;

    // CRT Material and Screen
    crtMaterialRef.current = createCrtMaterial(textTextureRef.current);
    const screenGeometry = new THREE.PlaneGeometry(16, 9); // 16:9 aspect ratio
    screenMeshRef.current = new THREE.Mesh(screenGeometry, crtMaterialRef.current);
    sceneRef.current.add(screenMeshRef.current);

    // Position camera
    cameraRef.current.position.z = 7; // Adjust camera distance to fit screen

    // Initial draw
    drawText();
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (crtMaterialRef.current) {
        crtMaterialRef.current.uniforms.uTime.value = clockRef.current.getElapsedTime();
      }
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    // Resize handler
    const handleResize = () => {
      if (mountRef.current && rendererRef.current && cameraRef.current) {
        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;
        rendererRef.current.setSize(width, height);
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
      }
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      rendererRef.current?.dispose();
      textTextureRef.current?.dispose();
      crtMaterialRef.current?.dispose();
      screenMeshRef.current?.geometry.dispose();
    };
  }, [drawText]);

  // Update text texture when dependencies change
  useEffect(() => {
    drawText();
  }, [drawText]);

  // Cursor blink effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);
    return () => clearInterval(blinkInterval);
  }, []);

  const addHistoryItem = (text: string, type: CommandHistoryItem['type']) => {
    setCommandHistory(prev => [...prev, { id: Date.now().toString() + Math.random(), text, type }]);
  };

  const processCommand = (command: string) => {
    addHistoryItem(`${PROMPT}${command}`, 'command');
    const [cmd, ...args] = command.toLowerCase().trim().split(' ');

    switch (cmd) {
      case 'help':
        addHistoryItem('Available commands:', 'output');
        addHistoryItem('  help - Show this help message', 'output');
        addHistoryItem('  clear - Clear the terminal screen', 'output');
        addHistoryItem('  echo [text] - Print text to screen', 'output');
        addHistoryItem('  date - Display current date and time', 'output');
        addHistoryItem('  ls - List files (simulated)', 'output');
        break;
      case 'clear':
        setCommandHistory([]);
        break;
      case 'echo':
        addHistoryItem(args.join(' ') || '', 'output');
        break;
      case 'date':
        addHistoryItem(new Date().toLocaleString(), 'output');
        break;
      case 'ls':
        addHistoryItem('README.md  config.sys  DOOM.EXE  image.gif', 'output');
        break;
      case '': // Empty command
        break;
      default:
        addHistoryItem(`Error: Command not found: ${cmd}`, 'error');
        break;
    }
    setCurrentCommand('');
  };
  
  // Keyboard input handler
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isFocused) return;

      event.preventDefault(); // Prevent default browser actions for most keys

      if (event.key === 'Enter') {
        processCommand(currentCommand);
      } else if (event.key === 'Backspace') {
        setCurrentCommand(prev => prev.slice(0, -1));
      } else if (event.key.length === 1) { // Handle printable characters
        setCurrentCommand(prev => prev + event.key);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentCommand, isFocused, processCommand]);

  // Handle focus for keyboard input (optional, as we capture globally for simplicity)
  // You might want to add a click listener to the mountRef to set isFocused
  useEffect(() => {
    const mountElement = mountRef.current;
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    if (mountElement) {
      mountElement.setAttribute('tabindex', '0'); // Make div focusable
      mountElement.addEventListener('focus', handleFocus);
      mountElement.addEventListener('blur', handleBlur);
      // Auto-focus on mount
      // mountElement.focus();
    }
    return () => {
      if (mountElement) {
        mountElement.removeEventListener('focus', handleFocus);
        mountElement.removeEventListener('blur', handleBlur);
      }
    };
  }, []);


  return <div ref={mountRef} style={{ width: '100vw', height: '100vh', cursor: 'text', outline: 'none' }} />;
};

export default VoxelTerm;
