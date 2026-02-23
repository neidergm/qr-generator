import { create } from "zustand";

type ThemeActions = {
    toggleTheme: () => void;
}

type ThemeState = {
    theme: 'light' | 'dark';
}

type ThemeStore = ThemeState & ThemeActions;

const initialState: ThemeState = {
    theme: 'light'
}

const useTheme = create<ThemeStore>()((set) => ({
    ...initialState,
    toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
}))

export default useTheme;