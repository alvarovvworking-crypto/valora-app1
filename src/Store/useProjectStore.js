import { create } from 'zustand';

export const useProjectStore = create((set) => ({
  currentProject: {
    name: '',
    client: '',
    serviceType: 'Desarrollo web',
    hours: 20,
    rate: 55,
    complexity: 1.3,
    revisions: 2,
    urgency: 0,
    deliveryDays: 15,
    vat: 21,
  },
  setProjectField: (field, value) => 
    set((state) => ({ 
      currentProject: { ...state.currentProject, [field]: value } 
    })),
  resetProject: () => set({ currentProject: { /* valores iniciales */ } }),
}));
