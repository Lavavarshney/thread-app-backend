import React , { createContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(false);

  useEffect (() => { // Corrected here
    const bodyElement = document.body;
    if (dark) {
      bodyElement.classList.add('dark-mode');
    } else {
      bodyElement.classList.remove('dark-mode');
    }
  }, [dark]);

  const handleToggle = () => {
    setDark(!dark);
    console.log('Dark mode:', dark);
  };

  return (
    <ThemeContext.Provider value={{ theme: dark, handleToggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext,ThemeProvider };