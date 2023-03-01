import axios from "axios";
import makeRequest from "..";
import BACKEND_URL, {
  GET_ALL_EVENTS,
  UPDATE_EVENT,
} from "../../../constants/apiEndpoints";
import { ERROR_ROUTE } from "../../../constants/routes";

jest.mock("axios");

describe("makeRequest", () => {
  const mockedAxios = axios;
  const mockNavigate = jest.fn();
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should make API call with appropriate request options and return response body when only endpoint is specified", async () => {
    mockedAxios.mockResolvedValueOnce([
      {
        id: 1,
        name: "Battle of the Bands",
        description:
          "Get ready for Battle of the Bands, where the hottest up-and-coming rock groups will compete for the ultimate prize. With heart-pumping beats and electrifying performances, you won't want to miss this adrenaline-fueled event. Each band will bring their A-game, leaving everything on the stage for the chance to be crowned champion. Don't miss out on the most unforgettable rock competition of the year!",
        venue: "All Stars Arena, Las Vegas, NV, USA",
        datetime: "2023-03-01T05:00:00.000Z",
        timezone: "America/Los_Angeles",
        areSeatsAvailable: true,
        isRegistered: false,
        isBookmarked: false,
        imgUrl: "https://i.ibb.co/3zbdvWX/battle-of-bands.jpg",
      },
      {
        id: 2,
        name: "Cowboy Rodeo",
        description:
          "Hold on tight for the Cowboy Rodeo, where the best riders in the country will compete for the championship title. Witness heart-stopping events like bull riding, calf roping, and steer wrestling that showcase the strength and bravery of these incredible cowboys. With non-stop action and adrenaline-fueled excitement, the Cowboy Rodeo is the ultimate display of rodeo skills and cowboy grit. Don't miss out on this wild and exhilarating event!",
        venue: "BB Center, Dallas, TX, USA",
        datetime: "2023-03-02T03:00:00.000Z",
        timezone: "US/Central",
        areSeatsAvailable: false,
        isRegistered: false,
        isBookmarked: false,
        imgUrl:
          "https://thumbs.dreamstime.com/b/rodeo-cowboy-rough-ride-tossed-around-his-horse-red-bluff-california-april-63692080.jpg",
      },
    ]);
    expect(mockedAxios).not.toHaveBeenCalled();
    const response = await makeRequest(GET_ALL_EVENTS, mockNavigate);
    expect(mockedAxios).toHaveBeenCalledTimes(1);
    expect(mockedAxios).toHaveBeenCalledWith({
      baseURL: BACKEND_URL,
      url: GET_ALL_EVENTS.url,
      method: "get",
    });
    expect(response).toEqual([
      {
        id: 1,
        name: "Battle of the Bands",
        description:
          "Get ready for Battle of the Bands, where the hottest up-and-coming rock groups will compete for the ultimate prize. With heart-pumping beats and electrifying performances, you won't want to miss this adrenaline-fueled event. Each band will bring their A-game, leaving everything on the stage for the chance to be crowned champion. Don't miss out on the most unforgettable rock competition of the year!",
        venue: "All Stars Arena, Las Vegas, NV, USA",
        datetime: "2023-03-01T05:00:00.000Z",
        timezone: "America/Los_Angeles",
        areSeatsAvailable: true,
        isRegistered: false,
        isBookmarked: false,
        imgUrl: "https://i.ibb.co/3zbdvWX/battle-of-bands.jpg",
      },
      {
        id: 2,
        name: "Cowboy Rodeo",
        description:
          "Hold on tight for the Cowboy Rodeo, where the best riders in the country will compete for the championship title. Witness heart-stopping events like bull riding, calf roping, and steer wrestling that showcase the strength and bravery of these incredible cowboys. With non-stop action and adrenaline-fueled excitement, the Cowboy Rodeo is the ultimate display of rodeo skills and cowboy grit. Don't miss out on this wild and exhilarating event!",
        venue: "BB Center, Dallas, TX, USA",
        datetime: "2023-03-02T03:00:00.000Z",
        timezone: "US/Central",
        areSeatsAvailable: false,
        isRegistered: false,
        isBookmarked: false,
        imgUrl:
          "https://thumbs.dreamstime.com/b/rodeo-cowboy-rough-ride-tossed-around-his-horse-red-bluff-california-april-63692080.jpg",
      },
    ]);
  });
  it("should make API call with appropriate request options and return response body when both endpoint and request body are specified", async () => {
    mockedAxios.mockResolvedValueOnce({
      data: {
        like: true,
        count: 1,
      },
    });
    expect(mockedAxios).not.toHaveBeenCalled();
    await makeRequest(UPDATE_EVENT(1), mockNavigate, {
      data: {
        isBookmarked: true,
      },
    });
    expect(mockedAxios).toHaveBeenCalledTimes(1);
    expect(mockedAxios).toHaveBeenCalledWith({
      baseURL: BACKEND_URL,
      url: UPDATE_EVENT(1).url,
      method: "patch",
      data: {
        isBookmarked: true,
      },
    });
  });
  it("should navigate to error page with status code when API call returns error status code", async () => {
    mockedAxios.mockRejectedValueOnce({ response: { status: 500 } });
    expect(mockNavigate).not.toBeCalled();
    await makeRequest(UPDATE_EVENT(1), mockNavigate, {
      data: {
        isBookmarked: true,
      },
    });
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(`${ERROR_ROUTE}/500`);
  });
  it("should navigate to error page without status code when API call returns error without status code", async () => {
    mockedAxios.mockRejectedValueOnce({});
    expect(mockNavigate).not.toBeCalled();
    await makeRequest(UPDATE_EVENT(1), mockNavigate, {
      data: {
        isBookmarked: true,
      },
    });
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(ERROR_ROUTE);
  });
});
