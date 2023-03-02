import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Header, Footer } from "./components";
import {
  ERROR_ROUTE,
  EVENT_DETAILS,
  HOME_ROUTE,
  NOT_FOUND_ROUTE,
} from "./constants/routes";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ErrorPage, HomePage, NotFoundPage, EventDetailsPage } from "./pages";

function App() {
  return (
    <div className="appContainer">
      <ThemeProvider>
        <BrowserRouter>
          <Header />
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
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
