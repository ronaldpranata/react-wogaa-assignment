import { render, screen } from "@testing-library/react";
import { SubmitButton } from "./SubmitButton";

describe("SubmitButton Component", () => {
  it("renders a button with the label 'Submit'", () => {
    render(<SubmitButton />);
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("renders a button of type 'submit'", () => {
    render(<SubmitButton />);
    expect(screen.getByRole("button", { name: /submit/i })).toHaveAttribute(
      "type",
      "submit"
    );
  });

  it("is disabled when the disabled prop is true", () => {
    render(<SubmitButton disabled={true} />);
    expect(screen.getByRole("button", { name: /submit/i })).toBeDisabled();
  });

  it("is enabled when the disabled prop is false", () => {
    render(<SubmitButton disabled={false} />);
    expect(
      screen.getByRole("button", { name: /submit/i })
    ).not.toBeDisabled();
  });

  it("is enabled by default when disabled prop is omitted", () => {
    render(<SubmitButton />);
    expect(
      screen.getByRole("button", { name: /submit/i })
    ).not.toBeDisabled();
  });
});
