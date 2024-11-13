// src/index.js
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, CssBaseline } from '@mui/material';  // Correct ThemeProvider import
import App from './App';
import { darkTheme, lightTheme } from './Theme/theme';  // Assuming you have 'darkTheme' and 'lightTheme' in theme.js

const Index = () => {

  const [themeMode, setThemeMode] = useState('light');

  const toggleTheme = () => {
    const newThemeMode = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newThemeMode);
    localStorage.setItem('themeMode', newThemeMode);  // Save the theme mode in localStorage
  };

  return (
    <ThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
      <CssBaseline />  
      <App toggleTheme={toggleTheme} />
    </ThemeProvider>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<Index />);
