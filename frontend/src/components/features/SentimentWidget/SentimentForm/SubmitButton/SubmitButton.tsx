import { Button } from "../../../../ui/Button/Button";
import styles from "./SubmitButton.module.css";
export const SubmitButton: React.FC<{ disabled?: boolean }> = ({
  disabled,
}) => {
  return (
    <div className={styles.container}>
      <Button type="submit" disabled={disabled} variant="primary">
        Submit
      </Button>
    </div>
  );
};
