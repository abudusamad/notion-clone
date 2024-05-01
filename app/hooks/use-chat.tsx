import { create } from "zustand";

type chatStore = {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
};

export const useChat = create<chatStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));
