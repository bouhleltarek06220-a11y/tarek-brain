# 🎨 Three.js Snippets - Code Réutilisable

Bibliothèque de snippets Three.js pour démarrer rapidement.

## 📁 Structure

```
snippets/threejs/
├── basic-setup.js          # Setup minimal
├── lighting-setup.js       # Configurations de lumière
├── loader-gltf.js          # Charger modèles 3D
├── materials.js            # Matériaux et textures
├── animations.js           # Animations utiles
├── post-processing.js      # Effets visuels
├── controls.js             # Contrôles caméra
├── geometry.js             # Géométries custom
├── particles.js            # Systèmes de particules
└── utils.js                # Utilitaires
```

---

## 1️⃣ Basic Setup

**File:** `basic-setup.js`

```javascript
import * as THREE from 'three';

export class BasicScene {
    constructor(container = document.body) {
        // Scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);

        // Camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 5;

        // Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;
        container.appendChild(this.renderer.domElement);

        // Handle resize
        window.addEventListener('resize', () => this.onWindowResize());
    }

    addObject(mesh) {
        this.scene.add(mesh);
    }

    animate(callback) {
        const loop = () => {
            requestAnimationFrame(loop);
            if (callback) callback(this);
            this.renderer.render(this.scene, this.camera);
        };
        loop();
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

// Usage
const scene = new BasicScene();
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.addObject(cube);
scene.animate(() => {
    cube.rotation.x += 0.01;
});
```

---

## 💡 Lighting Setup

**File:** `lighting-setup.js`

```javascript
import * as THREE from 'three';

export function setupLighting(scene) {
    // Ambient light (general brightness)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Directional light (like sun)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 10, 7.5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Secondary directional light
    const secondaryLight = new THREE.DirectionalLight(0xffffff, 1.0);
    secondaryLight.position.set(-5, 5, -5);
    scene.add(secondaryLight);

    return { ambientLight, directionalLight, secondaryLight };
}

export function setupAdvancedLighting(scene) {
    // With shadows
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(10, 20, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.left = -100;
    directionalLight.shadow.camera.right = 100;
    directionalLight.shadow.camera.top = 100;
    directionalLight.shadow.camera.bottom = -100;
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    return directionalLight;
}
```

---

## 📦 GLTF Loader

**File:** `loader-gltf.js`

```javascript
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export async function loadGLTF(url) {
    const loader = new GLTFLoader();
    return new Promise((resolve, reject) => {
        loader.load(
            url,
            (gltf) => resolve(gltf),
            (progress) => console.log(`Loading: ${(progress.loaded / progress.total * 100).toFixed(0)}%`),
            (error) => reject(error)
        );
    });
}

// Usage
const gltf = await loadGLTF('model.gltf');
const model = gltf.scene;
scene.add(model);

// Access animations
if (gltf.animations.length > 0) {
    const mixer = new THREE.AnimationMixer(model);
    const action = mixer.clipAction(gltf.animations[0]);
    action.play();
}
```

---

## 🎨 Materials & Textures

**File:** `materials.js`

```javascript
import * as THREE from 'three';

export function createPhongMaterial(color = 0x00ff00) {
    return new THREE.MeshPhongMaterial({
        color,
        shininess: 100,
        emissive: 0x000000,
        side: THREE.FrontSide
    });
}

export function createStandardMaterial(color = 0x00ff00) {
    return new THREE.MeshStandardMaterial({
        color,
        metalness: 0.5,
        roughness: 0.5,
        emissive: 0x000000
    });
}

export async function loadTexture(url) {
    const loader = new THREE.TextureLoader();
    return new Promise((resolve, reject) => {
        loader.load(url, resolve, undefined, reject);
    });
}

export async function createTexturedMaterial(colorUrl, normalUrl = null) {
    const colorTexture = await loadTexture(colorUrl);
    const material = new THREE.MeshPhongMaterial({ map: colorTexture });
    
    if (normalUrl) {
        const normalTexture = await loadTexture(normalUrl);
        material.normalMap = normalTexture;
    }
    
    return material;
}
```

