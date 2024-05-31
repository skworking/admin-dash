import {create} from 'zustand';
import { persist } from 'zustand/middleware';

const useProductStore = create(
  persist(
  (set) => ({
  items: null, // Assuming items is your state
  count:0,
  setItems: (newItems) => set({ items: newItems }),
  increment: () => set(state => ({ count: state.count + 1 })),
}),
{
  name: 'product-store', // Name to identify the store in localStorage
  // Storage configuration is optional, default is localStorage
  getStorage: () => localStorage, // Specify localStorage explicitly if needed
}
));

export default useProductStore;