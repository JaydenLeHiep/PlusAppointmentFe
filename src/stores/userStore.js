import create from 'zustand';

export const useUserStore = create((set) => ({
  isAuthenticated: false,
  isOwner: false,
  token: null,
  login: (token, isOwner) => set({ isAuthenticated: true, token, isOwner }),
  logout: () => set({ isAuthenticated: false, token: null, isOwner: false }),
}));