---

## 🎬 Animations

**File:** `animations.js`

```javascript
import * as THREE from 'three';

export class AnimationController {
    constructor() {
        this.animations = [];
    }

    createRotation(object, speed = 0.01, axis = 'xyz') {
        this.animations.push(() => {
            if (axis.includes('x')) object.rotation.x += speed;
            if (axis.includes('y')) object.rotation.y += speed;
            if (axis.includes('z')) object.rotation.z += speed;
        });
    }

    createBounce(object, speed = 0.1, height = 0.5) {
        let time = 0;
        this.animations.push(() => {
            time += speed;
            object.position.y = height + Math.abs(Math.sin(time));
        });
    }

    createLerp(object, target, speed = 0.1) {
        this.animations.push(() => {
            object.position.lerp(target, speed);
        });
    }

    update() {
        this.animations.forEach(anim => anim());
    }
}
```

---

## 🎮 Controls

**File:** `controls.js`

```javascript
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js';

export function setupOrbitControls(camera, renderer) {
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = false;
    controls.autoRotateSpeed = 2;
    return controls;
}

export function setupFlyControls(camera, renderer) {
    const controls = new FlyControls(camera, renderer.domElement);
    controls.movementSpeed = 25;
    controls.rollSpeed = Math.PI / 24;
    return controls;
}
```

---

## ✨ Post-Processing (Effets)

**File:** `post-processing.js`

```javascript
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass.js';

export function setupPostProcessing(renderer, scene, camera) {
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);
    return composer;
}

export function addBloomEffect(composer) {
    const bloomPass = new BloomPass(
        1.3,    // strength
        8,      // kernelSize
        2,      // sigma
        0.85    // threshold
    );
    composer.addPass(bloomPass);
}
```

---

## 🌟 Particles System

**File:** `particles.js`

```javascript
import * as THREE from 'three';

export function createParticles(count = 1000, range = 100) {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * range;
        positions[i + 1] = (Math.random() - 0.5) * range;
        positions[i + 2] = (Math.random() - 0.5) * range;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.1,
        sizeAttenuation: true
    });
    
    return new THREE.Points(geometry, material);
}
```

---

## 🛠️ Utils

**File:** `utils.js`

```javascript
import * as THREE from 'three';

// Center object
export function centerObject(mesh) {
    const box = new THREE.Box3().setFromObject(mesh);
    const center = box.getCenter(new THREE.Vector3());
    mesh.position.sub(center);
}

// Scale to fit
export function fitToScene(mesh, size = 5) {
    const box = new THREE.Box3().setFromObject(mesh);
    const dimensions = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(dimensions.x, dimensions.y, dimensions.z);
    const scale = size / maxDim;
    mesh.scale.multiplyScalar(scale);
}

// Get mesh bounds
export function getBounds(mesh) {
    const box = new THREE.Box3().setFromObject(mesh);
    return {
        min: box.min,
        max: box.max,
        size: box.getSize(new THREE.Vector3()),
        center: box.getCenter(new THREE.Vector3())
    };
}
```

---

## 📚 Comment utiliser ces snippets

```javascript
import { BasicScene } from './threejs/basic-setup.js';
import { setupLighting } from './threejs/lighting-setup.js';
import { loadGLTF } from './threejs/loader-gltf.js';
import { centerObject, fitToScene } from './threejs/utils.js';

const scene = new BasicScene();
setupLighting(scene.scene);

const gltf = await loadGLTF('model.gltf');
const model = gltf.scene;
centerObject(model);
fitToScene(model, 10);
scene.addObject(model);

scene.animate(() => {
    model.rotation.y += 0.01;
});
```

---

**Status:** ✅ Snippets réutilisables
