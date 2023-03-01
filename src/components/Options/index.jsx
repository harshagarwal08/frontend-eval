/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import "./Options.css";
import {
  faMagnifyingGlass,
  faFilter,
  faCircleDot,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Options() {
  const [inputText, setInputText] = useState("");
  const setInputValue = (e) => {
    setInputText(e.target.value);
  };
  const changeFilter = (e) => {
    console.log(e.target);
  };
  return (
    <div className="optionsContainer">
      <div className="options">
        <div className="filter">
          <FontAwesomeIcon icon={faFilter} size="lg" />
          <div>FILTER</div>
          <FontAwesomeIcon icon={faChevronUp} size="lg" />
        </div>
        <div className="searchBar">
          <input
            type="text"
            placeholder="EVENT NAME"
            className="searchInput"
            value={inputText}
            onChange={setInputValue}
          />
          <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
        </div>
      </div>
      <div className="filterOptions">
        <div className="left">
          <div className="filterButtonsLeft">
            <FontAwesomeIcon icon={faCircleDot} size="lg" />
            <div onClick={changeFilter} type="radio" value="all">
              ALL
            </div>
          </div>
          <div className="filterButtonsLeft">
            <FontAwesomeIcon icon={faCircle} size="lg" />
            <div onClick={() => changeFilter("registered")}>REGISTERED</div>
          </div>
        </div>
        <div className="right">
          <div className="filterButtonsRight">
            <div onClick={() => changeFilter("bookmarked")}>BOOKMARKED</div>
            <FontAwesomeIcon icon={faCircle} size="lg" />
          </div>
          <div className="filterButtonsRight">
            <div onClick={() => changeFilter("seats")}>SEATS AVAILABLE</div>
            <FontAwesomeIcon icon={faCircle} size="lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Options;
