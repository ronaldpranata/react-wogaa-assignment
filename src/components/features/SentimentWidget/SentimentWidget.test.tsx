import React from "react";
import { render, screen } from "@testing-library/react";
import { SentimentWidget } from "./SentimentWidget";
import { SentimentContext } from "../../../context/SentimentContext";
import { ThemeProvider } from "../../../context/ThemeContext";
import type { SentimentContextType } from "../../../types/sentiment";

beforeAll(() => {
  jest.spyOn(window, "alert").mockImplementation(() => {});
});

afterAll(() => {
  (window.alert as jest.Mock).mockRestore();
});

const makeMockContext = (
  overrides: Partial<SentimentContextType>
): SentimentContextType => ({
  sentiments: [],
  summaryStats: { totalSentiments: 0, averageRating: 0 },
  addSentiment: jest.fn(),
  ...overrides,
});

const renderWidget = (contextValue: SentimentContextType) =>
  render(
    <ThemeProvider>
      <SentimentContext.Provider value={contextValue}>
        <SentimentWidget />
      </SentimentContext.Provider>
    </ThemeProvider>
  );

describe("SentimentWidget Component", () => {
  it("always renders the SentimentForm (textarea is present)", () => {
    renderWidget(makeMockContext({}));
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("does NOT render the SummaryPanel when there are no sentiments", () => {
    renderWidget(
      makeMockContext({ summaryStats: { totalSentiments: 0, averageRating: 0 } })
    );
    expect(screen.queryByRole("heading", { name: /summary/i })).not.toBeInTheDocument();
  });

  it("renders the SummaryPanel when there is at least one sentiment", () => {
    renderWidget(
      makeMockContext({
        sentiments: [
          {
            id: "abc",
            rating: 5,
            comment: "Great!",
            createdAt: new Date().toISOString(),
          },
        ],
        summaryStats: { totalSentiments: 1, averageRating: 5 },
      })
    );
    expect(screen.getByRole("heading", { name: /summary/i })).toBeInTheDocument();
  });
});
