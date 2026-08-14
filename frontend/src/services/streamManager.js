export const DEFAULT_VIDEO_CONSTRAINTS = {
    width: { ideal: 1280 },
    height: { ideal: 720 },
    frameRate: { max: 30 },
};

export const DEFAULT_AUDIO_CONSTRAINTS = {
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: true,
};

/**
 * Acquires a local media stream from the user's devices.
 * @param {{videoDeviceId?: string, audioDeviceId?: string}} options
 * @returns {Promise<MediaStream>} A promise that resolves with the MediaStream.
 */
export const getLocalStream = async ({ videoDeviceId, audioDeviceId } = {}) => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('getUserMedia() is not supported in this browser.');
    }

    const constraints = {
        video: {
            ...DEFAULT_VIDEO_CONSTRAINTS,
            ...(videoDeviceId && { deviceId: { exact: videoDeviceId } }),
        },
        audio: {
            ...DEFAULT_AUDIO_CONSTRAINTS,
            ...(audioDeviceId && { deviceId: { exact: audioDeviceId } }),
        },
    };

    if (process.env.NODE_ENV === 'development') {
        console.log('[Media] Requesting stream with constraints:', constraints);
    }

    try {
        return await navigator.mediaDevices.getUserMedia(constraints);
    } catch (error) {
        console.error('[Media] Error getting user media:', error.name, error.message);
        // Re-throw the error to be handled by the caller
        throw error;
    }
};

/**
 * Stops all tracks on a given MediaStream, effectively releasing the devices.
 * @param {MediaStream | null} stream The stream to stop.
 */
export const stopStream = (stream) => {
    if (stream) {
        stream.getTracks().forEach(track => {
            if (track.readyState === 'live') {
                track.stop();
            }
        });
    }
};