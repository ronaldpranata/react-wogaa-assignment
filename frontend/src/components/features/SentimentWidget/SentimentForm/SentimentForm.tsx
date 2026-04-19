import React, { useState } from "react";
import { Card } from "../../../ui/Card/Card";
import styles from "./SentimentForm.module.css";
import { RatingChips } from "./RatingChips/RatingChips";
import { CommentBox } from "./CommentBox/CommentBox";
import { SubmitButton } from "./SubmitButton/SubmitButton";
import { useSentiments } from "../../../../hooks/useSentiments";

export const SentimentForm: React.FC = () => {
  const [currentRating, setCurrentRating] = useState<number | null>(null);
  const { addSentiment } = useSentiments();
  const [isLocked, setIsLocked] = useState(false);
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const ratings = [1, 2, 3, 4, 5];

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLocked(true);
    setError(null);
    try {
      await addSentiment(currentRating!, comment);

      alert("Thank you for your feedback.");
      setComment("");
      setCurrentRating(null);
    } catch {
      setError("Failed to save your feedback. Please try again.");
    } finally {
      setTimeout(() => setIsLocked(false), 1000);
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.addCard}>
        <form onSubmit={handleSubmitForm} className={styles.form}>
          <RatingChips
            ratings={ratings}
            currentRating={currentRating}
            onRatingChange={setCurrentRating}
            disabled={isLocked}
          />
          <CommentBox
            inputText={comment}
            onInputChange={setComment}
            placeholder="Enter your comment..."
            disabled={isLocked}
          />
          {error && (
            <p role="alert" style={{ color: "red", fontSize: "0.875rem" }}>
              {error}
            </p>
          )}
          <SubmitButton
            disabled={!comment.trim() || currentRating === null || isLocked}
          />
        </form>
      </Card>
    </div>
  );
};
