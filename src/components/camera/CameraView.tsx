'use client';
import { RefObject } from 'react';
import { useCamera } from '@/hooks/useCamera';
import { FlipHorizontal } from 'lucide-react';

interface CameraViewProps {
  videoRef: RefObject<HTMLVideoElement | null>;
}

export function CameraView({ videoRef }: CameraViewProps) {
  const { facingMode, isInitializing, toggleFacingMode } = useCamera(videoRef);

  return (
    <div className="absolute inset-0 bg-black z-0">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={`w-full h-full object-cover transition-opacity duration-500 pointer-events-none ${isInitializing ? 'opacity-0' : 'opacity-100'} ${facingMode === 'user' ? '-scale-x-100' : ''}`}
      />
      {/* Front/Back Flip Button */}
      <button 
        onClick={toggleFacingMode}
        className="absolute top-6 right-6 p-3.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white z-20 active:scale-90 transition shadow-xl pointer-events-auto"
        aria-label="Toggle Camera Front/Back"
      >
        <FlipHorizontal className="w-5 h-5" />
      </button>
    </div>
  );
}
