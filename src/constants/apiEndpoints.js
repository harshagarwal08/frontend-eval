export const BACKEND_URL = "http://localhost:8080/api/";

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
