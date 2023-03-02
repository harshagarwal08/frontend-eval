export const BACKEND_URL = "http://localhost:8000/api/";

export const GET_ALL_EVENTS = {
  url: "events",
  method: "get",
};

export const GET_EVENT_BY_ID = (id) => {
  return {
    url: `events/${id}`,
    method: "get",
  };
};

export const UPDATE_EVENT = (id) => {
  return {
    url: `events/${id}`,
    method: "patch",
  };
};

export const GET_ALL_THEMES = {
  url: "themes",
  method: "get",
};

export const SAVE_THEME = {
  url: "themes",
  method: "put",
};
