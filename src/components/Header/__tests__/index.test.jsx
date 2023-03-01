import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import Header from "..";
import { HOME_ROUTE } from "../../../constants/routes";

const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  useNavigate: () => mockedNavigate,
}));

describe("Header", () => {
  it("should show the header text when the component is rendered", () => {
    render(<Header />);
    expect(screen.getByTestId("records-header-text")).toBeTruthy();
  });
  it("should navigate to the Homepage when logo is clicked", () => {
    render(<Header />);
    expect(mockedNavigate).toBeCalledTimes(0);
    fireEvent.click(screen.getByTestId("records-header-text"));
    expect(mockedNavigate).toBeCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith(HOME_ROUTE);
  });
});
