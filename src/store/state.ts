import { create } from "zustand";

export interface transactionsType {
	id: number;
	userId: number;
	amount: number;
	type: "income" | "expense";
	source: string | undefined | null;
	category: string | undefined | null;
	description: string | undefined | null;
	date: Date;
}

interface StoreState {
	dark: boolean;
	setDark: (value: boolean) => void;
	transactions: transactionsType[] | null; // Updated type to match the setter
	setTransactions: (value: transactionsType[]) => void;
}

const useStore = create<StoreState>((set) => ({
	dark: false, // Initial state
	setDark: (value) => set({ dark: value }),
	transactions: null,
	setTransactions: (value) => set(() => ({ transactions: value })), // Fixed syntax
}));

export default useStore;
