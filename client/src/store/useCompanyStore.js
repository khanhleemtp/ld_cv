import create from 'zustand';
import api from '../api/xhr/api';

export const useCompanyStore = create((set) => ({
  company: [],
  loading: false,
  error: {},
  getCompany: async (url) => {
    set({ loading: true });
    try {
      const { data } = await api.get(url);
      set({ loading: false });
      set({ error: {} });
      set({ company: data });
    } catch (error) {
      set({ loading: false });
      set({ error: error?.data?.message || 'Bad Request' });
    }
  },
}));
