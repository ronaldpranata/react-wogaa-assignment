import { useContext } from "react";
import { SentimentContext } from "../context/SentimentContext";

export const useTasks = () => {
  const context = useContext(SentimentContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a SentimentProvider");
  }
  return context;
};
