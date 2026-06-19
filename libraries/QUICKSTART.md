# 🎯 Comment utiliser cette bibliothèque

## Pour les débutants

### Étape 1 : Explore la structure
```bash
cd libraries/
ls -la
# Tu verras:
# - gesture-3d-controller/  (Module complet)
# - external-projects/      (Projets intéressants)
# - templates/              (Démarrages rapides)
# - INDEX.md                (Catalogue)
```

### Étape 2 : Essaie un exemple
```bash
cd gesture-3d-controller/examples/
# Ouvre cube-demo.html ou drone-demo.html avec Live Server
```

### Étape 3 : Crée ton projet
```bash
cd templates/vanilla-js-3d/
# Copie et modifie main.js
```

---

## Pour les développeurs

### Ajouter du code à ta biblio

#### Cas 1: Tu trouves un snippet intéressant
```bash
# Crée un dossier
mkdir libraries/snippets/3d-rendering/

# Ajoute le code
echo "// Code ici" > libraries/snippets/3d-rendering/optimization.js

# Documente-le
echo "# Optimization\n\nSource: URL\nUsage: ..." > libraries/snippets/3d-rendering/README.md

# Commit
git add libraries/snippets/
git commit -m "add: 3d rendering optimization snippet"
```

#### Cas 2: Tu trouves un projet GitHub intéressant
```bash
# Crée un README de référence
mkdir libraries/external-projects/nom-du-projet/
echo "# Nom du projet\n\nAuteur: ...\nSource: URL\nStars: ..." > libraries/external-projects/nom-du-projet/README.md

# Commit
git add libraries/external-projects/
git commit -m "catalog: add nom-du-projet reference"
```

#### Cas 3: Tu crées un nouveau module
```bash
# Crée la structure
mkdir -p libraries/modules/mon-module/{src,examples}

# Ajoute les fichiers (voir gesture-3d-controller comme exemple)

# Update l'INDEX
vim libraries/INDEX.md

# Commit
git add libraries/
git commit -m "feat: add mon-module"
```

---

## 🔍 Trouver du code

### GitHub Search
```
# Main: https://github.com/search/advanced

# Requêtes utiles:
language:JavaScript stars:>100 three.js
language:JavaScript mediapipe hand-tracking
language:JavaScript webgl 3d
```

### Keywords à surveiller
- `three.js`
- `gesture-recognition`
- `hand-tracking`
- `mediapipe`
- `webgl`
- `canvas`
- `3d`

---

## 📋 Checklist : Ajouter du code

```
Après avoir trouvé quelque chose:

☐ Décider la catégorie (snippet/projet/module/template)
☐ Créer le dossier approprié
☐ Copier/adapter le code
☐ Écrire un README avec:
  ☐ Source (URL GitHub + auteur)
  ☐ Description courte
  ☐ Cas d'usage
  ☐ Technos utilisées
  ☐ Exemple d'utilisation
☐ Mettre à jour INDEX.md
☐ Git commit avec message clair
☐ Git push
```

---

## 🎓 Exemples concrets

### Exemple 1: Ajouter un snippet de shader
```bash
# 1. Créer la structure
mkdir libraries/snippets/shaders/

# 2. Ajouter le code
cat > libraries/snippets/shaders/glitch.glsl << 'EOF'
// Shader glitch effect
uniform sampler2D texture;
uniform float time;

void main() {
    // ...
}
EOF

# 3. Documenter
cat > libraries/snippets/shaders/README.md << 'EOF'
# Glitch Shader

**Source:** https://github.com/.../glitch
**Auteur:** Nom
**Usage:** Effet glitch sur texture

```javascript
// Comment l'utiliser
const shader = await fetch('./glitch.glsl').then(r => r.text());
const material = new THREE.ShaderMaterial({
    fragmentShader: shader
});
```
EOF

# 4. Commit
git add libraries/snippets/shaders/
git commit -m "add: glitch shader snippet"
```

### Exemple 2: Cataloguer un nouveau projet
```bash
# 1. Créer dossier
mkdir libraries/external-projects/super-3d-project/

# 2. Ajouter README
cat > libraries/external-projects/super-3d-project/README.md << 'EOF'
# Super 3D Project

**Auteur:** Developer Name  
**Source:** https://github.com/user/super-3d  
**Stars:** ⭐⭐⭐ 500  
**Licence:** MIT

## Description
Projet 3D cool pour faire X, Y, Z

## Techniques intéressantes
- Optimisation de performance
- Shaders personnalisés
- Animation complexes

## Ressources
- Demo: https://...
- Repo: https://...
EOF

# 3. Commit
git add libraries/external-projects/
git commit -m "catalog: add super-3d-project reference"
```

---

## 🔗 Intégration dans tes projets

### Methode 1: Import direct
```javascript
import { GestureDetector } from '../../../libraries/gesture-3d-controller/src/index.js';
```

### Méthode 2: Copy-paste
```bash
cp -r libraries/templates/vanilla-js-3d/ my-new-project/
cd my-new-project/
# Modifie et développe
```

### Méthode 3: Git submodule (futur)
```bash
git submodule add https://github.com/mon-username/gesture-3d-controller.git libs/gesture
```

---

## 🚀 Workflow de développement

```
1. Cherche du code intéressant
   ↓
2. Ajoute à ta biblio (copie + README)
   ↓
3. Utilise dans un projet
   ↓
4. Améliore/adapte
   ↓
5. Extrait en module réutilisable (optionnel)
   ↓
6. Partage avec la communauté (optionnel)
```

---

## 📞 Besoin d'aide?

- Voir `libraries/README.md` - Vue d'ensemble
- Voir `libraries/INDEX.md` - Catalogue complet
- Voir des exemples dans `libraries/gesture-3d-controller/`

---

**Bonne chance ! 🚀**
