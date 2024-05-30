import create from 'zustand';

const useProductStore = create((set) => ({
  items: null, // Assuming items is your state
  setItems: (newItems) => set({ items: newItems }),
}));

export default useProductStore;