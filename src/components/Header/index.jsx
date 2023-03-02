/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";
import "./Header.css";

function Header() {
  const { themes } = useContext(ThemeContext);
  const { colorHexCode } = themes
    ? themes.themes[themes.preferredThemeId - 1]
    : "#000000";
  const navigate = useNavigate();
  return (
    <header className="recordsHeader" style={{ backgroundColor: colorHexCode }}>
      <p
        className="recordsHeaderText"
        data-testid="records-header-text"
        onClick={() => {
          navigate("/");
        }}
      >
        EVENTIFY
      </p>
    </header>
  );
}

export default Header;
