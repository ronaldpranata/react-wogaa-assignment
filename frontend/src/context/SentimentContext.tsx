import React, { createContext, useMemo, useCallback } from "react";
import type { ReactNode } from "react";
import type { SentimentContextType } from "../types/sentiment";
import * as sentimentsApi from "../api/sentiments";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const SentimentContext = createContext<SentimentContextType | undefined>(
  undefined,
);

// ─── Provider ─────────────────────────────────────────────────────────────

export const SentimentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const queryClient = useQueryClient();

  // 1. THE GET: Replaces your useEffect and 'SET_SENTIMENTS' reducer action
  const { data: sentiments = [] } = useQuery({
    queryKey: ["sentiments"],
    queryFn: sentimentsApi.getAll,
  });

  // 2. THE POST: Replaces your manual fetch and 'ADD_SENTIMENT' reducer action
  const mutation = useMutation({
    mutationFn: (newSentiment: { rating: number; comment: string }) =>
      sentimentsApi.create(newSentiment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sentiments"] });
    },
    onError: (err) => {
      console.error("Failed to save sentiment:", err);
    },
  });
  const addSentiment = useCallback(
    async (rating: number, comment: string) => {
      // .mutateAsync allows your UI form to still use try/catch block!
      await mutation.mutateAsync({ rating, comment });
    },
    [mutation],
  );

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
