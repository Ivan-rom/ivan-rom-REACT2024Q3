import { useEffect, useRef, useState } from 'react';

export default function useLocalStorage(itemName: string) {
  const [data, setData] = useState(localStorage.getItem(itemName) || '');
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
