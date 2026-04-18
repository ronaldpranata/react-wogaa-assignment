import React, { createContext, useReducer, useEffect, useMemo } from "react";
import type { ReactNode } from "react";
import type {
  Sentiment,
  SentimentAction,
  SentimentContextType,
} from "../types/sentiment";

export const SentimentContext = createContext<SentimentContextType | undefined>(
  undefined,
);

const initialState: Sentiment[] = [];

const SentimentReducer = (
  state: Sentiment[],
  action: SentimentAction,
): Sentiment[] => {
  switch (action.type) {
    case "ADD_SENTIMENT":
      return [...state, action.payload];
    default:
      return state;
  }
};

const initSentiments = (fallbackState: Sentiment[]) => {
  try {
    const savedSentiments = localStorage.getItem("sentiments");

    if (savedSentiments) {
      return JSON.parse(savedSentiments);
    }
    return fallbackState;
  } catch (e) {
    console.error("Failed to load Sentiments from localStorage", e);
    return fallbackState;
  }
};
export const SentimentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [sentiments, dispatch] = useReducer(
    SentimentReducer,
    initialState,
    initSentiments,
  );

  // Save to localStorage whenever Sentiments change
  useEffect(() => {
    localStorage.setItem("sentiments", JSON.stringify(sentiments));
  }, [sentiments]);

  const addSentiment = (rating: number, comment: string) => {
    const newSentiment: Sentiment = {
      id: crypto.randomUUID(),
      rating: rating,
      comment: comment,
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: "ADD_SENTIMENT", payload: newSentiment });
  };

  const summaryStats = useMemo(() => {
    const total = sentiments.length;
    if (total === 0) return { totalSentiments: 0, averageRating: 0 };

    const totalRating = sentiments.reduce(
      (sum, sentiment) => sum + sentiment.rating,
      0,
    );
    return {
      totalSentiments: total,
      averageRating: Number((totalRating / total).toFixed(1)),
    };
  }, [sentiments]);

  return (
    <SentimentContext.Provider
      value={{ sentiments, summaryStats, addSentiment }}
    >
      {children}
    </SentimentContext.Provider>
  );
};
