import { useMedia } from '../context/MediaContext';

/**
 * A hook to access device lists and switching functionality.
 * Ideal for device selector components.
 */
export const useDevices = () => {
    const { availableDevices, selectedDevices, switchCamera, switchMicrophone, refreshDevices } = useMedia();
    return { availableDevices, selectedDevices, switchCamera, switchMicrophone, refreshDevices };
};