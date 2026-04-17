import styles from "./RatingChips.module.css";
import { Chip } from "../../../../ui/Chip/Chip";

interface RatingChipsProps {
  ratings?: number[];
  currentRating?: number | null;
  onRatingChange?: (value: number | null) => void;
  disabled?: boolean;
}

export const RatingChips: React.FC<RatingChipsProps> = ({
  ratings = [1, 2, 3, 4, 5],
  currentRating = null,
  onRatingChange,
  disabled = false,
}) => {
  return (
    <div className={styles.container}>
      {ratings.map((value) => (
        <div className={styles.chipArea} key={value}>
          <Chip
            active={currentRating === value}
            chipValue={value}
            onClick={() =>
              onRatingChange?.(currentRating === value ? null : value)
            }
            disabled={disabled}
            key={value}
          />
        </div>
      ))}
    </div>
  );
};
