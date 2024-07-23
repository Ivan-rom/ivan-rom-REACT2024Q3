import { FC, useContext } from 'react';
import { ThemeContextType } from '../../helpers/interfaces';
import { ThemeContext } from '../../helpers/context';

import './themeControls.css';

const ThemeControls: FC = () => {
  const { isDark, setIsDark } = useContext(ThemeContext) as ThemeContextType;

  function changeTheme() {
    setIsDark(!isDark);
  }

  return (
    <div className="theme-controls">
      <button onClick={changeTheme} className="">
        {isDark ? (
          <img src="/moon.svg" alt="moon icon" />
        ) : (
          <img src="/sun.svg" alt="sun icon" />
        )}
      </button>
    </div>
  );
};

export default ThemeControls;
