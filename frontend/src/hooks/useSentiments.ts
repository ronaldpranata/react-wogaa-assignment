import { useContext } from "react";
import { SentimentContext } from "../context/SentimentContext";

export const useSentiments = () => {
  const context = useContext(SentimentContext);
  if (context === undefined) {
    throw new Error("useSentiment must be used within a SentimentProvider");
  }
  return context;
};
