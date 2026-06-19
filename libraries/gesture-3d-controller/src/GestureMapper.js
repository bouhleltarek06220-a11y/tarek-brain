/**
 * GestureMapper - Converts hand landmarks to 3D object control values
 * Handles position, rotation, and scale calculations from gesture data
 */

export class GestureMapper {
  constructor(config = {}) {
    // Position mapping
    this.positionScaleX = config.positionScaleX || 12;
    this.positionScaleY = config.positionScaleY || 10;
    this.positionScaleZ = config.positionScaleZ || 6;
    
    // Position limits
    this.posLimitZ = { min: config.posLimitZMin || -5, max: config.posLimitZMax || 2 };
    
    // Rotation mapping
    this.rotationScale = config.rotationScale || 20;
    this.rotationThreshold = config.rotationThreshold || 0.6;
  }

  /**
   * Map hand landmarks to 3D position and rotation
   * @param {Array} landmarks - MediaPipe hand landmarks (21 points)
   * @returns {Object} Position and rotation values
   */
  mapGesture(landmarks) {
    if (!landmarks || landmarks.length === 0) {
      return {
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        palmSize: 0,
      };
    }

    // Extract key points
    // 9 = palm center, 0 = wrist, 5 = index base, 17 = pinky base, 12 = middle tip
    const palmCenter = landmarks[9];
    const wrist = landmarks[0];
    const indexBase = landmarks[5];
    const pinkyBase = landmarks[17];

    // Calculate position (X, Y from palm center)
    const posX = (0.5 - palmCenter.x) * this.positionScaleX;
    const posY = (0.5 - palmCenter.y) * this.positionScaleY;

    // Calculate palm size for Z depth
    const palmSize = this._calculatePalmSize(wrist, landmarks[12]);
    let posZ = (palmSize - 0.25) * this.positionScaleZ;
    posZ = Math.max(this.posLimitZ.min, Math.min(this.posLimitZ.max, posZ));

    // Calculate rotation (yaw from hand tilt)
    const yawDiff = (indexBase.z - pinkyBase.z) * this.rotationScale;
    const rotY = Math.abs(yawDiff) < this.rotationThreshold ? 0 : yawDiff;

    return {
      position: { x: posX, y: posY, z: posZ },
      rotation: { x: 0, y: rotY, z: 0 },
      palmSize: palmSize,
      raw: { palmCenter, wrist },
    };
  }

  /**
   * Calculate palm size from key landmarks
   * @private
   */
  _calculatePalmSize(point1, point2) {
    const dx = point1.x - point2.x;
    const dy = point1.y - point2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * Detect specific hand gestures
   * @param {Array} landmarks - Hand landmarks
   * @returns {Object} Gesture detection results
   */
  detectGestureType(landmarks) {
    if (!landmarks || landmarks.length < 21) {
      return { type: 'unknown', confidence: 0 };
    }

    // Thumb tip (4) vs other fingers
    const thumbTip = landmarks[4];
    const indexTip = landmarks[8];
    const middleTip = landmarks[12];
    const ringTip = landmarks[16];
    const pinkyTip = landmarks[20];

    // Check for "peace" sign (index and middle up, others down)
    const fingerUpCount = [
      this._isFingerUp(indexTip, landmarks[6]),
      this._isFingerUp(middleTip, landmarks[10]),
      this._isFingerUp(ringTip, landmarks[14]),
      this._isFingerUp(pinkyTip, landmarks[18]),
    ].filter(Boolean).length;

    if (fingerUpCount >= 3) return { type: 'open_hand', confidence: 0.8 };
    if (fingerUpCount === 0) return { type: 'fist', confidence: 0.8 };
    if (fingerUpCount === 2) return { type: 'peace', confidence: 0.7 };

    return { type: 'pointing', confidence: 0.6 };
  }

  /**
   * Check if finger is extended
   * @private
   */
  _isFingerUp(tipPoint, knucklePoint) {
    return tipPoint.y < knucklePoint.y;
  }
}
