/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import React, { createContext, useEffect, useState } from "react";
import { GET_ALL_THEMES, SAVE_THEME } from "../constants/apiEndpoints";
import makeRequest from "../utils/makeRequest";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [themes, setThemes] = useState();
  useEffect(() => {
    makeRequest(GET_ALL_THEMES).then((data) => setThemes(data));
  }, []);
  const saveTheme = () => {
    makeRequest(SAVE_THEME, {
      data: {
        preferredThemeId: themes.preferredThemeId,
      },
    });
  };

  return (
    <ThemeContext.Provider value={{ themes, setThemes, saveTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
