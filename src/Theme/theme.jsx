// src/Theme/theme.js
import { createTheme } from '@mui/material/styles';

// Light Theme Configuration
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#d32f2f',
    },
    background: {
      default: '#f4f6f8',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2rem',
    },
    body1: {
      fontWeight: 400,
      fontSize: '1rem',
    },
  },
  spacing: 8, // Customize spacing unit (e.g., 8px per spacing unit)
});

// Dark Theme Configuration
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
      paper: '#1c1c1c',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2rem',
    },
    body1: {
      fontWeight: 400,
      fontSize: '1rem',
    },
  },
  spacing: 8,
});
