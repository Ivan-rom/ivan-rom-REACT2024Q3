import { useEffect, useRef, useState } from 'react';

function getSavedValue(key: string, initialValue: string) {
  if (typeof window === 'undefined') return initialValue;

  return localStorage.getItem(key) || '';
}

export default function useLocalStorage(itemName: string, initialValue = '') {
  const [data, setData] = useState(() => getSavedValue(itemName, initialValue));
  const dataRef = useRef('');

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  useEffect(() => {
    return () => {
      localStorage.setItem(itemName, dataRef.current.trim());
    };
  }, []);

  return [data, setData] as const;
}
