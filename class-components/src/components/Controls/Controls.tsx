import { FC, useContext } from 'react';
import useAppSelector from '../../hooks/useAppSelector';
import useAppDispatch from '../../hooks/useAppDispatch';
import { clearSelectedPeople } from '../../store/peopleSlice';
import { ThemeContext } from '../../helpers/context';
import { ThemeContextType } from '../../helpers/interfaces';

import './controls.css';

const Controls: FC = () => {
  const dispatch = useAppDispatch();
  const { selectedPeople } = useAppSelector((state) => state.people);
  const { isDark } = useContext(ThemeContext) as ThemeContextType;

  function unselectAllHandler() {
    dispatch(clearSelectedPeople());
  }

  return (
    <div className={`controls ${isDark ? 'controls-dark' : ''}`}>
      <div className="controls__title">
        Selected: {selectedPeople.length} items
      </div>
      <div className="controls__buttons">
        <button
          onClick={unselectAllHandler}
          className="button controls__button button-delete"
        >
          Unselect all
        </button>
        <a
          href={`data:text/plain;charset=utf-8, ${JSON.stringify(selectedPeople, null, ' ')}`}
          download={`${selectedPeople.length}_people.csv`}
          className="button controls__button button-download"
        >
          Download
        </a>
      </div>
    </div>
  );
};

export default Controls;
