import React, { createContext, useState, useEffect, useCallback, useMemo, useContext } from 'react';
import { getLocalStream, stopStream } from '../services/streamManager';
import { getAvailableDevices, onDeviceChange } from '../services/deviceManager';

const MediaContext = createContext(null);

export const MediaProvider = ({ children }) => {
    const [localStream, setLocalStream] = useState(null);
    const [isStreaming, setIsStreaming] = useState(false);
    const [mediaError, setMediaError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [cameraEnabled, setCameraEnabled] = useState(true);
    const [microphoneEnabled, setMicrophoneEnabled] = useState(true);

    const [availableDevices, setAvailableDevices] = useState({ videoInputs: [], audioInputs: [], audioOutputs: [] });
    const [selectedDevices, setSelectedDevices] = useState({ video: undefined, audio: undefined });

    const refreshDevices = useCallback(async () => {
        try {
            const devices = await getAvailableDevices();
            setAvailableDevices(devices);
            setSelectedDevices(prev => ({
                video: prev.video || (devices.videoInputs.length > 0 ? devices.videoInputs[0].deviceId : undefined),
                audio: prev.audio || (devices.audioInputs.length > 0 ? devices.audioInputs[0].deviceId : undefined),
            }));
        } catch (error) {
            console.error('[Media] Failed to enumerate devices:', error);
        }
    }, []);

    useEffect(() => {
        refreshDevices();
        const cleanup = onDeviceChange(refreshDevices);
        return cleanup;
    }, [refreshDevices]);

    const stopMedia = useCallback(() => {
        if (localStream) {
            if (process.env.NODE_ENV === 'development') {
                console.log('[Media] Stopping local stream.');
            }
            stopStream(localStream);
            setLocalStream(null);
            setIsStreaming(false);
        }
    }, [localStream]);

    const startMedia = useCallback(async (options = {}) => {
        stopMedia(); // Ensure any previous stream is stopped
        setIsLoading(true);
        setMediaError(null);

        const videoDeviceId = options.videoDeviceId || selectedDevices.video;
        const audioDeviceId = options.audioDeviceId || selectedDevices.audio;

        try {
            const stream = await getLocalStream({ videoDeviceId, audioDeviceId });
            setLocalStream(stream);
            setIsStreaming(true);

            // Apply initial enabled/disabled state
            stream.getVideoTracks().forEach(track => track.enabled = cameraEnabled);
            stream.getAudioTracks().forEach(track => track.enabled = microphoneEnabled);

        } catch (error) {
            setMediaError(error);
            setIsStreaming(false);
        } finally {
            setIsLoading(false);
        }
    }, [stopMedia, selectedDevices, cameraEnabled, microphoneEnabled]);

    const restartMedia = useCallback(async () => {
        if (isStreaming) {
            await startMedia();
        }
    }, [isStreaming, startMedia]);

    const toggleCamera = useCallback(() => {
        if (localStream) {
            const newCameraState = !cameraEnabled;
            localStream.getVideoTracks().forEach(track => {
                track.enabled = newCameraState;
            });
            setCameraEnabled(newCameraState);
        }
    }, [localStream, cameraEnabled]);

    const toggleMicrophone = useCallback(() => {
        if (localStream) {
            const newMicState = !microphoneEnabled;
            localStream.getAudioTracks().forEach(track => {
                track.enabled = newMicState;
            });
            setMicrophoneEnabled(newMicState);
        }
    }, [localStream, microphoneEnabled]);

    const switchCamera = useCallback(async (deviceId) => {
        if (deviceId !== selectedDevices.video) {
            setSelectedDevices(prev => ({ ...prev, video: deviceId }));
            if (isStreaming) {
                await startMedia({ videoDeviceId: deviceId });
            }
        }
    }, [selectedDevices.video, isStreaming, startMedia]);

    const switchMicrophone = useCallback(async (deviceId) => {
        if (deviceId !== selectedDevices.audio) {
            setSelectedDevices(prev => ({ ...prev, audio: deviceId }));
            if (isStreaming) {
                await startMedia({ audioDeviceId: deviceId });
            }
        }
    }, [selectedDevices.audio, isStreaming, startMedia]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            stopMedia();
        };
    }, [stopMedia]);

    const value = useMemo(() => ({
        // State
        localStream,
        isStreaming,
        isLoading,
        mediaError,
        cameraEnabled,
        microphoneEnabled,
        availableDevices,
        selectedDevices,

        // Actions
        startMedia,
        stopMedia,
        restartMedia,
        toggleCamera,
        toggleMicrophone,
        switchCamera,
        switchMicrophone,
        refreshDevices,
    }), [
        localStream,
        isStreaming,
        isLoading,
        mediaError,
        cameraEnabled,
        microphoneEnabled,
        availableDevices,
        selectedDevices,
        startMedia,
        stopMedia,
        restartMedia,
        toggleCamera,
        toggleMicrophone,
        switchCamera,
        switchMicrophone,
        refreshDevices,
    ]);

    return <MediaContext.Provider value={value}>{children}</MediaContext.Provider>;
};

export const useMedia = () => {
    const context = useContext(MediaContext);
    if (!context) {
        throw new Error('useMedia must be used within a MediaProvider');
    }
    return context;
};