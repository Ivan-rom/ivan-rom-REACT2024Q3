import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';

export default useDispatch.withTypes<AppDispatch>();
