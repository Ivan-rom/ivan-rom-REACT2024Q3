import { FC, useContext } from 'react';
import { ThemeContextType } from '../../helpers/interfaces';
import { ThemeContext } from '../../helpers/context';

enum Icons {
  sun = 'sun',
  moon = 'moon',
}

const ThemeControls: FC = () => {
  const { isDark, setIsDark } = useContext(ThemeContext) as ThemeContextType;
  const icon = isDark ? Icons.moon : Icons.sun;

  function changeTheme() {
    setIsDark(!isDark);
  }

  return (
    <button onClick={changeTheme}>
      <img src={`/${icon}.svg`} alt={`${icon} icon`} />
    </button>
  );
};

export default ThemeControls;
