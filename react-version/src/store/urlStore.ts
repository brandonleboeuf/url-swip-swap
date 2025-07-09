import { create } from 'zustand';

interface UrlPair {
  topUrl: string;
  bottomUrl: string;
  checked: boolean;
}

interface UrlStore {
  urlPairs: UrlPair[];
  addUrlPair: () => void;
  removeUrlPair: (index: number) => void;
  updateUrlPair: (index: number, pair: Partial<UrlPair>) => void;
  loadUrlPairs: (pairs: UrlPair[]) => void;
}

export const useUrlStore = create<UrlStore>((set) => ({
  urlPairs: [],
  
  addUrlPair: () => set((state) => ({
    urlPairs: [...state.urlPairs, { topUrl: '', bottomUrl: '', checked: true }]
  })),
  
  removeUrlPair: (index) => set((state) => ({
    urlPairs: state.urlPairs.filter((_, i) => i !== index)
  })),
  
  updateUrlPair: (index, pair) => set((state) => ({
    urlPairs: state.urlPairs.map((p, i) => 
      i === index ? { ...p, ...pair } : p
    )
  })),
  
  loadUrlPairs: (pairs) => set({ urlPairs: pairs })
})); 