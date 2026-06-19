# 📖 Guide Complet - Gesture 3D Controller

## Table des matières
1. [Installation](#installation)
2. [Démarrage rapide](#démarrage-rapide)
3. [Concepts clés](#concepts-clés)
4. [Étape par étape](#étape-par-étape)
5. [Personnalisation](#personnalisation)
6. [Troubleshooting](#troubleshooting)

---

## Installation

### Option 1 : Import direct (recommandé pour commencer)

```javascript
import { GestureDetector, Object3DController, GestureMapper, WebcamManager } 
  from './libraries/gesture-3d-controller/src/index.js';
```

### Option 2 : Copier les fichiers
```bash
cp -r libraries/gesture-3d-controller ./mon-projet/
```

### Option 3 : NPM (futur)
```bash
npm install gesture-3d-controller
```

---

## Démarrage rapide

### 5 minutes pour faire bouger un objet 3D

**1. HTML**
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
</head>
<body>
    <video id="webcam" autoplay playsinline></video>
    <canvas id="canvas"></canvas>
    <script type="module" src="app.js"></script>
</body>
</html>
```

**2. JavaScript (app.js)**
```javascript
import * as THREE from 'three';
import { GestureDetector, Object3DController, GestureMapper, WebcamManager } 
  from './gesture-3d-controller/src/index.js';

// Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Objet 3D
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshPhongMaterial({ color: 0x00ff00 })
);
scene.add(cube);
scene.add(new THREE.DirectionalLight(0xffffff, 1));
scene.add(new THREE.AmbientLight(0xffffff, 0.5));
camera.position.z = 5;

// Gesture Control
const detector = new GestureDetector();
const mapper = new GestureMapper();
const controller = new Object3DController(cube);
const webcam = new WebcamManager(document.getElementById('webcam'));

// Go!
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

Voilà ! 🎉

---

## Concepts clés

### 🖐️ Comment fonctionne la détection

```
1. Caméra capture ta main en vidéo
   ↓
2. MediaPipe détecte 21 "points" sur ta main
   ↓
3. GestureMapper convertit ces points en position/rotation
   ↓
4. Object3DController applique ça à l'objet 3D
   ↓
5. Three.js l'affiche à l'écran
```

### 📍 Les 21 points de la main

```
      5 (index base)          17 (pinky base)
      |                       |
      8 (index tip)           20 (pinky tip)

   4 (thumb tip)           12 (middle tip)  16 (ring tip)
   |                       |                |  
   1 (thumb)               9 (palm CENTER) ← Point clé!
   |                       |
   0 (WRIST) ←────────────┘
```

**Points importants:**
- **0** = Poignet (distance pour Z)
- **9** = Centre paume (X/Y)
- **5, 17** = Tilt de la main (rotation Y)

### 🎮 Smoothing et Lerp

Le mouvement n'est pas direct, il est **interpolé** pour fluidité :

```javascript
// Sans smoothing (direct)
position.x = targetX;  // Saccadé

// Avec smoothing (lerp)
position.x += (targetX - position.x) * 0.1;  // Fluide
```

Valeurs recommandées:
- `smoothing: 0.1` = Fluide et réactif
- `smoothing: 0.05` = Très fluide, moins réactif
- `smoothing: 0.2` = Très réactif, moins fluide

---

## Étape par étape

### Étape 1 : Initialiser les contrôleurs

```javascript
// Détection des mains
const detector = new GestureDetector({
    numHands: 1,        // 1 ou 2
    delegate: 'GPU',    // Meilleure perf
});

// Mapping: gestes → position/rotation
const mapper = new GestureMapper({
    positionScaleX: 12,    // Plus = plus sensible
    positionScaleY: 10,
    positionScaleZ: 6,
    rotationScale: 20,
});

// Contrôle de l'objet 3D
const controller = new Object3DController(monMesh, {
    smoothing: 0.1,
    returnSmoothness: 0.05,
});

// Gestion de la caméra
const webcam = new WebcamManager(videoElement);
```

### Étape 2 : Initialiser

```javascript
// IMPORTANT: Attendre l'initialisation
await detector.init();      // Charge MediaPipe
await webcam.start();       // Demande caméra
detector.start();           // Active détection
```

### Étape 3 : Boucle d'animation

```javascript
function animate() {
    requestAnimationFrame(animate);
    
    // 1. Détecter la main dans la caméra
    const result = detector.detect(videoElement);
    
    // 2. Si main détectée
    if (result.detected) {
        // Convertir landmarks → position/rotation
        const gestureData = mapper.mapGesture(result.landmarks);
        
        // Appliquer au mesh
        controller.updateFromGesture(gestureData);
        
        // Si c'est un drone
        controller.rotatePropellers();
    } else {
        // Retour au centre
        controller.returnToCenter();
    }
    
    // 3. Rendu Three.js
    renderer.render(scene, camera);
}

animate();
```

### Étape 4 : Charger un modèle 3D (optionnel)

```javascript
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
loader.load('mon-drone.gltf', (gltf) => {
    const drone = gltf.scene;
    scene.add(drone);
    
    // Créer le contrôleur pour ce drone
    const controller = new Object3DController(drone);
    
    // Détecter les hélices automatiquement
    controller.detectPropellersFromModel(drone);
});
```

---

## Personnalisation

### Ajuster la sensibilité

```javascript
const mapper = new GestureMapper({
    positionScaleX: 20,  // ↑ Plus sensible en X
    positionScaleY: 8,   // ↓ Moins sensible en Y
    positionScaleZ: 10,  // ↑ Plus sensible en Z
    rotationScale: 30,   // ↑ Plus sensible en rotation
});
```

### Activer geste custom

```javascript
const result = detector.detect(video);

if (result.detected) {
    const gestureType = mapper.detectGestureType(result.landmarks);
    
    if (gestureType.type === 'fist') {
        console.log('✊ Poing fermé!');
        // Action
    }
    if (gestureType.type === 'open_hand') {
        console.log('✋ Main ouverte!');
        // Action
    }
}
```

### Ajouter sons/retours

```javascript
if (result.detected) {
    // Son de détection
    new Audio('./beep.mp3').play();
    
    // Vibration
    navigator.vibrate(100);
}
```

---

## Troubleshooting

### ❌ "Webcam access denied"
**Solution:** Vérifier les permissions navigateur
- Chrome: Paramètres → Confidentialité → Caméra → Autoriser
- Firefox: about:preferences → Confidentialité → Caméra → Autoriser

### ❌ "Modèle ne charge pas"
**Solution:** Vérifier l'URL et le format
```javascript
// ✅ Bon
loader.load('https://example.com/model.gltf');
loader.load('/models/drone.glb');

// ❌ Mauvais
loader.load('file:///C:/models/drone.gltf');  // Local file
```

### ❌ "Performance lente"
**Solution:**
1. Utiliser GPU: `delegate: 'GPU'`
2. Réduire la résolution de la caméra
3. Augmenter le smoothing

### ❌ "Main pas détectée"
**Solution:**
- Bonne luminosité
- Main visible à la caméra
- Pas trop près/loin
- Éviter l'éblouissement

---

## Exemples complets

### Déplacer un cube
Voir: `examples/cube-demo.html`

### Contrôler un drone
Voir: `examples/drone-demo.html`

---

## Ressources

- [MediaPipe Hand Documentation](https://ai.google.dev/edge/mediapipe/solutions/vision/hand_landmarker)
- [Three.js Documentation](https://threejs.org/docs/)
- [GLTF Format Spec](https://www.khronos.org/gltf/)

---

## Questions?

Ver la section GitHub Issues ou README.md
