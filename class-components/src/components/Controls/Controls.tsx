import { FC, useContext } from 'react';
import useAppSelector from '../../hooks/useAppSelector';
import useAppDispatch from '../../hooks/useAppDispatch';
import { clearSelectedPeople } from '../../store/peopleSlice/peopleSlice';
import { ThemeContext } from '../../helpers/context';
import { ThemeContextType } from '../../helpers/interfaces';
import classNames from 'classnames';

import styles from './controls.module.css';

const Controls: FC = () => {
  const dispatch = useAppDispatch();
  const { selectedPeople } = useAppSelector((state) => state.people);
  const { isDark } = useContext(ThemeContext) as ThemeContextType;

  function unselectAllHandler() {
    dispatch(clearSelectedPeople());
  }

  const controlsStyles = {
    [styles.controls]: true,
    [styles.dark]: isDark,
  };

  function getCSVContent() {
    const titleKeys = Object.keys(selectedPeople[0]);

    const refinedData = [];
    refinedData.push(titleKeys);

    selectedPeople.forEach((person) => {
      refinedData.push(Object.values(person));
    });

    let csvContent = '';

    refinedData.forEach((row) => {
      csvContent += row.join(';') + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8,' });
    const objUrl = URL.createObjectURL(blob);

    return objUrl;
  }

  return (
    <div className={classNames(controlsStyles)}>
      <div className={styles.title}>
        Selected: {selectedPeople.length} items
      </div>
      <div className={styles.buttons}>
        <button
          onClick={unselectAllHandler}
          className={classNames('button', styles.button, styles.delete)}
        >
          Unselect all
        </button>
        <a
          href={getCSVContent()}
          download={`${selectedPeople.length}_people.csv`}
          className={classNames('button', styles.button, styles.download)}
        >
          Download
        </a>
      </div>
    </div>
  );
};

export default Controls;
