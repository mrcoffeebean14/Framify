'use client';

interface CaptureButtonProps {
  onCapture: () => void;
}

export function CaptureButton({ onCapture }: CaptureButtonProps) {
  return (
    <button 
      onClick={onCapture}
      className="relative flex items-center justify-center w-20 h-20 rounded-full bg-white/10 border-[3px] border-white/50 backdrop-blur-md active:scale-90 transition-all duration-150 pointer-events-auto hover:border-white shadow-xl"
      aria-label="Take photo"
    >
      <div className="w-[60px] h-[60px] rounded-full bg-white shadow-inner" />
    </button>
  );
}
