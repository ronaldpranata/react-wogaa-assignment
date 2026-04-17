import React, { createContext, useReducer, useEffect } from "react";
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
    case "TOGGLE_SENTIMENT":
      return state.map((Sentiment) =>
        Sentiment.id === action.payload
          ? { ...Sentiment, completed: !Sentiment.completed }
          : Sentiment,
      );
    case "DELETE_SENTIMENT":
      return state.filter((Sentiment) => Sentiment.id !== action.payload);
    case "SET_SENTIMENTS":
      return action.payload as Sentiment[];
    default:
      return state;
  }
};

export const SentimentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [Sentiments, dispatch] = useReducer(SentimentReducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedSentiments = localStorage.getItem("ratings");
      if (savedSentiments) {
        dispatch({
          type: "SET_SENTIMENTS",
          payload: JSON.parse(savedSentiments),
        });
      }
    } catch (e) {
      console.error("Failed to load Sentiments from localStorage", e);
    }
  }, []);

  // Save to localStorage whenever Sentiments change
  useEffect(() => {
    localStorage.setItem("Sentiments", JSON.stringify(Sentiments));
  }, [Sentiments]);

  const addSentiment = (title: string) => {
    const newSentiment: Sentiment = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: "ADD_SENTIMENT", payload: newSentiment });
  };

  return (
    <SentimentContext.Provider value={{ Sentiments, addSentiment }}>
      {children}
    </SentimentContext.Provider>
  );
};
