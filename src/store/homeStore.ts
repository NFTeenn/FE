// src/store/homeStore.ts
import { create } from "zustand";
import { fetchHomeData } from "@/widgets/home/api/index";

type HomeData = {
  day: number;
  level: number;
  mission: string[];
  quizCount: number;
  quiz: string | null;
  a: string[] | null;
  words: string[];
  result: number;
  content: string;
};

interface HomeStore {
  home: HomeData | null;
  loading: boolean;
  error: string | null;

  loadHome: () => Promise<void>;
}

export const useHomeStore = create<HomeStore>((set) => ({
  home: null,
  loading: false,
  error: null,

  loadHome: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchHomeData();
      set({ home: data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
}));
