import { FC, ReactNode, useEffect, useState } from 'react';
import { ThemeContext } from '../../helpers/context';

type Props = {
  children: ReactNode;
};

const ContextProvider: FC<Props> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ContextProvider;
