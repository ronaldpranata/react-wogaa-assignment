import { render, screen, fireEvent } from "@testing-library/react";
import { Chip } from "./Chip";

describe("Chips Component", () => {
  it("triggers onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Chip active={false} chipValue={0} onClick={handleClick} />);

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
