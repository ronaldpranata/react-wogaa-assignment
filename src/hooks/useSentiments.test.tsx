import { renderHook } from "@testing-library/react";
import { useSentiments } from "./useSentiments";
import { SentimentProvider } from "../context/SentimentContext";
import React from "react";

describe("useSentiments hook", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("throws an error when used outside of SentimentProvider", () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() => renderHook(() => useSentiments())).toThrow(
      "useSentiment must be used within a SentimentProvider"
    );

    consoleSpy.mockRestore();
  });

  it("returns sentiments array when inside SentimentProvider", () => {
    const { result } = renderHook(() => useSentiments(), {
      wrapper: ({ children }) => (
        <SentimentProvider>{children}</SentimentProvider>
      ),
    });
    expect(Array.isArray(result.current.sentiments)).toBe(true);
  });

  it("returns summaryStats object when inside SentimentProvider", () => {
    const { result } = renderHook(() => useSentiments(), {
      wrapper: ({ children }) => (
        <SentimentProvider>{children}</SentimentProvider>
      ),
    });
    expect(result.current.summaryStats).toHaveProperty("totalSentiments");
    expect(result.current.summaryStats).toHaveProperty("averageRating");
  });

  it("returns addSentiment function when inside SentimentProvider", () => {
    const { result } = renderHook(() => useSentiments(), {
      wrapper: ({ children }) => (
        <SentimentProvider>{children}</SentimentProvider>
      ),
    });
    expect(typeof result.current.addSentiment).toBe("function");
  });
});
