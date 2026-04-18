import React, { useContext } from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { SentimentProvider, SentimentContext } from "./SentimentContext";

// --- Helper consumer ---
const SentimentConsumer: React.FC = () => {
  const ctx = useContext(SentimentContext);
  if (!ctx) return <span>no context</span>;
  return (
    <div>
      <span data-testid="total">{ctx.summaryStats.totalSentiments}</span>
      <span data-testid="average">{ctx.summaryStats.averageRating}</span>
      <ul>
        {ctx.sentiments.map((s) => (
          <li key={s.id} data-testid="sentiment-item">
            {s.comment}
          </li>
        ))}
      </ul>
      <button
        onClick={() => ctx.addSentiment(4, "Test comment")}
        data-testid="add-btn"
      >
        Add
      </button>
    </div>
  );
};

const renderProvider = () =>
  render(
    <SentimentProvider>
      <SentimentConsumer />
    </SentimentProvider>
  );

describe("SentimentContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("provides an empty sentiments array initially", () => {
    renderProvider();
    expect(screen.queryAllByTestId("sentiment-item")).toHaveLength(0);
  });

  it("provides totalSentiments of 0 initially", () => {
    renderProvider();
    expect(screen.getByTestId("total")).toHaveTextContent("0");
  });

  it("provides averageRating of 0 initially", () => {
    renderProvider();
    expect(screen.getByTestId("average")).toHaveTextContent("0");
  });

  it("addSentiment appends a new sentiment to the list", () => {
    renderProvider();
    fireEvent.click(screen.getByTestId("add-btn"));
    expect(screen.getAllByTestId("sentiment-item")).toHaveLength(1);
    expect(screen.getByTestId("sentiment-item")).toHaveTextContent(
      "Test comment"
    );
  });

  it("updates totalSentiments after adding a sentiment", () => {
    renderProvider();
    fireEvent.click(screen.getByTestId("add-btn"));
    expect(screen.getByTestId("total")).toHaveTextContent("1");
  });

  it("computes averageRating correctly after adding sentiments", () => {
    // Custom consumer that adds two different ratings
    const MultiAdder: React.FC = () => {
      const ctx = useContext(SentimentContext)!;
      return (
        <>
          <span data-testid="avg">{ctx.summaryStats.averageRating}</span>
          <button onClick={() => ctx.addSentiment(3, "First")}>Add 3</button>
          <button onClick={() => ctx.addSentiment(5, "Second")}>Add 5</button>
        </>
      );
    };
    render(
      <SentimentProvider>
        <MultiAdder />
      </SentimentProvider>
    );
    fireEvent.click(screen.getByText("Add 3"));
    fireEvent.click(screen.getByText("Add 5"));
    // Average of 3 and 5 = 4.0
    expect(screen.getByTestId("avg")).toHaveTextContent("4");
  });

  it("persists sentiments to localStorage when a sentiment is added", () => {
    renderProvider();
    fireEvent.click(screen.getByTestId("add-btn"));
    const stored = JSON.parse(localStorage.getItem("sentiments") ?? "[]");
    expect(stored).toHaveLength(1);
    expect(stored[0].comment).toBe("Test comment");
    expect(stored[0].rating).toBe(4);
  });

  it("loads sentiments from localStorage on mount (persistence)", () => {
    const initial = [
      {
        id: "seed-1",
        rating: 5,
        comment: "Seeded comment",
        createdAt: new Date().toISOString(),
      },
    ];
    localStorage.setItem("sentiments", JSON.stringify(initial));

    renderProvider();
    expect(screen.getByTestId("sentiment-item")).toHaveTextContent(
      "Seeded comment"
    );
  });
});
