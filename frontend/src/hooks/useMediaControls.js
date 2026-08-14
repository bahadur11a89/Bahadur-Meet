import { useMedia } from '../context/MediaContext';

/**
 * A hook to access media control state and functions.
 * Ideal for UI components like toggle buttons.
 */
export const useMediaControls = () => {
    const { cameraEnabled, microphoneEnabled, toggleCamera, toggleMicrophone } = useMedia();
    return { cameraEnabled, microphoneEnabled, toggleCamera, toggleMicrophone };
};