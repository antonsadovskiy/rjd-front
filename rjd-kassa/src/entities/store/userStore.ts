import { StateCreator } from 'zustand/index';
import { AppStore } from '@/entities/store/index.ts';

type StateType = {
  isLoggedIn: boolean;
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
  userData: {},
  setUserData: (userData) => set(() => ({ userData })),
});
