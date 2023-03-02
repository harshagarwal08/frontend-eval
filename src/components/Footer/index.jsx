/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import "./Footer.css";

function Footer() {
  const { themes, setThemes, saveTheme } = useContext(ThemeContext);
  const { colorHexCode } = themes
    ? themes.themes[themes.preferredThemeId - 1]
    : "#000000";
  const changeTheme = (id) => {
    setThemes({
      ...themes,
      preferredThemeId: id,
    });
  };
  return (
    <div className="footerContainer" style={{ backgroundColor: colorHexCode }}>
      <div className="themesFooter">
        <div className="themes">
          <p style={{ margin: 0, color: "white" }}>THEMES</p>
          {themes &&
            themes.themes.map((theme) =>
              colorHexCode === theme.colorHexCode ? (
                ""
              ) : (
                <div
                  className="theme"
                  style={{
                    backgroundColor: theme.colorHexCode,
                  }}
                  onClick={() => changeTheme(theme.id)}
                />
              )
            )}
        </div>
        <button type="button" className="themeButton" onClick={saveTheme}>
          SAVE THEME
        </button>
      </div>
    </div>
  );
}

export default Footer;
