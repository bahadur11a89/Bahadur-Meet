import { useState, useEffect, useRef } from 'react';

const useWebRTC = (roomId) => {
  const [peers, setPeers] = useState([]);
  const localVideoRef = useRef();

  useEffect(() => {
    // Placeholder for WebRTC connection logic
    console.log(`Initializing WebRTC for room: ${roomId}`);

    return () => {
      // Placeholder for cleanup logic
      console.log(`Cleaning up WebRTC for room: ${roomId}`);
    };
  }, [roomId]);

  return { peers, localVideoRef };
};

export default useWebRTC;