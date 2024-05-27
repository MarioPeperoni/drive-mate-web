import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom";

import CardRecordsList from "@/components/ride-records/RideRecordsList";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import "jest-location-mock";

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
}));

jest.mock("next/image", () => {
  return {
    __esModule: true,
    default: () => {
      return <img />;
    },
  };
});

jest.mock("next/link", () => {
  return {
    __esModule: true,
    default: ({ children, href }: any) => {
      return <a onClick={() => window.location.assign(href)}>{children}</a>;
    },
  };
});

let mockAxios: MockAdapter;

beforeEach(() => {
  mockAxios = new MockAdapter(axios);
});

afterEach(() => {
  mockAxios.reset();
});

describe("Ride Records", () => {
  beforeEach(() => {
    jest
      .spyOn(require("next/navigation"), "useSearchParams")
      .mockImplementation(() => ({
        get: jest.fn(),
        has: jest.fn().mockReturnValue(false),
      }));
  });

  describe("Render", () => {
    it("should render the ride records list", async () => {
      mockAxios.onGet("http://localhost:5103/api/rides").reply(200, []);

      render(<CardRecordsList />);
      const rideRecordsList = screen.getByTestId("ride-records-list");
      expect(rideRecordsList).toBeInTheDocument();

      await waitForElementToBeRemoved(screen.getByTestId("loading-skeleton"));
    });

    it("should render the loading skeleton when fetching rides", async () => {
      mockAxios.onGet("http://localhost:5103/api/rides").reply(200, []);

      render(<CardRecordsList />);
      const loadingSkeleton = screen.getByTestId("loading-skeleton");
      expect(loadingSkeleton).toBeInTheDocument();

      await waitForElementToBeRemoved(screen.getByTestId("loading-skeleton"));
    });

    it("should render no rides found message when no rides are found", async () => {
      mockAxios.onGet("http://localhost:5103/api/rides").reply(200, []);

      render(<CardRecordsList />);
      await waitForElementToBeRemoved(screen.getByTestId("loading-skeleton"));

      const noRidesFound = screen.getByText("No rides found");
      expect(noRidesFound).toBeInTheDocument();
    });

    it("should render the search card if rides are found", async () => {
      const rides = [
        {
          id: 1,
          from: "City A",
          to: "City B",
          userId: 1,
          driver: {
            id: 1,
            clerkId: "clerk123",
            email: "driver1@example.com",
            firstName: "Driver",
            lastName: "One",
            username: "driver1",
            imageUrl: "https://i.pravatar.cc/300",
            createdAt: new Date(),
            ridesAsDriver: [],
            ridesAsPassenger: [],
          },
          passengers: [],
          startDate: new Date(),
          endDate: new Date(),
          price: 100,
          seats: 4,
          car: "Car Model 1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockAxios.onGet("http://localhost:5103/api/rides").reply(200, rides);

      render(<CardRecordsList />);

      await waitFor(() => {
        const searchCard = screen.getByTestId("ride-record-card");
        expect(searchCard).toBeInTheDocument();
      });
    });
  });

  describe("Interactions", () => {
    it("should redirect to ride details if clicked", async () => {
      const rides = [
        {
          id: 1,
          from: "City A",
          to: "City B",
          userId: 1,
          driver: {
            id: 1,
            clerkId: "clerk123",
            email: "driver1@example.com",
            firstName: "Driver",
            lastName: "One",
            username: "driver1",
            imageUrl: "https://i.pravatar.cc/300",
            createdAt: new Date(),
            ridesAsDriver: [],
            ridesAsPassenger: [],
          },
          passengers: [],
          startDate: new Date(),
          endDate: new Date(),
          price: 100,
          seats: 4,
          car: "Car Model 1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockAxios.onGet("http://localhost:5103/api/rides").reply(200, rides);

      render(<CardRecordsList />);

      await waitFor(() => {
        const rideCard = screen.getByText("City A");
        fireEvent.click(rideCard);
      });

      await waitFor(() => {
        expect(window.location.href).toBe("http://localhost/ride/1");
      });
    });

    it("should fetch rides based on search query", async () => {
      jest
        .spyOn(require("next/navigation"), "useSearchParams")
        .mockImplementation(() => ({
          get: jest.fn((key) => {
            switch (key) {
              case "from":
                return "CityA";
              case "to":
                return "CityB";
              case "startDate":
                return "2022-01-01T00:00:00.000Z";
              default:
                return null;
            }
          }),
          has: jest.fn().mockReturnValue(true),
        }));

      const rides = [
        {
          id: 1,
          from: "CityA",
          to: "CityB",
          userId: 1,
          driver: {
            id: 1,
            clerkId: "clerk123",
            email: "",
            firstName: "Driver",
            lastName: "One",
            username: "driver1",
            imageUrl: "https://i.pravatar.cc/300",
            createdAt: new Date(),
            ridesAsDriver: [],
            ridesAsPassenger: [],
          },
          passengers: [],
          startDate: new Date(),
          endDate: new Date(),
          price: 100,
          seats: 4,
          car: "Car Model 1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          from: "CityC",
          to: "CityD",
          userId: 1,
          driver: {
            id: 1,
            clerkId: "clerk123",
            email: "",
            firstName: "Driver",
            lastName: "One",
            username: "driver1",
            imageUrl: "https://i.pravatar.cc/300",
            createdAt: new Date(),
            ridesAsDriver: [],
            ridesAsPassenger: [],
          },
          passengers: [],
          startDate: new Date(),
          endDate: new Date(),
          price: 100,
          seats: 4,
          car: "Car Model 1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockAxios
        .onGet(
          "http://localhost:5103/api/rides/search?from=CityA&to=CityB&startDate=2022-01-01T00:00:00.000Z",
        )
        .reply(200, [rides[0]]);

      render(<CardRecordsList />);

      await waitFor(() => {
        const rideCard = screen.getByTestId("ride-record-card");

        expect(rideCard).toBeInTheDocument();
      });
    });
  });
});
