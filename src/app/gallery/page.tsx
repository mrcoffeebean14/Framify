'use client';
import { useGallery } from '@/hooks/useGallery';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Trash2, ImageIcon } from 'lucide-react';

export default function GalleryPage() {
  const { photos, isLoading, deletePhoto } = useGallery();

  return (
    <div className="min-h-[100dvh] bg-black text-white p-5 selection:bg-none">
      {/* Dynamic Header */}
      <header className="flex items-center justify-between mb-8 pt-4">
        <Link href="/" className="p-3 -ml-3 bg-white/5 rounded-full hover:bg-white/10 active:scale-90 transition">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-bold tracking-tight">Saved Poses</h1>
        <div className="w-12" /> {/* Layout balancer */}
      </header>

      {/* Grid Content */}
      <main>
        {isLoading ? (
          <div className="h-[60vh]">
            <LoadingSpinner />
          </div>
        ) : photos.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center px-6">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
              <ImageIcon className="w-10 h-10 text-white/30" />
            </div>
            <h2 className="text-2xl font-bold mb-2">No photos yet</h2>
            <p className="text-white/50 mb-8 max-w-[250px]">Open the camera and try out some aesthetic poses to save them here.</p>
            <Link href="/" className="px-8 py-4 bg-white text-black font-semibold rounded-full active:scale-[0.98] transition shadow-xl">
              Open Camera
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {photos.map(photo => (
              <div key={photo.id} className="relative aspect-[3/4] bg-white/10 rounded-[20px] overflow-hidden group shadow-lg border border-white/10">
                <Image 
                  src={photo.dataUrl} 
                  alt="Captured pose reference" 
                  fill 
                  className="object-cover"
                  unoptimized 
                />
                
                {/* Overlay Controls */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => deletePhoto(photo.id)}
                    className="absolute bottom-3 right-3 p-3 bg-red-500/80 backdrop-blur-md rounded-full text-white active:scale-90 transition shadow-xl"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
