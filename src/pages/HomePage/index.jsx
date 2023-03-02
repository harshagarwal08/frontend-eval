/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
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
  const [filteredEvents, setFilteredEvents] = useState();
  const [filter, setFilter] = useState("ALL");
  const [inputText, setInputText] = useState("");
  const [hideFilter, setHideFilter] = useState(false);
  useEffect(() => {
    makeRequest(GET_ALL_EVENTS, {}, navigate).then((data) => {
      setEvents(data);
      setFilteredEvents(data);
    });
  }, []);
  const setInputValue = (e) => {
    setInputText(e.target.value);
  };
  const hideFilterFn = () => {
    setHideFilter(!hideFilter);
  };
  const searchEvent = () => {
    return setFilteredEvents(
      filteredEvents.filter((event) =>
        event.name.toLowerCase().includes(inputText.toLowerCase())
      )
    );
  };
  const filterEvents = (filterName) => {
    setFilter(filterName);
    if (filterName === "ALL") setFilteredEvents(events);
    else if (filterName === "BOOKMARKED")
      setFilteredEvents(events.filter((event) => event.isBookmarked));
    else if (filterName === "SEATS AVAILABLE")
      setFilteredEvents(events.filter((event) => event.areSeatsAvailable));
    else if (filterName === "REGISTERED")
      setFilteredEvents(events.filter((event) => event.isRegistered));
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
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  size="lg"
                  onClick={searchEvent}
                />
              </div>
            </div>
            <div className={hideFilter ? "hideFilter" : "filterOptions"}>
              <div className="left">
                <div
                  type="button"
                  className="filterButtonsLeft"
                  onClick={() => {
                    filterEvents("ALL");
                  }}
                >
                  <FontAwesomeIcon
                    icon={filter === "ALL" ? faCircleDot : faCircle}
                    size="lg"
                  />
                  <div>ALL</div>
                </div>
                <div
                  type="button"
                  className="filterButtonsLeft"
                  onClick={() => {
                    filterEvents("REGISTERED");
                  }}
                >
                  <FontAwesomeIcon
                    icon={filter === "REGISTERED" ? faCircleDot : faCircle}
                    size="lg"
                  />
                  <div>REGISTERED</div>
                </div>
              </div>
              <div className="right">
                <div
                  type="button"
                  className="filterButtonsRight"
                  onClick={() => {
                    filterEvents("BOOKMARKED");
                  }}
                >
                  <div>BOOKMARKED</div>
                  <FontAwesomeIcon
                    icon={filter === "BOOKMARKED" ? faCircleDot : faCircle}
                    size="lg"
                  />
                </div>
                <div
                  type="button"
                  className="filterButtonsRight"
                  onClick={() => {
                    filterEvents("SEATS AVAILABLE");
                  }}
                >
                  <div>SEATS AVAILABLE</div>
                  <FontAwesomeIcon
                    icon={filter === "SEATS AVAILABLE" ? faCircleDot : faCircle}
                    size="lg"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="eventList">
            {filteredEvents.map((event) => {
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
