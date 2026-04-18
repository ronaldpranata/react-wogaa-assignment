import { renderHook } from "@testing-library/react";
import { useTheme } from "./useTheme";
import { ThemeProvider } from "../context/ThemeContext";
import React from "react";

describe("useTheme hook", () => {
  it("throws an error when used outside of ThemeProvider", () => {
    // Suppress the expected error output in console
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() => renderHook(() => useTheme())).toThrow(
      "useTheme must be used within a ThemeProvider"
    );

    consoleSpy.mockRestore();
  });

  it("returns the current theme when inside ThemeProvider", () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
    });
    expect(result.current.theme).toBe("light");
  });

  it("returns a toggleTheme function when inside ThemeProvider", () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
    });
    expect(typeof result.current.toggleTheme).toBe("function");
  });
});
