/**
 * WebcamManager - Handles webcam access and video stream management
 */

export class WebcamManager {
  constructor(videoElement, config = {}) {
    this.video = videoElement;
    this.isRunning = false;
    this.stream = null;
    this.constraints = config.constraints || { video: true };
  }

  /**
   * Request webcam access and start stream
   * @returns {Promise<boolean>} Success status
   */
  async start() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia(this.constraints);
      this.video.srcObject = this.stream;
      
      return new Promise((resolve) => {
        this.video.addEventListener('loadeddata', () => {
          this.isRunning = true;
          console.log('✅ Webcam started');
          resolve(true);
        }, { once: true });
      });
    } catch (error) {
      console.error('❌ Webcam access denied:', error);
      throw error;
    }
  }

  /**
   * Stop webcam stream
   */
  stop() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.isRunning = false;
      console.log('✅ Webcam stopped');
    }
  }

  /**
   * Check if webcam is running
   */
  isActive() {
    return this.isRunning;
  }
}
