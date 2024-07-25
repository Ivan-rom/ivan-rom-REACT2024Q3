import { createContext } from 'react';
import { ThemeContextType } from './interfaces';

export const ThemeContext = createContext<ThemeContextType | null>(null);
