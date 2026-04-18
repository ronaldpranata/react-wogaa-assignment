import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { SentimentForm } from "./SentimentForm";
import { SentimentProvider } from "../../../../context/SentimentContext";
import { ThemeProvider } from "../../../../context/ThemeContext";

// SentimentForm calls window.alert on submit — mock it globally for this suite
beforeAll(() => {
  jest.spyOn(window, "alert").mockImplementation(() => {});
});

beforeEach(() => {
  // Reset alert mock call count between tests
  (window.alert as jest.Mock).mockClear();
  localStorage.clear();
});

afterAll(() => {
  (window.alert as jest.Mock).mockRestore();
});

// Helper: wraps SentimentForm in the required context providers
const renderForm = () =>
  render(
    <ThemeProvider>
      <SentimentProvider>
        <SentimentForm />
      </SentimentProvider>
    </ThemeProvider>
  );

describe("SentimentForm Component", () => {
  it("renders RatingChips (1-5 buttons)", () => {
    renderForm();
    const chips = screen.getAllByRole("button").filter((btn) =>
      ["1", "2", "3", "4", "5"].includes(btn.textContent ?? "")
    );
    expect(chips).toHaveLength(5);
  });

  it("renders the CommentBox textarea", () => {
    renderForm();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders the Submit button", () => {
    renderForm();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("Submit button is disabled when no rating and no comment", () => {
    renderForm();
    expect(screen.getByRole("button", { name: /submit/i })).toBeDisabled();
  });

  it("Submit button is disabled when a rating is selected but no comment", () => {
    renderForm();
    fireEvent.click(screen.getByText("3"));
    expect(screen.getByRole("button", { name: /submit/i })).toBeDisabled();
  });

  it("Submit button is disabled when a comment is entered but no rating selected", () => {
    renderForm();
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Great experience!" },
    });
    expect(screen.getByRole("button", { name: /submit/i })).toBeDisabled();
  });

  it("Submit button is enabled when both a rating and a non-empty comment are provided", () => {
    renderForm();
    fireEvent.click(screen.getByText("4"));
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Excellent!" },
    });
    expect(
      screen.getByRole("button", { name: /submit/i })
    ).not.toBeDisabled();
  });

  it("shows an alert on successful submission", async () => {
    renderForm();
    fireEvent.click(screen.getByText("5"));
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Perfect!" },
    });
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    });
    expect(window.alert).toHaveBeenCalledWith("Thank you for your feedback.");
  });

  it("clears the comment field after submission", async () => {
    renderForm();
    fireEvent.click(screen.getByText("5"));
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Cleared after submit" },
    });
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    });
    await waitFor(() =>
      expect(screen.getByRole("textbox")).toHaveValue("")
    );
  });

  it("disables all inputs briefly after submission (locked state)", async () => {
    jest.useFakeTimers();
    renderForm();
    fireEvent.click(screen.getByText("3"));
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Locked test" },
    });
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    });

    // Immediately after submit, the form is locked
    expect(screen.getByRole("textbox")).toBeDisabled();

    // After the 3-second lock lifts, it should be re-enabled
    await act(async () => {
      jest.advanceTimersByTime(3000);
    });
    expect(screen.getByRole("textbox")).not.toBeDisabled();
    jest.useRealTimers();
  });
});
