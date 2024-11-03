import { StateCreator } from 'zustand/index';
import { AppStore } from '@/entities/store/index.ts';

type StateType = {
  isLoggedIn: boolean;
  isAdmin: boolean;
  userData: UserData;
};

export type UserData = {
  passport_num?: string;
  surname?: string;
  name?: string;
  patronymic?: string;
};

type ActionsType = {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setUserData: (userData: UserData) => void;
  setIsAdmin: (isAdmin: boolean) => void;
};

export type UserSliceType = StateType & ActionsType;

export const createUserSlice: StateCreator<
  AppStore,
  [['zustand/devtools', never]],
  [],
  UserSliceType
> = (set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn) => set(() => ({ isLoggedIn })),
  isAdmin: false,
  setIsAdmin: (isAdmin) => set(() => ({ isAdmin })),
  userData: {},
  setUserData: (userData) => set(() => ({ userData })),
});
