import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Item } from '../features/Home/home.type';

type SelectedItemsState = {
  items: Item[];
};

const initialState: SelectedItemsState = {
  items: [],
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    toggleItem: (state, action: PayloadAction<Item>) => {
      const item = action.payload;

      const exists = state.items.some(
        (selected) => selected.name === item.name
      );

      if (exists) {
        state.items = state.items.filter(
          (selected) => selected.name !== item.name
        );
      } else {
        state.items.push(item);
      }
    },

    clearSelectedItems: (state) => {
      state.items = [];
    },
  },
});

export const { toggleItem, clearSelectedItems } = selectedItemsSlice.actions;

export default selectedItemsSlice.reducer;
