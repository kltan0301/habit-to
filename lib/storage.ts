// lib/storage.ts

import { AppData } from './habitService';

export interface StorageAdapter {
  save(data: AppData): void;
  load(): AppData | null;
}

export class LocalStorageAdapter implements StorageAdapter {
  private key: string;

  constructor(key: string = 'habitAppData') {
    this.key = key;
  }

  save(data: AppData): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  load(): AppData | null {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem(this.key);
    if (!stored) return null;
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }
}

// Default adapter instance
export const defaultStorage = new LocalStorageAdapter();