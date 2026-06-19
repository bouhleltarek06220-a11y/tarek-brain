/**
 * Object3DController - Controls 3D object position and rotation
 * Applies smooth interpolation (lerp) for natural movement
 */

export class Object3DController {
  constructor(mesh, config = {}) {
    this.mesh = mesh;
    this.smoothing = config.smoothing || 0.1;
    this.returnSmoothness = config.returnSmoothness || 0.05;
    this.propellers = [];
    this.propellerSpeed = config.propellerSpeed || 0.4;
    
    // Target values
    this.targetPos = { x: 0, y: 0, z: 0 };
    this.targetRot = { x: 0, y: 0, z: 0 };
  }

  /**
   * Update object from gesture data
   * @param {Object} gestureData - Gesture information
   */
  updateFromGesture(gestureData) {
    this.targetPos = gestureData.position;
    this.targetRot = gestureData.rotation;
    this._applySmoothedTransform(this.smoothing);
  }

  /**
   * Return object to center position
   */
  returnToCenter() {
    this.targetPos = { x: 0, y: 0, z: 0 };
    this.targetRot = { x: 0, y: 0, z: 0 };
    this._applySmoothedTransform(this.returnSmoothness);
  }

  /**
   * Rotate propellers (for drones)
   */
  rotatePropellers() {
    this.propellers.forEach(prop => {
      prop.rotation.y += this.propellerSpeed;
    });
  }

  /**
   * Set propeller meshes to rotate
   * @param {Array} propellerMeshes - Array of Three.js mesh objects
   */
  setPropellers(propellerMeshes) {
    this.propellers = propellerMeshes;
  }

  /**
   * Detect propellers from model (automatic)
   * Finds meshes in top 15% of model height
   * @param {THREE.Object3D} model - 3D model to scan
   */
  detectPropellersFromModel(model) {
    const THREE = await this._getThreeModule();
    const box = new THREE.Box3().setFromObject(model);
    const maxY = box.max.y;
    const minY = box.min.y;
    const height = maxY - minY;
    const threshold = 0.15;

    this.propellers = [];
    model.traverse((child) => {
      if (child.isMesh) {
        const childPos = new THREE.Vector3();
        child.getWorldPosition(childPos);
        if (childPos.y > maxY - (height * threshold)) {
          this.propellers.push(child);
        }
      }
    });
  }

  /**
   * Apply smoothed transformation to mesh
   * @private
   */
  _applySmoothedTransform(factor) {
    // Smooth position
    this.mesh.position.x += (this.targetPos.x - this.mesh.position.x) * factor;
    this.mesh.position.y += (this.targetPos.y - this.mesh.position.y) * factor;
    this.mesh.position.z += (this.targetPos.z - this.mesh.position.z) * factor;

    // Smooth rotation
    this.mesh.rotation.x += (this.targetRot.x - this.mesh.rotation.x) * factor;
    this.mesh.rotation.y += (this.targetRot.y - this.mesh.rotation.y) * factor;
    this.mesh.rotation.z += (this.targetRot.z - this.mesh.rotation.z) * factor;
  }
}
