import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EventCard, Options } from "../../components";
import { GET_ALL_EVENTS } from "../../constants/apiEndpoints";
import "./HomePage.css";
import makeRequest from "../../utils/makeRequest";

function HomePage() {
  const navigate = useNavigate();
  const [events, setEvents] = useState();

  useEffect(() => {
    makeRequest(GET_ALL_EVENTS, {}, navigate).then((data) => setEvents(data));
  }, []);

  return (
    <div className="homePageContainer">
      {events ? (
        <>
          <Options />
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
