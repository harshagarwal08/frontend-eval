import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { EventCard } from "../../components";
import { GET_EVENT_BY_ID } from "../../constants/apiEndpoints";
import makeRequest from "../../utils/makeRequest";
import "./EventDetails.css";

function EventDetails() {
  const { id } = useParams();
  const [details, setDetails] = useState();

  useEffect(() => {
    makeRequest(GET_EVENT_BY_ID(id)).then((data) => setDetails(data));
  }, []);

  return (
    <div className="eventDetailsContainer">
      {details ? (
        <EventCard eventDetails={details} key={details.id} showDetails />
      ) : (
        <div className="loading-center">Loading...</div>
      )}
    </div>
  );
}

export default EventDetails;
