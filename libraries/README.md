# 📚 Bibliothèque de Code Réutilisable

Catalogue centralisé de tous tes modules, snippets et projets 3D réutilisables.

## 📁 Structure

### 1. 🔧 **Modules Réutilisables** (`modules/`)
Des modules complets, prêts à l'emploi dans n'importe quel projet.

- **gesture-3d-controller/** - Détection de gestes + contrôle 3D
  - ✅ Utilisable partout
  - ✅ Déjà documenté
  - Status: **Production ready**

### 2. 📌 **Code Snippets** (`snippets/`)
Des bouts de code utiles, thématisés par domaine.

- `3d-rendering/` - Optimisations Three.js
- `hand-tracking/` - Techniques avancées de hand tracking
- `interactions/` - Contrôles et interactions 3D
- `performance/` - Tips de performance

### 3. 🔗 **Projets Externes** (`external-projects/`)
Des projets GitHub intéressants documentés et référencés.

- `POC_drone-3d-gesture/` - Kelly Clovis - Drone pilotable par gestes
- `dragonir-3d-collection/` - Collection 3D complète (2.8k⭐)
- Plus à venir...

### 4. 🎯 **Templates** (`templates/`)
Templates de démarrage pour différents frameworks.

- `vanilla-js-3d/` - Template vanilla JS pur
- `react-3d-hook/` - Hook React pour contrôle 3D
- `vue-3d-component/` - Component Vue réutilisable

---

## 🚀 Comment utiliser

### Importer un module
```javascript
import { GestureDetector, Object3DController } 
  from '../modules/gesture-3d-controller/src/index.js';
```

### Utiliser un snippet
```javascript
// Voir snippets/3d-rendering/optimizations.js
import { enablePostProcessing } from '../snippets/3d-rendering/optimizations.js';
```

### Cloner un projet externe
```bash
cd external-projects/
git clone https://github.com/dragonir/3d.git dragonir-3d-collection
```

---

## 📊 Statistiques

| Catégorie | Nombre | Status |
|-----------|--------|--------|
| Modules | 1 | ✅ Production |
| Snippets | À ajouter | 🔄 In Progress |
| Projets Ext. | 2 | 📌 Catalogued |
| Templates | À créer | 📋 Todo |

---

## 🔍 Comment trouver du code à ajouter

### Sur GitHub:
1. Cherche: `language:JavaScript stars:>100 topic:threejs`
2. Cherche: `hand gesture detection`
3. Cherche: `3D webcam interaction`
4. Topics: `three.js`, `mediapipe`, `webgl`, `3d`

### Sites:
- GitHub Trending: https://github.com/trending
- Awesome Lists: https://github.com/topics/awesome
- Codepen: https://codepen.io/search?q=three.js

---

## 📝 Pour ajouter du code

1. Crée un dossier dans la catégorie appropriée
2. Ajoute un `README.md` avec:
   - Source (URL GitHub)
   - Description
   - Use cases
   - Licence
   - Auteur

3. Commit:
   ```bash
   git add libraries/...
   git commit -m "add: [nom du projet/snippet]"
   ```

---

## 🎯 Prochaines étapes

- [ ] Ajouter POC_drone de Kelly Clovis
- [ ] Cataloguer dragonir/3d
- [ ] Créer snippets 3D
- [ ] Créer templates React/Vue
- [ ] Ajouter plus de projets

---

**Maintenant tu as une vraie "compétence réutilisable" enregistrée !** 🚀
