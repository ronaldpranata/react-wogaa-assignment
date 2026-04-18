import { render, screen, fireEvent } from "@testing-library/react";
import { Chip } from "./Chip";

describe("Chip Component", () => {
  it("renders the chipValue as its label", () => {
    render(<Chip active={false} chipValue={3} onClick={jest.fn()} />);
    expect(screen.getByRole("button")).toHaveTextContent("3");
  });

  it("renders null chipValue without crashing", () => {
    render(<Chip active={false} chipValue={null} onClick={jest.fn()} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("triggers onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Chip active={false} chipValue={1} onClick={handleClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies an active class when active is true", () => {
    render(<Chip active={true} chipValue={2} onClick={jest.fn()} />);
    // identity-obj-proxy returns class names as strings
    expect(screen.getByRole("button").className).toMatch(/active/);
  });

  it("does not apply active class when active is false", () => {
    render(<Chip active={false} chipValue={2} onClick={jest.fn()} />);
    expect(screen.getByRole("button").className).not.toMatch(/active/);
  });

  it("is disabled when disabled prop is true", () => {
    render(<Chip active={false} chipValue={4} onClick={jest.fn()} disabled={true} />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("does not fire onClick when disabled", () => {
    const handleClick = jest.fn();
    render(<Chip active={false} chipValue={4} onClick={handleClick} disabled={true} />);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("applies disabled class when disabled is true", () => {
    render(<Chip active={false} chipValue={5} onClick={jest.fn()} disabled={true} />);
    expect(screen.getByRole("button").className).toMatch(/disabled/);
  });
});
