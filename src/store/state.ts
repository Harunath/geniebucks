import { create } from "zustand";

interface StoreState {
	dark: boolean;
	setDark: (value: boolean) => void;
}

const useStore = create<StoreState>((set) => ({
	dark: false, // Initial state
	setDark: (value) => set({ dark: value }),
}));
export default useStore;
