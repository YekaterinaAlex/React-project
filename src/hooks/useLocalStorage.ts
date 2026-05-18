import { useCallback, useState } from 'react';

function useLocalStorage(key: string, initialValue: string) {
  const [storedValue, setStoredValue] = useState(() => {
    return localStorage.getItem(key) ?? initialValue;
  });

  const setValue = useCallback(
    (value: string) => {
      localStorage.setItem(key, value);
      setStoredValue(value);
    },
    [key]
  );

  const removeValue = useCallback(() => {
    localStorage.removeItem(key);
    setStoredValue(initialValue);
  }, [key, initialValue]);

  return {
    storedValue,
    setValue,
    removeValue,
  };
}

export default useLocalStorage;
