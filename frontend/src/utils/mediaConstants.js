/**
 * Default media constraints for getUserMedia.
 */
export const DEFAULT_VIDEO_CONSTRAINTS = {
    width: { ideal: 1280 },
    height: { ideal: 720 },
    frameRate: { ideal: 30 },
};

export const DEFAULT_AUDIO_CONSTRAINTS = {
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: true,
};