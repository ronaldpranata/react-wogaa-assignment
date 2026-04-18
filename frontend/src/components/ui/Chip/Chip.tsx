import React from "react";
import styles from "./Chip.module.css";

interface ChipProps {
  active: boolean;
  chipValue: null | number;
  onClick: () => void;
  disabled?: boolean;
}

export const Chip: React.FC<ChipProps> = ({
  active,
  chipValue,
  onClick,
  disabled,
}) => {
  return (
    <button
      className={`${styles.chip} ${active ? styles.active : ""} ${disabled ? styles.disabled : ""}`}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {chipValue}
    </button>
  );
};
