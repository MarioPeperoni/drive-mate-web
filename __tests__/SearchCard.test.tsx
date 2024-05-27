import SearchCard from "@/components/search/SearchCard";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { format } from "date-fns";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    push: mockPush,
  })),
  useSearchParams: jest.fn().mockImplementation(() => ({
    get: jest.fn(),
    has: jest.fn(),
  })),
}));

describe("Search card", () => {
  describe("Render", () => {
    it("should render search card", () => {
      render(<SearchCard />);

      const searchCard = screen.getByTestId("search-card");
      expect(searchCard).toBeInTheDocument();
    });

    it("should have two input fields with correct placeholders", () => {
      render(<SearchCard />);

      const inputItems = screen.getAllByRole("textbox");

      expect(inputItems).toHaveLength(2);

      const [startingFromInput, goingToInput] = inputItems;
      expect(startingFromInput).toHaveAttribute(
        "placeholder",
        "I'm starting from...",
      );
      expect(goingToInput).toHaveAttribute("placeholder", "I'm going to...");
    });

    it("should have date picker button", () => {
      const today = format(new Date(), "PPP");
      render(<SearchCard />);

      const datePickerButton = screen.getByRole("button", { name: today });
      expect(datePickerButton).toBeInTheDocument();
    });
  });

  describe("Interaction", () => {
    it("should display popover with calendar if date picker is clicked", () => {
      const today = format(new Date(), "PPP");
      render(<SearchCard />);

      const datePickerButton = screen.getByRole("button", { name: today });

      fireEvent.click(datePickerButton);

      const calendarPopover = screen.getByRole("dialog");
      expect(calendarPopover).toBeInTheDocument();
    });

    it("should focus the second input field if the first is filled and the form is submitted", async () => {
      render(<SearchCard />);

      const startingFromInput = screen.getByPlaceholderText(
        "I'm starting from...",
      );
      const goingToInput = screen.getByPlaceholderText("I'm going to...");
      const submitButton = screen.getByRole("button", { name: /search/i });

      // Fill the first input field
      fireEvent.change(startingFromInput, { target: { value: "New York" } });

      // Submit the form
      fireEvent.click(submitButton);

      // Wait for the second input field to be focused
      await waitFor(() => expect(goingToInput).toHaveFocus());
    });

    it("should focus the first input field if the second is filled and the form is submitted", async () => {
      render(<SearchCard />);

      const startingFromInput = screen.getByPlaceholderText(
        "I'm starting from...",
      );
      const goingToInput = screen.getByPlaceholderText("I'm going to...");
      const submitButton = screen.getByRole("button", { name: /search/i });

      // Fill the second input field
      fireEvent.change(goingToInput, { target: { value: "Los Angeles" } });

      // Submit the form
      fireEvent.click(submitButton);

      // Wait for the first input field to be focused
      await waitFor(() => expect(startingFromInput).toHaveFocus());
    });

    it("should push the correct search query to the router when the form is submitted", async () => {
      render(<SearchCard />);

      const startingFromInput = screen.getByPlaceholderText(
        "I'm starting from...",
      );
      const goingToInput = screen.getByPlaceholderText("I'm going to...");
      const submitButton = screen.getByRole("button", { name: /search/i });

      // Fill the input fields
      fireEvent.change(startingFromInput, { target: { value: "New York" } });
      fireEvent.change(goingToInput, { target: { value: "Los Angeles" } });

      // Submit the form
      fireEvent.click(submitButton);

      // Add one day to the date
      const startDate = new Date();
      startDate.setDate(startDate.getDate() + 1);
      let formattedStartDate = startDate.toISOString();
      formattedStartDate = formattedStartDate.slice(0, 10) + "T00:00:00Z";

      // Wait for the router to be called with the correct query
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith(
          `/?from=New York&to=Los Angeles&startDate=${formattedStartDate}`,
        );
      });
    });
  });
});
