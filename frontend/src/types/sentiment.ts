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

export interface SentimentContextType {
  sentiments: Sentiment[];
  summaryStats: SummaryStats;
  addSentiment: (rating: number, comment: string) => Promise<void>;
}
