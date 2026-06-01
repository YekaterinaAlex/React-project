import selectedItemsReducer, {
  toggleItem,
  clearSelectedItems,
} from './selectedItemsSlice';

describe('selectedItemsSlice', () => {
  it('adds item when it is not selected', () => {
    const state = selectedItemsReducer(
      { items: [] },
      toggleItem({
        name: 'pikachu',
      })
    );

    expect(state.items).toEqual([
      {
        name: 'pikachu',
      },
    ]);
  });

  it('removes item when it is already selected', () => {
    const state = selectedItemsReducer(
      {
        items: [
          {
            name: 'pikachu',
          },
        ],
      },
      toggleItem({
        name: 'pikachu',
      })
    );

    expect(state.items).toEqual([]);
  });

  it('clears all selected items', () => {
    const state = selectedItemsReducer(
      {
        items: [
          {
            name: 'pikachu',
          },
          {
            name: 'ditto',
          },
        ],
      },
      clearSelectedItems()
    );

    expect(state.items).toEqual([]);
  });
});
