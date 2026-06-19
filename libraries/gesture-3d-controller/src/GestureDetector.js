/**
 * GestureDetector - Detects and tracks hand gestures using MediaPipe
 * Provides real-time hand landmark detection from video stream
 */

const MEDIAPIPE_VERSION = '@0.10.3';
const MEDIAPIPE_CDN = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision';

export class GestureDetector {
  constructor(config = {}) {
    this.handLandmarker = null;
    this.isRunning = false;
    this.landmarks = null;
    this.config = {
      numHands: config.numHands || 1,
      delegate: config.delegate || 'GPU',
      videoMode: config.videoMode || 'VIDEO',
    };
  }

  /**
   * Initialize MediaPipe Hand Landmarker
   * Must be called before detecting gestures
   */
  async init() {
    try {
      const vision = await this._loadMediaPipe();
      this.handLandmarker = await this._createHandLandmarker(vision);
      console.log('✅ GestureDetector initialized');
      return true;
    } catch (error) {
      console.error('❌ Failed to initialize GestureDetector:', error);
      throw error;
    }
  }

  /**
   * Detect hand landmarks from video frame
   * @param {HTMLVideoElement} videoElement - Video stream to analyze
   * @returns {Object} Detection results with landmarks
   */
  detect(videoElement) {
    if (!this.handLandmarker || !this.isRunning) {
      return { landmarks: [], detected: false };
    }

    try {
      const startTimeMs = performance.now();
      const results = this.handLandmarker.detectForVideo(videoElement, startTimeMs);
      
      if (results.landmarks.length > 0) {
        this.landmarks = results.landmarks[0];
        return {
          landmarks: this.landmarks,
          detected: true,
          handedness: results.handedness[0] || 'Right',
        };
      }
      
      this.landmarks = null;
      return { landmarks: [], detected: false };
    } catch (error) {
      console.error('❌ Detection error:', error);
      return { landmarks: [], detected: false };
    }
  }

  /**
   * Start detection loop
   */
  start() {
    this.isRunning = true;
  }

  /**
   * Stop detection loop
   */
  stop() {
    this.isRunning = false;
  }

  /**
   * Load MediaPipe library
   * @private
   */
  async _loadMediaPipe() {
    const { FilesetResolver } = await import(
      `${MEDIAPIPE_CDN}${MEDIAPIPE_VERSION}/vision_bundle.mjs`
    );
    
    return FilesetResolver.forVisionTasks(
      `${MEDIAPIPE_CDN}${MEDIAPIPE_VERSION}/wasm`
    );
  }

  /**
   * Create and configure HandLandmarker
   * @private
   */
  async _createHandLandmarker(vision) {
    const { HandLandmarker } = await import(
      `${MEDIAPIPE_CDN}${MEDIAPIPE_VERSION}/vision_bundle.mjs`
    );
    
    return HandLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
        delegate: this.config.delegate,
      },
      runningMode: this.config.videoMode,
      numHands: this.config.numHands,
    });
  }
}
