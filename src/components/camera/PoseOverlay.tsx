'use client';

import Image from 'next/image';
import { Pose } from '@/lib/poses';

interface PoseOverlayProps {
  pose: Pose | null;
  opacity: number;
}

export function PoseOverlay({ pose, opacity }: PoseOverlayProps) {
  if (!pose) return null;

  return (
    <div 
      className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-10 transition-opacity duration-300"
      style={{ opacity: opacity / 100 }}
    >
      {/* 
        Silhouettes are typically 9:16 portrait. 
        We use an aspect-ratio locked container that fits within the viewport.
      */}
      <div className="relative w-full max-w-[500px] h-4/5 pointer-events-none mix-blend-screen">
        <Image 
          src={pose.src} 
          alt={pose.title} 
          fill 
          style={{ objectFit: 'contain' }}
          priority
          className="pointer-events-none opacity-90 drop-shadow-lg"
        />
      </div>
    </div>
  );
}
