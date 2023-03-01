import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Header } from "./components";
import {
  ERROR_ROUTE,
  EVENT_DETAILS,
  HOME_ROUTE,
  NOT_FOUND_ROUTE,
} from "./constants/routes";
import { ErrorPage, HomePage, NotFoundPage, EventDetailsPage } from "./pages";

/*
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
<FontAwesomeIcon icon="fa-solid fa-filter" />
<FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
<FontAwesomeIcon icon="fa-solid fa-chevron-up" />
<FontAwesomeIcon icon="fa-solid fa-circle-dot" />
<FontAwesomeIcon icon="fa-regular fa-circle" />
<FontAwesomeIcon icon="fa-solid fa-circle-check" />
<FontAwesomeIcon icon="fa-solid fa-bookmark" />
<FontAwesomeIcon icon="fa-regular fa-bookmark" />
<FontAwesomeIcon icon="fa-solid fa-circle-xmark" /> */

function App() {
  return (
    <div className="appContainer">
      <Header />
      <div className="appBodyContainer">
        <BrowserRouter>
          <Routes>
            <Route path={HOME_ROUTE} element={<HomePage />} />
            <Route
              path={`${EVENT_DETAILS}/:id`}
              element={<EventDetailsPage />}
            />
            <Route
              path={`${ERROR_ROUTE}/:errorCode?`}
              element={<ErrorPage />}
            />
            <Route path={NOT_FOUND_ROUTE} element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
