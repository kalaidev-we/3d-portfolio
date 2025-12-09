import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

// --- Configuration ---
const CONFIG = {
    colors: {
        bg: 0x050510,
        desk: 0x111111,
        accent: 0x8a5cf5,
        accentEmissive: 0x6a3cc5,
        pcCase: 0x0a0a0a,
        screen: 0x000000,
        grid: 0x8a5cf5
    }
};

// --- Scene Setup ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(CONFIG.colors.bg);
scene.fog = new THREE.FogExp2(CONFIG.colors.bg, 0.015);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.5, 7);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
document.getElementById('canvas-container').appendChild(renderer.domElement);

// --- Post Processing (Bloom) ---
const renderScene = new RenderPass(scene, camera);

const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
bloomPass.threshold = 0.2;
bloomPass.strength = 1.2; // Intense bloom for neon look
bloomPass.radius = 0.5;

const composer = new EffectComposer(renderer);
composer.addPass(renderScene);
composer.addPass(bloomPass);

// --- Lighting ---
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(5, 10, 7);
dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;
dirLight.shadow.bias = -0.0001;
scene.add(dirLight);

// Neon Backlight
const backLight = new THREE.PointLight(CONFIG.colors.accent, 10, 20);
backLight.position.set(0, 2, -2.5);
scene.add(backLight);

// Screen Glow
const screenLight = new THREE.RectAreaLight(CONFIG.colors.accent, 5, 3, 1.7);
screenLight.position.set(0, 1.2, 0.5);
screenLight.lookAt(0, 1.2, 2);
scene.add(screenLight);


// --- Objects ---
const deskGroup = new THREE.Group();
scene.add(deskGroup);

// Materials
const matDesk = new THREE.MeshStandardMaterial({
    color: CONFIG.colors.desk,
    roughness: 0.2,
    metalness: 0.5
});
const matCase = new THREE.MeshStandardMaterial({
    color: CONFIG.colors.pcCase,
    roughness: 0.1,
    metalness: 0.9
});
const matAccent = new THREE.MeshStandardMaterial({
    color: CONFIG.colors.accent,
    emissive: CONFIG.colors.accentEmissive,
    emissiveIntensity: 3,
    toneMapped: false
});
const matDark = new THREE.MeshStandardMaterial({
    color: 0x050505,
    roughness: 0.8
});

// 1. Desk Top
const deskGeo = new THREE.BoxGeometry(6, 0.15, 3);
const desk = new THREE.Mesh(deskGeo, matDesk);
desk.position.y = -0.1;
desk.receiveShadow = true;
desk.castShadow = true;
deskGroup.add(desk);

// 2. Monitor
const monitorGroup = new THREE.Group();
deskGroup.add(monitorGroup);

// Stand
const standBaseGeo = new THREE.BoxGeometry(0.8, 0.05, 0.6);
const standBase = new THREE.Mesh(standBaseGeo, matDark);
standBase.castShadow = true;
monitorGroup.add(standBase);

const standNeckGeo = new THREE.BoxGeometry(0.15, 0.8, 0.1);
const standNeck = new THREE.Mesh(standNeckGeo, matDark);
standNeck.position.set(0, 0.4, -0.2);
monitorGroup.add(standNeck);

// Screen Frame
const screenFrameGeo = new THREE.BoxGeometry(3.25, 1.95, 0.1);
const screenFrame = new THREE.Mesh(screenFrameGeo, matDark);
screenFrame.position.set(0, 1.2, -0.1);
screenFrame.castShadow = true;
monitorGroup.add(screenFrame);

// Screen Display (Animated Code)
const canvas = document.createElement('canvas');
canvas.width = 1024;
canvas.height = 512;
const ctx = canvas.getContext('2d');

const screenTexture = new THREE.CanvasTexture(canvas);
const matScreenContent = new THREE.MeshBasicMaterial({ map: screenTexture });

const screenDisplayGeo = new THREE.PlaneGeometry(3.1, 1.8);
const screenDisplay = new THREE.Mesh(screenDisplayGeo, matScreenContent);
screenDisplay.position.set(0, 1.2, -0.04);
monitorGroup.add(screenDisplay);

// 3. PC Tower
const pcGroup = new THREE.Group();
pcGroup.position.set(2.2, 0.75, 0.5);
deskGroup.add(pcGroup);

const caseGeo = new THREE.BoxGeometry(0.9, 1.6, 1.6);
const pcCase = new THREE.Mesh(caseGeo, matCase);
pcCase.castShadow = true;
pcCase.receiveShadow = true;
pcGroup.add(pcCase);

// Glass Side Panel
const glassGeo = new THREE.PlaneGeometry(1.4, 1.4);
const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x000000,
    metalness: 0,
    roughness: 0,
    transmission: 0.5,
    transparent: true
});
const glassPanel = new THREE.Mesh(glassGeo, glassMat);
glassPanel.position.set(-0.46, 0, 0);
glassPanel.rotation.y = -Math.PI / 2;
pcGroup.add(glassPanel);

