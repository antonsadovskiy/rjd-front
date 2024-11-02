import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createUserSlice, UserSliceType } from '@/entities/store/userStore.ts';

export type AppStore = UserSliceType;

export const useAppStore = create<AppStore>()(
  devtools((...args) => ({
    ...createUserSlice(...args),
  })),
);
