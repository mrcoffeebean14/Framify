import { set, get, del, entries } from 'idb-keyval';

export interface PhotoRecord {
  id: string;
  dataUrl: string; // Storing as base64 data URL for simplicity in MVP
  createdAt: number;
}

export const storage = {
  async savePhoto(dataUrl: string): Promise<string> {
    const id = `photo_${Date.now()}`;
    const record: PhotoRecord = { id, dataUrl, createdAt: Date.now() };
    await set(id, record);
    return id;
  },

  async getPhotos(): Promise<PhotoRecord[]> {
    const all = await entries();
    // Filter to only photos in case other things end up in DB
    const photos = all.filter(([key]) => String(key).startsWith('photo_')).map(([, val]) => val as PhotoRecord);
    return photos.sort((a, b) => b.createdAt - a.createdAt); // Newest first
  },

  async deletePhoto(id: string): Promise<void> {
    await del(id);
  }
};
