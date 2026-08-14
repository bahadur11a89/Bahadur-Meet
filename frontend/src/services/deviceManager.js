/**
 * Enumerates all available media input and output devices.
 * @returns {Promise<{videoInputs: MediaDeviceInfo[], audioInputs: MediaDeviceInfo[], audioOutputs: MediaDeviceInfo[]}>}
 */
export const getAvailableDevices = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        throw new Error('enumerateDevices() not supported.');
    }

    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoInputs = devices.filter(device => device.kind === 'videoinput');
    const audioInputs = devices.filter(device => device.kind === 'audioinput');
    const audioOutputs = devices.filter(device => device.kind === 'audiooutput');

    return { videoInputs, audioInputs, audioOutputs };
};

/**
 * Sets up a listener for device changes (e.g., plugging in a new webcam).
 * @param {Function} callback - The function to call when devices change.
 * @returns {Function} A cleanup function to remove the event listener.
 */
export const onDeviceChange = (callback) => {
    if (navigator.mediaDevices && navigator.mediaDevices.ondevicechange) {
        navigator.mediaDevices.addEventListener('devicechange', callback);
        return () => navigator.mediaDevices.removeEventListener('devicechange', callback);
    }
    // Return a no-op function if the API is not supported
    return () => {};
};

/**
 * Attempts to set the audio output device for a given HTMLMediaElement.
 * Note: This is only supported in some browsers.
 * @param {HTMLMediaElement} element - The video or audio element.
 * @param {string} deviceId - The ID of the audio output device.
 */
export const setAudioOutput = async (element, deviceId) => {
    if (typeof element.setSinkId === 'function') {
        try {
            await element.setSinkId(deviceId);
        } catch (error) {
            console.error('Failed to set audio output device:', error);
        }
    }
};