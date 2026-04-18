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
  const ratings = [1, 2, 3, 4, 5];
  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLocked(true);
    addSentiment(currentRating!, comment);
    alert("Thank you for your feedback.");
    setTimeout(() => {
      setIsLocked(false);
    }, 3000);
    if (comment.trim()) {
      setComment("");
    }
    setCurrentRating(null);
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
          <SubmitButton
            disabled={!comment.trim() || currentRating === null || isLocked}
          />
        </form>
      </Card>
    </div>
  );
};
