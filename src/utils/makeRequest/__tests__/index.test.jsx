import axios from "axios";
import makeRequest from "..";
import BACKEND_URL from "../../../constants/apiEndpoints";
import { ERROR_ROUTE } from "../../../constants/routes";

jest.mock("axios");

describe("makeRequest", () => {
  const mockedAxios = axios;
  const mockNavigate = jest.fn();
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should make API call with appropriate request options and return response body when only endpoint is specified", async () => {
    mockedAxios.mockResolvedValueOnce({
      data: mockSongsData,
    });
    expect(mockedAxios).not.toHaveBeenCalled();
    const response = await makeRequest(RECORDS_URL, mockNavigate);
    expect(mockedAxios).toHaveBeenCalledTimes(1);
    expect(mockedAxios).toHaveBeenCalledWith({
      baseURL: BACKEND_URL,
      url: RECORDS_URL.url,
      method: "get",
      headers: {
        authorization: `Bearer ${AUTHORIZATION_TOKEN}`,
      },
    });
    expect(response).toEqual(mockSongsData);
  });
  it("should make API call with appropriate request options and return response body when both endpoint and request body are specified", async () => {
    mockedAxios.mockResolvedValueOnce({
      data: {
        like: true,
        count: 1,
      },
    });
    expect(mockedAxios).not.toHaveBeenCalled();
    const response = await makeRequest(UPDATE_LIKES_URL(1), mockNavigate, {
      data: {
        like: true,
        count: 1,
      },
    });
    expect(mockedAxios).toHaveBeenCalledTimes(1);
    expect(mockedAxios).toHaveBeenCalledWith({
      baseURL: BACKEND_URL,
      url: UPDATE_LIKES_URL(1).url,
      method: "patch",
      headers: {
        authorization: `Bearer ${AUTHORIZATION_TOKEN}`,
      },
      data: {
        like: true,
        count: 1,
      },
    });
    expect(response).toEqual({
      like: true,
      count: 1,
    });
  });
  it("should navigate to error page with status code when API call returns error status code", async () => {
    mockedAxios.mockRejectedValueOnce({ response: { status: 500 } });
    expect(mockNavigate).not.toBeCalled();
    await makeRequest(UPDATE_LIKES_URL(1), mockNavigate, {
      data: {
        like: true,
        count: 1,
      },
    });
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(`${ERROR_ROUTE}/500`);
  });
  it("should navigate to error page without status code when API call returns error without status code", async () => {
    mockedAxios.mockRejectedValueOnce({});
    expect(mockNavigate).not.toBeCalled();
    await makeRequest(UPDATE_LIKES_URL(1), mockNavigate, {
      data: {
        like: true,
        count: 1,
      },
    });
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(ERROR_ROUTE);
  });
});
