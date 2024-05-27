import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom";

import React from "react";
import HomePage from "../app/(page)/page";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";

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

let mockAxios: MockAdapter;

beforeEach(() => {
  mockAxios = new MockAdapter(axios);
});

afterEach(() => {
  mockAxios.reset();
});

describe("Home Page", () => {
  describe("Render", () => {
    it("should render the ride records list", async () => {
      mockAxios.onGet("http://localhost:5103/api/rides").reply(200, []);

      render(<HomePage />);

      const rideRecordsList = screen.getByTestId("ride-records-list");
      expect(rideRecordsList).toBeInTheDocument();
      await waitForElementToBeRemoved(screen.getByTestId("loading-skeleton"));
    });

    it("should render the search card", async () => {
      mockAxios.onGet("http://localhost:5103/api/rides").reply(200, []);

      render(<HomePage />);

      const searchCard = screen.getByTestId("search-card");
      expect(searchCard).toBeInTheDocument();
      await waitForElementToBeRemoved(screen.getByTestId("loading-skeleton"));
    });
  });
});
