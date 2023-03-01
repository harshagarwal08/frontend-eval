/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import {
  faCircleCheck,
  faCircleXmark,
  faBookmark as faBookmarked,
} from "@fortawesome/free-solid-svg-icons";
import "./EventCard.css";
import { useNavigate } from "react-router-dom";
import formatTime from "../../utils/commons/formatTime";
import makeRequest from "../../utils/makeRequest";
import { UPDATE_EVENT } from "../../constants/apiEndpoints";
import { EVENT_DETAILS } from "../../constants/routes";

function EventCard({ eventDetails, showDetails }) {
  console.log(showDetails);
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(eventDetails.isRegistered);
  const [isBookmarked, setIsBookmarked] = useState(eventDetails.isBookmarked);
  const noSeats = !eventDetails.areSeatsAvailable
    ? { icon: faCircleXmark, color: "#ECECAB", text: "NO SEATS AVAILABLE" }
    : "";
  const leftIcon = isRegistered
    ? { icon: faCircleCheck, color: "#A0F3AD", text: "REGISTERED" }
    : noSeats;
  const bookmarkIcon = isBookmarked
    ? { icon: faBookmarked, color: "#EA8282" }
    : { icon: faBookmark, color: "#EA8282" };

  if (showDetails) {
    const updateRegister = async () => {
      await makeRequest(UPDATE_EVENT(eventDetails.id), {
        data: {
          isRegistered: !isRegistered,
        },
      });
      setIsRegistered(!isRegistered);
    };
  }

  const updateBookmark = async () => {
    await makeRequest(UPDATE_EVENT(eventDetails.id), {
      data: {
        isBookmarked: !isBookmarked,
      },
    });
    setIsBookmarked(!isBookmarked);
  };

  const dateTime = formatTime(eventDetails.datetime, eventDetails.timezone);
  return (
    <div
      className={`cardContainer ${showDetails ? "eventDetails" : ""}`}
      onClick={() => {
        navigate(`${EVENT_DETAILS}/${eventDetails.id}`);
      }}
    >
      <div className="cardImage">
        <img src={eventDetails.imgUrl} alt="eventImage" />
      </div>
      <div className="content">
        <div className="title">{eventDetails.name}</div>
        <div className="desc">{eventDetails.description}</div>
        <div className="details">
          <p className="venue">VENUE: {eventDetails.venue}</p>
          <p className="date">DATE: {dateTime}</p>
        </div>
        <div className="options">
          <div className="leftButton">
            {leftIcon.icon ? (
              <FontAwesomeIcon
                // onClick={updateRegister}
                icon={leftIcon.icon}
                style={{ color: leftIcon.color }}
                size="lg"
              />
            ) : (
              ""
            )}
            <p className="iconText">{leftIcon.text}</p>
          </div>
          <div className="bookmarkButton">
            <FontAwesomeIcon
              onClick={updateBookmark}
              icon={bookmarkIcon.icon}
              style={{ color: bookmarkIcon.color }}
              size="lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
