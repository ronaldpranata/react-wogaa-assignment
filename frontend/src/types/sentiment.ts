export interface Sentiment {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface SummaryStats {
  totalSentiments: number;
  averageRating: number;
}

export type SentimentAction =
  | { type: "ADD_SENTIMENT"; payload: Sentiment }
  | { type: "SET_SENTIMENTS"; payload: Sentiment[] };

export interface SentimentContextType {
  sentiments: Sentiment[];
  summaryStats: SummaryStats;
  addSentiment: (rating: number, comment: string) => void;
}
