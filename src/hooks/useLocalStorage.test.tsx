import useLocalStorage from './useLocalStorage';
import { renderHook, act } from '@testing-library/react';
describe('useLocalStorage', () => {
  afterEach(() => {
    localStorage.clear();
  });
  it('sets and removes value from localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('searchTerm', ''));
    act(() => {
      result.current.setValue('pikachu');
    });
    expect(result.current.storedValue).toBe('pikachu');
    expect(localStorage.getItem('searchTerm')).toBe('pikachu');
    act(() => {
      result.current.removeValue();
    });
    expect(result.current.storedValue).toBe('');
    expect(localStorage.getItem('searchTerm')).toBeNull();
  });
});
