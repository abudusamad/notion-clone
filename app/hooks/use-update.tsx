import { create } from "zustand";

type UpdateStore = {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
};

export const useUpdate = create<UpdateStore>((set) => ({
	isOpen: true,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));
