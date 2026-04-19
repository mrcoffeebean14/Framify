'use client';
import Image from 'next/image';
import { Pose } from '@/lib/poses';

interface PoseCarouselProps {
  poses: Pose[];
  selectedId: string | null;
  onSelect: (pose: Pose) => void;
}

export function PoseCarousel({ poses, selectedId, onSelect }: PoseCarouselProps) {
  if (poses.length === 0) return <div className="text-white/50 text-sm px-6">No poses found.</div>;

  return (
    <div className="flex overflow-x-auto no-scrollbar space-x-4 px-6 py-3 pointer-events-auto items-center w-full snap-x">
      {poses.map((pose) => (
        <button
          key={pose.id}
          onClick={() => onSelect(pose)}
          className={`relative flex-shrink-0 w-[72px] h-[100px] rounded-[14px] overflow-hidden border transition-all duration-200 snap-center shadow-lg ${
            selectedId === pose.id 
              ? 'border-white ring-4 ring-white/20 scale-110 z-10' 
              : 'border-white/20 opacity-60 hover:opacity-100 scale-95'
          }`}
        >
          <div className="absolute inset-0 bg-[#1c1c1e]" />
          <Image 
            src={pose.src}
            alt={pose.title}
            fill
            style={{ objectFit: 'contain', padding: '6px' }}
            className="drop-shadow-md mix-blend-screen" 
          />
        </button>
      ))}
      <div className="w-2 flex-shrink-0" /> {/* right padding buffer */}
    </div>
  );
}
