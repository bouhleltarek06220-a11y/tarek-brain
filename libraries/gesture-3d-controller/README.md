# 🖐️ Gesture 3D Controller

Une librairie réutilisable pour détecter les gestes de main et contrôler des objets 3D en temps réel. Alimentée par **MediaPipe** et **Three.js**.

## ✨ Fonctionnalités

✅ **Détection de main en temps réel** - Suivi de 21 points de repère  
✅ **Reconnaissance de gestes** - Identifie main ouverte, poing, signe de paix, etc.  
✅ **Contrôle d'objets 3D** - Position et rotation fluides depuis les gestes  
✅ **Animation d'hélices** - Support intégré pour les drones  
✅ **Zéro dépendances** - Utilise CDN, pas d'installation npm requise (optionnel)  
✅ **Modules réutilisables** - Utilise les composants individuels comme tu veux  

---

## 📦 Installation

### Option 1 : Import direct (Recommandé pour commencer)
```javascript
import { GestureDetector, Object3DController, GestureMapper, WebcamManager } 
  from './libraries/gesture-3d-controller/src/index.js';
```

### Option 2 : NPM (Pour les projets professionnels)
```bash
npm install gesture-3d-controller
```

---

## 🚀 Démarrage rapide

### 1️⃣ HTML
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
    <!-- 📹 Affichage de la caméra -->
    <video id="webcam" autoplay playsinline 
        style="position: absolute; left: 10px; top: 10px; width: 160px; height: 120px; 
                border: 2px solid white; transform: rotateY(180deg);"></video>
    
    <canvas id="canvas"></canvas>
    <script type="module" src="app.js"></script>
</body>
</html>
```

### 2️⃣ JavaScript (app.js)
```javascript
import * as THREE from 'three';
import { GestureDetector, Object3DController, GestureMapper, WebcamManager } 
  from './libraries/gesture-3d-controller/src/index.js';

// 1. Setup Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 2. Crée un objet 3D (cube exemple)
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 3. Initialise les contrôleurs
const gestureDetector = new GestureDetector({ numHands: 1 });
const gestureMapper = new GestureMapper();
const objectController = new Object3DController(cube);
const webcamManager = new WebcamManager(document.getElementById('webcam'));

// 4. Démarre
await gestureDetector.init();
await webcamManager.start();
gestureDetector.start();

// 5. Boucle d'animation
function animate() {
    requestAnimationFrame(animate);

    const video = document.getElementById('webcam');
    const detectionResult = gestureDetector.detect(video);

    if (detectionResult.detected) {
        const gestureData = gestureMapper.mapGesture(detectionResult.landmarks);
        objectController.updateFromGesture(gestureData);
    } else {
        objectController.returnToCenter();
    }

    renderer.render(scene, camera);
}

animate();
```

---

## 🎮 Contrôles avec ta main

| Mouvement de main | Résultat |
|---|---|
| 🖐️ **Main à droite/gauche** | Objet se déplace latéralement |
| 🖐️ **Main vers haut/bas** | Objet monte/descend |
| 🖐️ **Main proche** | Objet s'éloigne (profondeur Z) |
| 🖐️ **Main loin** | Objet se rapproche |
| 🖐️ **Tourner la main** | Objet pivote (axe Y) |
| ✋ **Main fermée** | Hélices tournent (pour drones) |
| 🚫 **Pas de main** | Objet revient au centre |

---

## 📚 API Complète

### **GestureDetector** - Détecte les mains
```javascript
const detector = new GestureDetector({
    numHands: 1,           // Nombre de mains à détecter
    delegate: 'GPU',       // 'GPU' ou 'CPU'
});

await detector.init();                           // Initialiser
detector.start();                                // Démarrer
const result = detector.detect(videoElement);   // Détecter
detector.stop();                                // Arrêter

// Résultat:
// result.detected       → true/false
// result.landmarks      → Array de 21 points
// result.handedness     → 'Left' ou 'Right'
```

### **GestureMapper** - Convertit landmarks en position/rotation
```javascript
const mapper = new GestureMapper({
    positionScaleX: 12,        // Sensibilité X
    positionScaleY: 10,        // Sensibilité Y
    positionScaleZ: 6,         // Sensibilité Z (profondeur)
    posLimitZMin: -5,          // Limite min Z
    posLimitZMax: 2,           // Limite max Z
    rotationScale: 20,         // Sensibilité rotation
});

const gestureData = mapper.mapGesture(landmarks);
// gestureData.position   → { x, y, z }
// gestureData.rotation   → { x, y, z }
// gestureData.palmSize   → 0-1

const gesture = mapper.detectGestureType(landmarks);
// gesture.type       → 'fist', 'open_hand', 'peace', 'pointing'
// gesture.confidence → 0-1
```

### **Object3DController** - Contrôle l'objet 3D
```javascript
const controller = new Object3DController(mesh, {
    smoothing: 0.1,          // Vitesse d'interpolation (0-1)
    returnSmoothness: 0.05,  // Vitesse de retour au centre
    propellerSpeed: 0.4      // Vitesse des hélices
});

controller.updateFromGesture(gestureData);  // Appliquer geste
controller.returnToCenter();                 // Retour au centre
controller.rotatePropellers();               // Tourner hélices

// Configuration des hélices:
controller.setPropellers([prop1, prop2, prop3]);
// OU détection automatique:
controller.detectPropellersFromModel(droneModel);
```

### **WebcamManager** - Gère la caméra
```javascript
const webcam = new WebcamManager(videoElement);

await webcam.start();   // Demander permission + démarrer
webcam.stop();          // Arrêter
webcam.isActive();      // true si en cours
```

---

## 🎯 Points de repère de la main (Landmarks)

MediaPipe fournit 21 points de repère :

```
0:   Poignet
1-4:   Pouce
5-8:   Index
9-12:  Majeur
13-16: Annulaire
17-20: Auriculaire
```

**Points clés pour le contrôle :**
- **9** : Centre de la paume (X/Y)
- **0** : Poignet (taille de la paume pour Z)
- **5, 17** : Inclinaison de la main (rotation)

---

## ⚙️ Conseils de performance

1. **Utilise GPU** pour meilleure performance
2. **Limite à 1 seule main** si nécessaire
3. **Ajuste les valeurs de smoothing** pour réactivité
4. **Utilise requestAnimationFrame** pour fluidité
5. **Stop la détection** quand pas utilisée

---

## 🌐 Navigateurs supportés

✅ Chrome/Chromium 85+  
✅ Firefox 90+  
✅ Safari 15+  
✅ Edge 85+  

⚠️ **HTTPS requis** ou localhost (pour accès caméra)

---

## 📄 Licence

MIT © Tarek Bouhlel

---

## 🙏 Crédits

- **MediaPipe** - Modèle de détection de main
- **Three.js** - Rendu 3D
- **POC Original** - Kelly Clovis (POC_drone-3d-gesture)

---

## 🔗 Ressources

- [MediaPipe Hand Landmarker](https://ai.google.dev/edge/mediapipe/solutions/vision/hand_landmarker)
- [Three.js Documentation](https://threejs.org/docs/)
- [Exemple Complet - Drone Demo](./examples/drone-demo.html)
- [Exemple Simple - Cube Demo](./examples/cube-demo.html)
