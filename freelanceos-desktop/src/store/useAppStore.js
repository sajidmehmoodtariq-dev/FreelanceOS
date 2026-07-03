import { create } from 'zustand';

const useAppStore = create((set) => ({
  isConnected: false,
  setConnected: (status) => set({ isConnected: status }),
}));

export default useAppStore;
