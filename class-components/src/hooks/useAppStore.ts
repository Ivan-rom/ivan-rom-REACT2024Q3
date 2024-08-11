import { AppStore } from '@/store/store';
import { useStore } from 'react-redux';

export const useAppStore: () => AppStore = useStore;
