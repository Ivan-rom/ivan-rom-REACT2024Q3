import { useEffect, useState } from 'react';

export default function useLocalStorage(itemName: string) {
  const getValueFromLocalStorage = () => {
    const savedValue = localStorage.getItem(itemName);
    return savedValue ? savedValue : '';
  };

  const [data, setData] = useState(getValueFromLocalStorage);

  useEffect(() => {
    // BUG: saving data after input, not after unmount for no reason
    return () => {
      localStorage.setItem(itemName, data.trim());
    };
  }, [itemName, data]);

  return [data, setData] as const;
}
