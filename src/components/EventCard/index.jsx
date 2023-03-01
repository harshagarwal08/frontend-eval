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
import formatTime from "../../utils/commons/formatTime";

function EventCard({ eventDetails }) {
  const [isRegistered] = useState(eventDetails.isRegistered);
  const [isBookmarked] = useState(eventDetails.isBookmarked);
  const [areSeatsAvailable] = useState(eventDetails.areSeatsAvailable);
  const noSeats = !areSeatsAvailable
    ? { icon: faCircleXmark, color: "#ECECAB" }
    : "";
  const leftIcon = isRegistered
    ? { icon: faCircleCheck, color: "#A0F3AD" }
    : noSeats;
  const bookmarkIcon = isBookmarked
    ? { icon: faBookmarked, color: "#EA8282" }
    : { icon: faBookmark, color: "#EA8282" };
  const dateTime = formatTime(eventDetails.datetime, eventDetails.timezone);
  return (
    <div className="cardContainer">
      <div className="cardImage">
        <img src={eventDetails.imgUrl} alt="eventImage" />
      </div>
      <div className="content">
        <div className="title">{eventDetails.name}</div>
        <div className="desc">{eventDetails.description}</div>
        <div className="details">
          <p>{eventDetails.venue}</p>
          <p>{dateTime}</p>
        </div>
        <div className="options">
          <div className="leftButton">
            <FontAwesomeIcon
              icon={leftIcon.icon}
              style={{ color: leftIcon.color }}
            />
            <p>ss</p>
          </div>
          <div className="bookmarkButton">
            <FontAwesomeIcon
              icon={bookmarkIcon.icon}
              style={{ color: bookmarkIcon.color }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
