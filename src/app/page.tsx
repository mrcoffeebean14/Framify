'use client';
import { useRef, useState, useEffect, useMemo } from 'react';
import { PermissionGate } from '@/components/camera/PermissionGate';
import { CameraView } from '@/components/camera/CameraView';
import { PoseOverlay } from '@/components/camera/PoseOverlay';
import { CaptureButton } from '@/components/camera/CaptureButton';
import { OpacitySlider } from '@/components/camera/OpacitySlider';
import { PoseCarousel } from '@/components/ui/PoseCarousel';
import { CategoryTabs } from '@/components/ui/CategoryTabs';
import { poses, Pose, PoseCategory } from '@/lib/poses';
import { useGallery } from '@/hooks/useGallery';
import Link from 'next/link';
import { ImageIcon } from 'lucide-react';

export default function PoseCameraScreen() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { savePhoto } = useGallery();
  
  const [activeCategory, setActiveCategory] = useState<PoseCategory>('Solo');
  const [selectedPose, setSelectedPose] = useState<Pose | null>(null);
  const [opacity, setOpacity] = useState(50);
  const [hasGranted, setHasGranted] = useState(false);
  const [flash, setFlash] = useState(false);

  // Initialize selected pose based on category if it changes and we don't have one selected for it
  const filteredPoses = useMemo(() => {
    return poses.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    if (filteredPoses.length > 0) {
      setSelectedPose(filteredPoses[0]);
    } else {
      setSelectedPose(null);
    }
  }, [activeCategory, filteredPoses]);

  const handleCapture = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    // UI Flash
    setFlash(true);
    setTimeout(() => setFlash(false), 200);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (!video.videoWidth || !video.videoHeight) return;

    // Set canvas dimensions to match video stream precisely
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // We draw exactly what the camera feed sees (which is raw from the device layer)
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Save as JPEG to IndexedDB
    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
    await savePhoto(dataUrl);
  };

  return (
    <main className="relative h-[100dvh] w-full overflow-hidden bg-black text-white selection:bg-none">
      <PermissionGate onGrant={() => setHasGranted(true)} isLoadingExt={false}>
        {/* Core Camera Feed Backsplash */}
        <CameraView videoRef={videoRef} />
        
        {/* Semi-transparent Overlay */}
        <PoseOverlay pose={selectedPose} opacity={opacity} />

        {/* Hidden Canvas for Capturing bytes */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Bottom Interactive UI Floating Panel */}
        <div className="absolute inset-x-0 bottom-0 pb-10 pt-32 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col items-center justify-end z-20 pointer-events-none">
          
          <div className="w-full max-w-lg mx-auto flex flex-col gap-4">
             {/* Opacity Control Top Header */}
            <div className="flex justify-center w-full px-6 mb-1">
              <OpacitySlider opacity={opacity} setOpacity={setOpacity} />
            </div>

            {/* Pose Selection Logic */}
            <CategoryTabs 
              categories={['Solo', 'Couple', 'Group', 'Portrait', 'Sitting']} 
              active={activeCategory} 
              onSelect={setActiveCategory} 
            />
            
            <PoseCarousel 
              poses={filteredPoses} 
              selectedId={selectedPose?.id || null} 
              onSelect={setSelectedPose} 
            />

            {/* Capture & Utility Buttons Footer */}
            <div className="flex items-center justify-between px-10 mt-4 pointer-events-auto w-full">
              {/* Gallery Navigate Button */}
              <Link href="/gallery" className="p-4 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 active:scale-90 transition hover:bg-white/20 shadow-xl">
                <ImageIcon className="w-6 h-6 text-white" />
              </Link>
              
              {/* Centered Main Action */}
              <CaptureButton onCapture={handleCapture} />
              
              {/* Spacer for strict center balancing */}
              <div className="w-14 h-14" />
            </div>
          </div>
        </div>

        {/* Flash Effect on Image Tick */}
        {flash && <div className="absolute inset-0 bg-white z-50 animate-flash pointer-events-none" />}
      </PermissionGate>
    </main>
  );
}
