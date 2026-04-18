import styles from "./CommentBox.module.css";
interface CommentBoxProps {
  inputText: string;
  onInputChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const CommentBox: React.FC<CommentBoxProps> = ({
  inputText,
  onInputChange,
  placeholder,
  disabled = false,
}) => {
  return (
    <textarea
      value={inputText}
      onChange={(e) => onInputChange(e.target.value)}
      placeholder={placeholder}
      className={styles.input}
      disabled={disabled}
    />
  );
};
