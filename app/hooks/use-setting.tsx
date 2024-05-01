import { create } from "zustand";

type SettingStore = {
	isOpen: boolean;
	onClose: () => void;
	onOpen: () => void;
};

export const useSetting = create<SettingStore>((set) => ({
	isOpen: false,
	onClose: () => set({ isOpen: false }),
	onOpen: () => set({ isOpen: true }),
}));
