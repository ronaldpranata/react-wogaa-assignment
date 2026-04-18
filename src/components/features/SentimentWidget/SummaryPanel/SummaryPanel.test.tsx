import React from "react";
import { render, screen } from "@testing-library/react";
import { SummaryPanel } from "./SummaryPanel";
import { SentimentContext } from "../../../../context/SentimentContext";
import type { SentimentContextType } from "../../../../types/sentiment";

// Helper to build a fake SentimentContext value
const makeMockContext = (
  overrides: Partial<SentimentContextType>
): SentimentContextType => ({
  sentiments: [],
  summaryStats: { totalSentiments: 0, averageRating: 0 },
  addSentiment: jest.fn(),
  ...overrides,
});

const renderPanel = (contextValue: SentimentContextType) =>
  render(
    <SentimentContext.Provider value={contextValue}>
      <SummaryPanel />
    </SentimentContext.Provider>
  );

describe("SummaryPanel Component", () => {
  it("renders the 'Summary' heading", () => {
    renderPanel(makeMockContext({}));
    expect(screen.getByRole("heading", { name: /summary/i })).toBeInTheDocument();
  });

  it("displays the total number of submissions", () => {
    renderPanel(
      makeMockContext({
        summaryStats: { totalSentiments: 7, averageRating: 3.5 },
      })
    );
    expect(screen.getByText(/total submissions:\s*7/i)).toBeInTheDocument();
  });

  it("displays the average rating", () => {
    renderPanel(
      makeMockContext({
        summaryStats: { totalSentiments: 2, averageRating: 4.5 },
      })
    );
    expect(screen.getByText(/average rating:\s*4\.5/i)).toBeInTheDocument();
  });

  it("lists the last 3 sentiment comments (sorted most recent first)", () => {
    const sentiments = [
      { id: "1", rating: 3, comment: "Oldest comment", createdAt: "2024-01-01T10:00:00Z" },
      { id: "2", rating: 4, comment: "Middle comment", createdAt: "2024-01-02T10:00:00Z" },
      { id: "3", rating: 5, comment: "Newest comment", createdAt: "2024-01-03T10:00:00Z" },
      { id: "4", rating: 2, comment: "Even newer comment", createdAt: "2024-01-04T10:00:00Z" },
    ];
    renderPanel(
      makeMockContext({
        sentiments,
        summaryStats: { totalSentiments: 4, averageRating: 3.5 },
      })
    );

    // Only last 3 (by date descending) should appear
    expect(screen.getByText("Even newer comment")).toBeInTheDocument();
    expect(screen.getByText("Newest comment")).toBeInTheDocument();
    expect(screen.getByText("Middle comment")).toBeInTheDocument();
    expect(screen.queryByText("Oldest comment")).not.toBeInTheDocument();
  });

  it("renders an empty list when there are no sentiments", () => {
    renderPanel(makeMockContext({ sentiments: [] }));
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });
});
