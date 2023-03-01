import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  faMagnifyingGlass,
  faFilter,
  faCircleDot,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EventCard } from "../../components";
import { GET_ALL_EVENTS } from "../../constants/apiEndpoints";
import "./HomePage.css";
import makeRequest from "../../utils/makeRequest";

function HomePage() {
  const navigate = useNavigate();
  const [events, setEvents] = useState();

  useEffect(() => {
    makeRequest(GET_ALL_EVENTS, {}, navigate).then((data) => setEvents(data));
  }, []);
  const [inputText, setInputText] = useState("");
  const [hideFilter, setHideFilter] = useState(false);
  const setInputValue = (e) => {
    setInputText(e.target.value);
  };
  const hideFilterFn = () => {
    setHideFilter(!hideFilter);
  };
  return (
    <div className="homePageContainer">
      {events ? (
        <>
          <div className="optionsContainer">
            <div className="options">
              <div className="filter">
                <FontAwesomeIcon icon={faFilter} size="lg" />
                <div>FILTER</div>
                <FontAwesomeIcon
                  icon={faChevronUp}
                  size="lg"
                  onClick={hideFilterFn}
                />
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
            <div className={hideFilter ? "hideFilter" : "filterOptions"}>
              <div className="left">
                <div className="filterButtonsLeft">
                  <FontAwesomeIcon icon={faCircleDot} size="lg" />
                  <div>ALL</div>
                </div>
                <div className="filterButtonsLeft">
                  <FontAwesomeIcon icon={faCircle} size="lg" />
                  <div>REGISTERED</div>
                </div>
              </div>
              <div className="right">
                <div className="filterButtonsRight">
                  <div>BOOKMARKED</div>
                  <FontAwesomeIcon icon={faCircle} size="lg" />
                </div>
                <div className="filterButtonsRight">
                  <div>SEATS AVAILABLE</div>
                  <FontAwesomeIcon icon={faCircle} size="lg" />
                </div>
              </div>
            </div>
          </div>
          <div className="eventList">
            {events.map((event) => {
              return <EventCard eventDetails={event} key={event.id} />;
            })}
          </div>
        </>
      ) : (
        <div className="loading-center">Loading...</div>
      )}
    </div>
  );
}

export default HomePage;
