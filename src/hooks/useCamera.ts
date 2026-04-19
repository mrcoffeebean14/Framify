import { useState, useEffect, RefObject, useCallback } from 'react';

type FacingMode = 'user' | 'environment';

export function useCamera(videoRef: RefObject<HTMLVideoElement | null>) {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [facingMode, setFacingMode] = useState<FacingMode>('environment');
  const [isInitializing, setIsInitializing] = useState(true);

  const startCamera = useCallback(async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError(new Error('Browser does not support getUserMedia'));
      setIsInitializing(false);
      return;
    }

    setIsInitializing(true);
    setError(null);

    // Stop existing stream tracks before requesting a new one
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        },
        audio: false,
      });

      setStream((prevStream) => {
        // Race condition checker if user flipped again
        if (prevStream) {
            prevStream.getTracks().forEach((track) => track.stop());
        }
        return mediaStream;
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        // The load logic is often handled by onLoadedMetadata in the `<video>` element, 
        // but we can set it here conceptually.
      }
    } catch (err: any) {
      console.error('Camera access error:', err);
      setError(err);
    } finally {
      setIsInitializing(false);
    }
  }, [facingMode, videoRef]); // We exclude stream to avoid infinite loops

  useEffect(() => {
    startCamera();
    
    return () => {
      // Attempt cleanup when the component using the hook unmounts
      setStream((prev) => {
        if (prev) {
          prev.getTracks().forEach((t) => t.stop());
        }
        return null;
      });
    };
  }, [startCamera]);

  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
  };

  return {
    stream,
    error,
    facingMode,
    isInitializing,
    toggleFacingMode,
    retryCamera: startCamera
  };
}
