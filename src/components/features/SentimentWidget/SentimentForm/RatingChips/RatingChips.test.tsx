import { render, screen, fireEvent } from "@testing-library/react";
import { RatingChips } from "./RatingChips";

describe("RatingChips Component", () => {
  it("renders 5 chips by default", () => {
    render(<RatingChips onRatingChange={jest.fn()} />);
    const chips = screen.getAllByRole("button");
    expect(chips).toHaveLength(5);
  });

  it("renders chips labelled 1 through 5 by default", () => {
    render(<RatingChips onRatingChange={jest.fn()} />);
    [1, 2, 3, 4, 5].forEach((value) => {
      expect(screen.getByText(String(value))).toBeInTheDocument();
    });
  });

  it("renders a custom ratings array", () => {
    render(<RatingChips ratings={[1, 2, 3]} onRatingChange={jest.fn()} />);
    expect(screen.getAllByRole("button")).toHaveLength(3);
    [1, 2, 3].forEach((value) => {
      expect(screen.getByText(String(value))).toBeInTheDocument();
    });
  });

  it("calls onRatingChange with the chip value when an unselected chip is clicked", () => {
    const handleChange = jest.fn();
    render(
      <RatingChips currentRating={null} onRatingChange={handleChange} />
    );
    fireEvent.click(screen.getByText("3"));
    expect(handleChange).toHaveBeenCalledWith(3);
  });

  it("calls onRatingChange with null when clicking the already-active chip (deselect)", () => {
    const handleChange = jest.fn();
    render(
      <RatingChips currentRating={3} onRatingChange={handleChange} />
    );
    // Click the chip that is currently selected
    fireEvent.click(screen.getByText("3"));
    expect(handleChange).toHaveBeenCalledWith(null);
  });

  it("does not call onRatingChange when the chips are disabled", () => {
    const handleChange = jest.fn();
    render(
      <RatingChips
        currentRating={null}
        onRatingChange={handleChange}
        disabled={true}
      />
    );
    fireEvent.click(screen.getByText("1"));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("disables all chips when disabled prop is true", () => {
    render(<RatingChips disabled={true} onRatingChange={jest.fn()} />);
    const chips = screen.getAllByRole("button");
    chips.forEach((chip) => expect(chip).toBeDisabled());
  });
});
