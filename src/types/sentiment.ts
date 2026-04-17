export interface Sentiment {
  id: string;
  rating: number;
  comment: string;

  createdAt: string;
}

export type SentimentAction =
  | { type: "ADD_SENTIMENT"; payload: Sentiment }
  | { type: "TOGGLE_SENTIMENT"; payload: string }
  | { type: "DELETE_SENTIMENT"; payload: string }
  | { type: "SET_SENTIMENTS"; payload: Sentiment[] };

export interface SentimentContextType {
  Sentiments: Sentiment[];
  addSentiment: (title: string) => void;
  toggleSentiment: (id: string) => void;
  deleteSentiment: (id: string) => void;
}
