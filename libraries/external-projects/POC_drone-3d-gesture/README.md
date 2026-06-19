# 🐼 POC Drone 3D - Gesture Control

**Auteur:** Kelly Clovis  
**Source:** https://github.com/keldevca/POC_drone-3d-gesture  
**Licence:** MIT  
**Date d'ajout:** 2026-06-19

## 📝 Description

Une application web interactive qui permet de **piloter un modèle 3D de drone en temps réel** en utilisant les **gestes de la main** détectés via la webcam.

### Fonctionnalités
- ✅ Détection en temps réel des mains (MediaPipe)
- ✅ Contrôle drone 3D (Three.js)
- ✅ Position X/Y/Z basée sur les gestes
- ✅ Rotation (Yaw) basée sur l'inclinaison de la main
- ✅ Hélices tournantes automatiques
- ✅ Retour au centre quand pas de main

---

## 🎮 Contrôles

| Geste | Résultat |
|-------|----------|
| 🖐️ Main droite/gauche | Drone se déplace X |
| 🖐️ Main haut/bas | Drone se déplace Y |
| 🖐️ Main proche | Drone s'éloigne (Z) |
| 🖐️ Main loin | Drone se rapproche (Z) |
| 🖐️ Tourner la main | Drone tourne (Yaw) |
| ✋ Main fermer/ouvrir | Hélices tournent |

---

## 🛠️ Technologies

- **Three.js** v0.162 - Rendu 3D
- **MediaPipe Hand Landmarker** - Détection de main
- **OrbitControls** - Navigation manuelle
- **GLTF Loader** - Chargement modèles 3D

---

## 🚀 Utilisation

### Code original
```javascript
// Voir: main.js et index.html
```

### Intégration avec gesture-3d-controller
Ce POC a servi de base pour créer la librairie réutilisable.

```javascript
import { GestureDetector, Object3DController, GestureMapper } 
  from '../gesture-3d-controller/src/index.js';

// Même logique, mais réutilisable
const detector = new GestureDetector();
const controller = new Object3DController(drone);
const mapper = new GestureMapper();
```

---

## 📁 Fichiers

- `index.html` - Entrée HTML
- `main.js` - Logique principale (POC)
- `background.jpeg` - Image de fond
- `models/` - Modèle drone GLTF

---

## 📚 Apprentissages

Ce projet a permis de:
1. Comprendre la détection de gestes avec MediaPipe
2. Intégrer Three.js pour le rendu 3D
3. Créer une interaction temps réel caméra ↔ 3D
4. **Extraire en module réutilisable** (gesture-3d-controller)

---

## ✨ Améliorations possibles

- [ ] Support multi-mains
- [ ] Plus de gestes (pincement, pointage, etc.)
- [ ] Animations complexes
- [ ] Sauvegarde trajectoires
- [ ] Mode multiplayer (WebSocket)

---

## 🔗 Ressources

- Repo original: https://github.com/keldevca/POC_drone-3d-gesture
- MediaPipe: https://ai.google.dev/edge/mediapipe/
- Three.js: https://threejs.org/

---

**Status:** ✅ Archivé et réutilisé dans gesture-3d-controller
