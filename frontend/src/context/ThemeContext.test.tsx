import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider, ThemeContext } from "./ThemeContext";
import { useContext } from "react";

// A helper consumer component to surface context values in the DOM
const ThemeConsumer: React.FC = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) return <span>no context</span>;
  return (
    <div>
      <span data-testid="theme">{ctx.theme}</span>
      <button onClick={ctx.toggleTheme}>Toggle</button>
    </div>
  );
};

describe("ThemeContext", () => {
  it("provides 'light' as the initial theme", () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );
    expect(screen.getByTestId("theme")).toHaveTextContent("light");
  });

  it("toggleTheme switches from light to dark", () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );
    fireEvent.click(screen.getByRole("button", { name: /toggle/i }));
    expect(screen.getByTestId("theme")).toHaveTextContent("dark");
  });

  it("toggleTheme switches back from dark to light", () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );
    fireEvent.click(screen.getByRole("button", { name: /toggle/i }));
    fireEvent.click(screen.getByRole("button", { name: /toggle/i }));
    expect(screen.getByTestId("theme")).toHaveTextContent("light");
  });

  it("sets data-theme attribute on <html> when theme changes", () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    fireEvent.click(screen.getByRole("button", { name: /toggle/i }));
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });
});
