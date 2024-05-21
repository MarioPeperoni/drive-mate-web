import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import React from "react";
import HomePage from "../app/(page)/page";

jest.mock("next/navigation", () => {
  return {
    __esModule: true,
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    }),
    useSearchParams: () => ({
      get: () => {},
      has: () => {},
    }),
  };
});

describe("Home Page Rendering", () => {
  it("should render the ride records list", () => {
    render(<HomePage />);

    const rideRecordsList = screen.getByTestId("ride-records-list");
    expect(rideRecordsList).toBeInTheDocument();
  });

  it("should render the search card", () => {
    render(<HomePage />);

    const searchCard = screen.getByTestId("search-card");
    expect(searchCard).toBeInTheDocument();
  });
});
