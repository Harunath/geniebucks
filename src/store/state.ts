import { create } from "zustand";
import { transactionTypes } from "@/lib/types";

interface StoreState {
	dark: boolean;
	setDark: (value: boolean) => void;
	transactions: transactionTypes[] | null; // Updated type to match the setter
	setTransactions: (value: transactionTypes[]) => void;
}

const useStore = create<StoreState>((set) => ({
	dark: false, // Initial state
	setDark: (value) => set({ dark: value }),
	transactions: null,
	setTransactions: (value) => set(() => ({ transactions: value })), // Fixed syntax
}));

export default useStore;
