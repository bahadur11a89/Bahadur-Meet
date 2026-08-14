import { useMedia } from '../context/MediaContext';

/**
 * A hook to access the core local media stream and its state.
 * Ideal for components that need to display the video stream.
 */
export const useLocalMedia = () => {
    const { localStream, isStreaming, isLoading, mediaError, startMedia, stopMedia } = useMedia();
    return { localStream, isStreaming, isLoading, mediaError, startMedia, stopMedia };
};