// Internal Components (Abstract)
const gpuGeo = new THREE.BoxGeometry(0.2, 0.1, 1.2);
const gpu = new THREE.Mesh(gpuGeo, matAccent);
gpu.position.set(0, -0.2, 0);
pcGroup.add(gpu);

// Fans
const fanGeo = new THREE.RingGeometry(0.2, 0.25, 32);
const fan1 = new THREE.Mesh(fanGeo, matAccent);
fan1.position.set(0.46, 0.4, 0.4);
fan1.rotation.y = Math.PI / 2;
pcGroup.add(fan1);
const fan2 = new THREE.Mesh(fanGeo, matAccent);
fan2.position.set(0.46, -0.2, 0.4);
fan2.rotation.y = Math.PI / 2;
pcGroup.add(fan2);


// 4. Peripherals
const kbGeo = new THREE.BoxGeometry(1.4, 0.05, 0.5);
const keyboard = new THREE.Mesh(kbGeo, matDark);
keyboard.position.set(-0.5, 0.03, 0.8);
keyboard.castShadow = true;
deskGroup.add(keyboard);

// Keycaps (Texture or simple blocks)
// RGB Underglow
const kbLightGeo = new THREE.BoxGeometry(1.42, 0.04, 0.52);
const kbLight = new THREE.Mesh(kbLightGeo, matAccent);
kbLight.position.set(-0.5, 0.01, 0.8);
deskGroup.add(kbLight);

const mouseGeo = new THREE.CapsuleGeometry(0.08, 0.15, 4, 8);
const mouse = new THREE.Mesh(mouseGeo, matDark);
mouse.rotation.x = Math.PI / 2;
mouse.rotation.z = -0.2;
mouse.position.set(0.7, 0.05, 0.8);
mouse.castShadow = true;
deskGroup.add(mouse);

const padGeo = new THREE.PlaneGeometry(0.9, 0.8);
const padMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.9 });
const pad = new THREE.Mesh(padGeo, padMat);
pad.rotation.x = -Math.PI / 2;
pad.position.set(0.7, 0.01, 0.8);
pad.receiveShadow = true;
deskGroup.add(pad);


// --- Particle System ---
const particlesGeo = new THREE.BufferGeometry();
const particlesCount = 700;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 15;
}

particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMat = new THREE.PointsMaterial({
    size: 0.02,
    color: CONFIG.colors.accent,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
scene.add(particlesMesh);


// --- Animation & Interaction ---

// Mouse Parallax
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
});

// Code Animation
const codeLines = [
    'import * as THREE from "three";',
    'class Developer {',
    '  constructor() {',
    '    this.name = "Kalaiarasu S";',
    '    this.skills = ["PHP", "JS", "3D"];',
    '    this.passion = Infinity;',
    '  }',
    '  deploy() {',
    '    console.log("Hello World!");',
    '  }',
    '}',
    '// System Online...',
    '// Rendering Dreams...'
];
let lineIndex = 0;
let charIndex = 0;
let lastDraw = 0;

function updateScreen(time) {
    if (time - lastDraw < 50) return; // Typing speed
    lastDraw = time;

    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, 1024, 512);

    ctx.font = '24px "Courier New", monospace';
    ctx.fillStyle = '#8a5cf5';

    let y = 40;
    for (let i = 0; i <= lineIndex; i++) {
        let text = codeLines[i];
        if (i === lineIndex) {
            text = text.substring(0, charIndex);
            // Cursor
            if (Math.floor(time / 500) % 2 === 0) text += '_';
        }
        ctx.fillText(text, 20, y);
        y += 35;
    }

    if (charIndex < codeLines[lineIndex].length) {
        charIndex++;
    } else {
        if (lineIndex < codeLines.length - 1) {
            lineIndex++;
            charIndex = 0;
        } else {
            // Reset loop
            if (Math.random() > 0.99) {
                lineIndex = 0;
                charIndex = 0;
            }
        }
    }
    screenTexture.needsUpdate = true;
}


// Main Loop
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    targetX = mouseX * 0.0005;
    targetY = mouseY * 0.0005;

    // Smooth camera movement
    deskGroup.rotation.y += 0.03 * (targetX - deskGroup.rotation.y);
    deskGroup.rotation.x += 0.03 * (targetY - deskGroup.rotation.x);

    // Floating
    deskGroup.position.y = Math.sin(elapsedTime * 0.5) * 0.1;

    // Particles
    particlesMesh.rotation.y = elapsedTime * 0.05;
    particlesMesh.rotation.x = elapsedTime * 0.02;

    // Fans
    fan1.rotation.z -= 0.2;
    fan2.rotation.z -= 0.2;

    updateScreen(performance.now());

    // Use composer for bloom
    composer.render();
}

animate();

// Resize Handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
});

// Hide Preloader
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('loaded');
    }, 1500); // Minimum 1.5s load time for effect
});
