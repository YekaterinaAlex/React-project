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
        description: '',
      })
    );

    expect(state.items).toEqual([
      {
        name: 'pikachu',
        description: '',
      },
    ]);
  });

  it('removes item when it is already selected', () => {
    const state = selectedItemsReducer(
      {
        items: [
          {
            name: 'pikachu',
            description: '',
          },
        ],
      },
      toggleItem({
        name: 'pikachu',
        description: '',
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
            description: '',
          },
          {
            name: 'ditto',
            description: '',
          },
        ],
      },
      clearSelectedItems()
    );

    expect(state.items).toEqual([]);
  });
});
