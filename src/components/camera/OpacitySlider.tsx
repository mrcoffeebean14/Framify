'use client';

interface OpacitySliderProps {
  opacity: number;
  setOpacity: (val: number) => void;
}

export function OpacitySlider({ opacity, setOpacity }: OpacitySliderProps) {
  return (
    <div className="flex items-center space-x-3 bg-black/40 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/10 shadow-lg pointer-events-auto">
      <span className="text-[10px] font-bold tracking-widest text-white/80 uppercase">Opacity</span>
      <input 
        type="range" 
        min="10" 
        max="90" 
        value={opacity} 
        onChange={(e) => setOpacity(parseInt(e.target.value))} 
        className="w-24 accent-white h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer outline-none"
      />
    </div>
  );
}
