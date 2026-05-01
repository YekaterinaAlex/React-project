import { useState } from 'react';

function useLocalStorage(key: string, initialValue: string) {
  const [storedValue, setStoredValue] = useState(() => {
    return localStorage.getItem(key) ?? initialValue;
  });

  const setValue = (value: string) => {
    localStorage.setItem(key, value);
    setStoredValue(value);
  };

  const removeValue = () => {
    localStorage.removeItem(key);
    setStoredValue(initialValue);
  };

  return {
    storedValue,
    setValue,
    removeValue,
  };
}
export default useLocalStorage;
