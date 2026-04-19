import { renderHook } from "@testing-library/react";
import { useSentiments } from "./useSentiments";
import { SentimentProvider } from "../context/SentimentContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

describe("useSentiments hook", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const createWrapper = () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });
    return ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>
        <SentimentProvider>{children}</SentimentProvider>
      </QueryClientProvider>
    );
  };

  it("throws an error when used outside of SentimentProvider", () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() => renderHook(() => useSentiments())).toThrow(
      "useSentiment must be used within a SentimentProvider",
    );

    consoleSpy.mockRestore();
  });

  it("returns sentiments array when inside SentimentProvider", () => {
    const { result } = renderHook(() => useSentiments(), {
      wrapper: createWrapper(),
    });
    expect(Array.isArray(result.current.sentiments)).toBe(true);
  });

  it("returns summaryStats object when inside SentimentProvider", () => {
    const { result } = renderHook(() => useSentiments(), {
      wrapper: createWrapper(),
    });
    expect(result.current.summaryStats).toHaveProperty("totalSentiments");
    expect(result.current.summaryStats).toHaveProperty("averageRating");
  });

  it("returns addSentiment function when inside SentimentProvider", () => {
    const { result } = renderHook(() => useSentiments(), {
      wrapper: createWrapper(),
    });
    expect(typeof result.current.addSentiment).toBe("function");
  });
});
