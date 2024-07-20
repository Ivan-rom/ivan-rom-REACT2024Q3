import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export default useSelector.withTypes<RootState>();
