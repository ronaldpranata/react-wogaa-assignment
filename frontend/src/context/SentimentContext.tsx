import React, {
  createContext,
  useReducer,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import type { ReactNode } from "react";
import type {
  Sentiment,
  SentimentAction,
  SentimentContextType,
} from "../types/sentiment";
import * as sentimentsApi from "../api/sentiments";

export const SentimentContext = createContext<SentimentContextType | undefined>(
  undefined,
);

// ─── Reducer ──────────────────────────────────────────────────────────────

const SentimentReducer = (
  state: Sentiment[],
  action: SentimentAction,
): Sentiment[] => {
  switch (action.type) {
    case "ADD_SENTIMENT":
      // Prepend so newest are first (matches API ordering)
      return [action.payload, ...state];
    case "SET_SENTIMENTS":
      return action.payload;
    default:
      return state;
  }
};

// ─── Provider ─────────────────────────────────────────────────────────────

export const SentimentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [sentiments, dispatch] = useReducer(SentimentReducer, []);

  /**
   * On mount: fetch all persisted sentiments from the backend.
   * This replaces the old localStorage initialisation.
   */
  useEffect(() => {
    sentimentsApi
      .getAll()
      .then((data) => dispatch({ type: "SET_SENTIMENTS", payload: data }))
      .catch((err) =>
        console.error("Failed to load sentiments from backend:", err),
      );
  }, []);

  const addSentiment = useCallback(async (rating: number, comment: string) => {
    try {
      const saved = await sentimentsApi.create({ rating, comment });
      dispatch({ type: "ADD_SENTIMENT", payload: saved });
    } catch (err) {
      console.error("Failed to save sentiment:", err);

      throw err;
    }
  }, []);

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
