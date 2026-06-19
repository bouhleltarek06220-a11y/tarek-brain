# 📚 Three.js - The JavaScript 3D Library

**Repo Officiel:** https://github.com/mrdoob/three.js  
**Stars:** ⭐⭐⭐ 200k+  
**Licence:** MIT  
**Date d'ajout:** 2026-06-19

## 📖 Description

**Three.js** est la librairie JavaScript 3D la plus populaire au monde. Elle fournit tout ce qu'il faut pour créer des graphiques 3D interactifs dans le navigateur utilisant WebGL.

### Caractéristiques principales
- ✅ Rendu 3D WebGL haute performance
- ✅ 1000+ exemples prêts à l'emploi
- ✅ Support de multiples formats (GLTF, FBX, OBJ, Collada, etc.)
- ✅ Lumières, ombres, matériaux PBR
- ✅ Particules, sprites, points de nuages
- ✅ Post-processing et effets
- ✅ Géométries génératives
- ✅ Animations et morphing
- ✅ Loaders pour assets 3D
- ✅ Contrôles (orbit, fly, pointerlock, etc.)

---

## 🏗️ Concepts Fondamentaux

### Scene (Scène)
Le conteneur pour tous tes objets 3D
```javascript
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);
```

### Camera (Caméra)
Ton point de vue dans la scène
```javascript
// Perspective (réaliste)
const camera = new THREE.PerspectiveCamera(
    75,                              // Field of view
    window.innerWidth / window.innerHeight,  // Aspect ratio
    0.1,                             // Near clipping plane
    1000                             // Far clipping plane
);

// Orthographic (2D-like)
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 1000);
```

### Renderer (Rendu)
Affiche la scène à l'écran
```javascript
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);
```

### Geometry (Géométrie)
La forme de l'objet
```javascript
// Primitives
const box = new THREE.BoxGeometry(1, 1, 1);
const sphere = new THREE.SphereGeometry(1, 32, 32);
const cylinder = new THREE.CylinderGeometry(1, 1, 2, 32);

// Custom
const geometry = new THREE.BufferGeometry();
// ... ajouter vertices, indices, etc.
```

### Material (Matériau)
Comment l'objet apparaît (couleur, texture, brillance)
```javascript
// Basic
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

// Phong (réaliste avec lumière)
const material = new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    shininess: 100,
    emissive: 0x000000
});

// Standard (PBR physique)
const material = new THREE.MeshStandardMaterial({
    color: 0x00ff00,
    metalness: 0.5,
    roughness: 0.5
});
```

### Mesh (Maille)
Combine Geometry + Material
```javascript
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
```

### Lighting (Lumière)
Éclaire la scène
```javascript
// Ambiant (lumière générale)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Directionnel (comme le soleil)
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);

// Point (comme une ampoule)
const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(0, 10, 0);
scene.add(pointLight);

// Spot (comme un projecteur)
const spotLight = new THREE.SpotLight(0xffffff, 1);
spotLight.position.set(5, 10, 5);
scene.target.position.set(0, 0, 0);
scene.add(spotLight);
```

---

## 🎨 Matériaux Courants

| Matériau | Utilisation | Avec Lumière ? |
|----------|------------|----------------|
| **MeshBasicMaterial** | UI, formes simples | ❌ Non |
| **MeshLambertMaterial** | Rendu rapide | ✅ Oui (simple) |
| **MeshPhongMaterial** | Objet brillants | ✅ Oui (bon) |
| **MeshStandardMaterial** | Rendu physique (PBR) | ✅ Oui (meilleur) |
| **MeshToonMaterial** | Style cartoon | ✅ Oui |
| **ShaderMaterial** | Custom complet | ✅ Oui (avancé) |

---

## 📦 Loaders Principaux

### GLTF/GLB (recommandé)
```javascript
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
loader.load('model.gltf', (gltf) => {
    const model = gltf.scene;
    scene.add(model);
});
```

### Texture
```javascript
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('texture.jpg');
const material = new THREE.MeshPhongMaterial({ map: texture });
```

### OBJ
```javascript
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

const loader = new OBJLoader();
loader.load('model.obj', (object) => {
    scene.add(object);
});
```

---

## 🎬 Animation Loop

```javascript
function animate() {
    requestAnimationFrame(animate);
    
    // Modifier objets
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    
    // Rendu
    renderer.render(scene, camera);
}

animate();
```

---

## 🎮 Contrôles Courants

### OrbitControls (Orbite autour d'un point)
```javascript
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const controls = new OrbitControls(camera, renderer.domElement);
const controls.enableDamping = true;
const controls.dampingFactor = 0.05;
const controls.autoRotate = true;

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
```

### FlyControls (Vol libre)
```javascript
import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js';

const controls = new FlyControls(camera, renderer.domElement);
const controls.movementSpeed = 25;
const controls.rollSpeed = Math.PI / 24;
```

---

## 🌈 Post-Processing (Effets)

```javascript
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass.js';

const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const bloomPass = new BloomPass(1.3, 8, 2, 0.85);
composer.addPass(bloomPass);

function animate() {
    requestAnimationFrame(animate);
    composer.render();
}
```

---

## 📊 Cas d'Usage

- 🎮 Jeux 3D
- 🏢 Visualisations architecturales
- 📊 Dashboards 3D
- 🎬 Expériences interactives
- 🛍️ E-commerce 3D
- 🌐 Métaverse/Worlds
- 🎓 Simulations éducatives
- 🚀 Visualisations scientifiques

---

## 🔗 Ressources Essentielles

- **Docs:** https://threejs.org/docs/
- **Examples:** https://threejs.org/examples/ (1000+)
- **GitHub:** https://github.com/mrdoob/three.js
- **NPM:** https://www.npmjs.com/package/three
- **Discourse:** https://discourse.threejs.org/ (Community)

---

## 🚀 Installation

### Via CDN (Quick Start)
```html
<script type="importmap">
{
    "imports": {
        "three": "https://cdn.jsdelivr.net/npm/three@0.162.0/build/three.module.js",
        "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.162.0/examples/jsm/"
    }
}
</script>

<script type="module">
import * as THREE from 'three';
// Use Three.js
</script>
```

### Via NPM (Production)
```bash
npm install three
```

```javascript
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
```

---

## 📈 Versions

- **Latest:** 0.162.0 (stable)
- **r160+:** Recommandé
- **r150:** Encore bon
- **Plus vieux:** À mettre à jour

---

**Status:** ✅ Référence officielle - À étudier et explorer
