import {create} from 'zustand';

const useProductStore = create((set) => ({
  items: null, // Assuming items is your state
  count:0,
  setItems: (newItems) => set({ items: newItems }),
  increment: () => set(state => ({ count: state.count + 1 })),
}));

export default useProductStore;