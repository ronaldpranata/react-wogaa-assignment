import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "./Header";
import { ThemeContext } from "../../../context/ThemeContext";
import type { ThemeContextType } from "../../../context/ThemeContext";

// Helper to render Header with a controlled theme context
const renderHeader = (contextValue: ThemeContextType) =>
  render(
    <ThemeContext.Provider value={contextValue}>
      <Header />
    </ThemeContext.Provider>
  );

describe("Header Component", () => {
  it("renders the app title 'Mini Sentiment Widget'", () => {
    renderHeader({ theme: "light", toggleTheme: jest.fn() });
    expect(
      screen.getByRole("heading", { name: /mini sentiment widget/i })
    ).toBeInTheDocument();
  });

  it("shows '🌙 Dark Mode' button when the current theme is light", () => {
    renderHeader({ theme: "light", toggleTheme: jest.fn() });
    expect(
      screen.getByRole("button", { name: /🌙 dark mode/i })
    ).toBeInTheDocument();
  });

  it("shows '☀️ Light Mode' button when the current theme is dark", () => {
    renderHeader({ theme: "dark", toggleTheme: jest.fn() });
    expect(
      screen.getByRole("button", { name: /☀️ light mode/i })
    ).toBeInTheDocument();
  });

  it("calls toggleTheme when the theme button is clicked", () => {
    const mockToggle = jest.fn();
    renderHeader({ theme: "light", toggleTheme: mockToggle });
    fireEvent.click(screen.getByRole("button", { name: /dark mode/i }));
    expect(mockToggle).toHaveBeenCalledTimes(1);
  });

  it("renders an accessible <header> landmark", () => {
    renderHeader({ theme: "light", toggleTheme: jest.fn() });
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });
});
