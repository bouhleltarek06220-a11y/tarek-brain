# 🎓 Template Vanilla JS + Three.js + Gesture Control

Template de démarrage minimal pour créer une application 3D contrôlée par gestes.

## 📁 Structure

```
my-gesture-3d-app/
├── index.html
├── main.js
├── styles.css
└── README.md
```

## 🚀 Démarrage rapide

### 1. HTML
```html
<!DOCTYPE html>
<html>
<head>
    <script type="importmap">
    {
        "imports": {
            "three": "https://cdn.jsdelivr.net/npm/three@0.162.0/build/three.module.js"
        }
    }
    </script>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <video id="webcam" autoplay playsinline></video>
    <div id="info"></div>
    <script type="module" src="main.js"></script>
</body>
</html>
```

### 2. JavaScript (main.js)
```javascript
import * as THREE from 'three';
import { GestureDetector, Object3DController, GestureMapper, WebcamManager } 
  from '../../gesture-3d-controller/src/index.js';

// Setup Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Ton objet 3D
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshPhongMaterial({ color: 0x00ff00 })
);
scene.add(cube);
scene.add(new THREE.DirectionalLight(0xffffff, 1));
camera.position.z = 5;

// Gesture control
const detector = new GestureDetector();
const mapper = new GestureMapper();
const controller = new Object3DController(cube);
const webcam = new WebcamManager(document.getElementById('webcam'));

await detector.init();
await webcam.start();
detector.start();

function animate() {
    requestAnimationFrame(animate);
    
    const result = detector.detect(document.getElementById('webcam'));
    if (result.detected) {
        const gesture = mapper.mapGesture(result.landmarks);
        controller.updateFromGesture(gesture);
    } else {
        controller.returnToCenter();
    }
    
    renderer.render(scene, camera);
}
animate();
```

### 3. CSS (styles.css)
```css
body {
    margin: 0;
    overflow: hidden;
}

canvas {
    display: block;
}

#webcam {
    position: absolute;
    left: 10px;
    top: 10px;
    width: 160px;
    height: 120px;
    border: 2px solid white;
    border-radius: 8px;
    transform: rotateY(180deg);
}

#info {
    position: absolute;
    bottom: 20px;
    left: 20px;
    color: #0f0;
    background: rgba(0, 0, 0, 0.8);
    padding: 10px;
    border-radius: 4px;
    font-family: monospace;
}
```

---

## 🎯 Cas d'usage

- Galerie 3D interactive
- Jeu 3D contrôlé par gestes
- Visualisation de données 3D
- Modélisateur 3D
- Showcase de produits

---

## 📚 Ressources

- Gesture Controller: `../../gesture-3d-controller/README.md`
- Three.js Docs: https://threejs.org/docs/
- MediaPipe: https://ai.google.dev/edge/mediapipe/

---

**Modifie et adapte selon tes besoins !** 🚀
