/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  return (
    <header className="recordsHeader">
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
