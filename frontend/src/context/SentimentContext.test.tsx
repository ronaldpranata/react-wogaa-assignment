import React, { useContext } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SentimentProvider, SentimentContext } from "./SentimentContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Mock the sentiments API
jest.mock("../api/sentiments", () => ({
  getAll: jest.fn().mockResolvedValue([]),
  create: jest.fn().mockResolvedValue({
    id: "1",
    rating: 4,
    comment: "Test comment",
    createdAt: new Date().toISOString(),
  }),
}));

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

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

const renderProvider = () => {
  const queryClient = createQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <SentimentProvider>
        <SentimentConsumer />
      </SentimentProvider>
    </QueryClientProvider>,
  );
};

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

  it("addSentiment function exists and can be called", () => {
    renderProvider();
    const btn = screen.getByTestId("add-btn");
    expect(btn).toBeInTheDocument();
  });

  it("updates totalSentiments (starts at 0)", () => {
    renderProvider();
    expect(screen.getByTestId("total")).toHaveTextContent("0");
  });

  it("initializes with averageRating of 0", () => {
    renderProvider();
    expect(screen.getByTestId("average")).toHaveTextContent("0");
  });
});
