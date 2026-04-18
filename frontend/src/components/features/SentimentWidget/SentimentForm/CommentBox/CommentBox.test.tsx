import { render, screen, fireEvent } from "@testing-library/react";
import { CommentBox } from "./CommentBox";

describe("CommentBox Component", () => {
  it("renders a textarea element", () => {
    render(<CommentBox inputText="" onInputChange={jest.fn()} />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("displays the provided inputText value", () => {
    render(<CommentBox inputText="Hello world" onInputChange={jest.fn()} />);
    expect(screen.getByRole("textbox")).toHaveValue("Hello world");
  });

  it("shows the placeholder text", () => {
    render(
      <CommentBox
        inputText=""
        onInputChange={jest.fn()}
        placeholder="Enter your comment..."
      />
    );
    expect(
      screen.getByPlaceholderText("Enter your comment...")
    ).toBeInTheDocument();
  });

  it("calls onInputChange with the new value when typing", () => {
    const handleChange = jest.fn();
    render(<CommentBox inputText="" onInputChange={handleChange} />);

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "New text" },
    });
    expect(handleChange).toHaveBeenCalledWith("New text");
  });

  it("is disabled when the disabled prop is true", () => {
    render(
      <CommentBox inputText="" onInputChange={jest.fn()} disabled={true} />
    );
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("is enabled by default when disabled prop is not passed", () => {
    render(<CommentBox inputText="" onInputChange={jest.fn()} />);
    expect(screen.getByRole("textbox")).not.toBeDisabled();
  });
});
