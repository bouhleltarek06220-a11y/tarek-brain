# 🚀 Three.js Starter Template

Template complet pour démarrer un projet Three.js.

## 📁 Structure

```
my-threejs-project/
├── index.html
├── main.js
├── styles.css
├── assets/
│   ├── models/
│   └── textures/
└── README.md
```

## 🎬 Fichiers

### index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Three.js Project</title>
    <link rel="stylesheet" href="styles.css">
    <script type="importmap">
    {
        "imports": {
            "three": "https://cdn.jsdelivr.net/npm/three@0.162.0/build/three.module.js",
            "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.162.0/examples/jsm/"
        }
    }
    </script>
</head>
<body>
    <div id="canvas-container"></div>
    <div id="info">Three.js Project</div>
    <script type="module" src="main.js"></script>
</body>
</html>
```

### main.js
```javascript
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Objects
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
const controls.enableDamping = true;
const controls.dampingFactor = 0.05;

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    
    controls.update();
    renderer.render(scene, camera);
}

animate();

// Responsive
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
```

### styles.css
```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background: #000;
    color: #fff;
    overflow: hidden;
}

#canvas-container {
    width: 100vw;
    height: 100vh;
    position: relative;
}

#info {
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 16px;
    background: rgba(0, 0, 0, 0.8);
    padding: 10px 15px;
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    pointer-events: none;
}
```

---

## 🚀 Démarrage Rapide

1. Crée le projet:
```bash
mkdir my-threejs-project
cd my-threejs-project
```

2. Copie les fichiers (index.html, main.js, styles.css)

3. Lance un serveur local:
```bash
python -m http.server 8000
# ou
npx serve .
```

4. Ouvre http://localhost:8000

---

## 📚 Prochaines Étapes

- [ ] Charger un modèle 3D (GLTF)
- [ ] Ajouter des textures
- [ ] Implémenter des interactions
- [ ] Ajouter des effets post-processing
- [ ] Optimiser la performance

---

**Ready to create! 🎨**
