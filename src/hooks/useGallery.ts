import { useState, useEffect, useCallback } from 'react';
import { storage, PhotoRecord } from '@/lib/db';

export function useGallery() {
  const [photos, setPhotos] = useState<PhotoRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadPhotos = useCallback(async () => {
    setIsLoading(true);
    try {
      const allPhotos = await storage.getPhotos();
      setPhotos(allPhotos);
    } catch (error) {
      console.error('Failed to load photos:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPhotos();
  }, [loadPhotos]);

  const savePhoto = async (dataUrl: string) => {
    try {
      await storage.savePhoto(dataUrl);
      await loadPhotos(); // Refresh the list
    } catch (error) {
      console.error('Failed to save photo:', error);
      throw error;
    }
  };

  const deletePhoto = async (id: string) => {
    try {
      await storage.deletePhoto(id);
      setPhotos(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error('Failed to delete photo:', error);
    }
  };

  return {
    photos,
    isLoading,
    savePhoto,
    deletePhoto,
    refreshGallery: loadPhotos
  };
}
