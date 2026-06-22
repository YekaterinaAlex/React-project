import { useCallback, useState } from 'react';

function useLocalStorage(key: string, initialValue: string) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    return window.localStorage.getItem(key) ?? initialValue;
  });

  const setValue = useCallback(
    (value: string) => {
      window.localStorage.setItem(key, value);
      setStoredValue(value);
    },
    [key]
  );

  const removeValue = useCallback(() => {
    window.localStorage.removeItem(key);
    setStoredValue(initialValue);
  }, [key, initialValue]);

  return {
    storedValue,
    setValue,
    removeValue,
  };
}

export default useLocalStorage;
