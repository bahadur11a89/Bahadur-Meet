/**
 * Checks the current permission status for media devices.
 * @param {'camera' | 'microphone'} name - The name of the permission to check.
 * @returns {Promise<PermissionState>} The current state of the permission.
 */
export const checkMediaPermission = async (name) => {
    if (!navigator.permissions) {
        console.warn('Navigator.permissions API not supported.');
        return 'prompt'; // Assume prompt if API is not available
    }
    try {
        const result = await navigator.permissions.query({ name });
        return result.state; // 'granted', 'prompt', or 'denied'
    } catch (error) {
        // This can happen if the permission name is not supported (e.g., Safari)
        if (process.env.NODE_ENV === 'development') {
            console.warn(`Permission query for "${name}" failed:`, error.message);
        }
        // Fallback for browsers that don't support query for specific devices
        // We can't know for sure, so we assume 'prompt' to trigger getUserMedia
        return 'prompt';
    }
};