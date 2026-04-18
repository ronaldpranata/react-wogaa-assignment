import { SentimentForm } from "./SentimentForm/SentimentForm";
import { SummaryPanel } from "./SummaryPanel/SummaryPanel";
import { useSentiments } from "../../../hooks/useSentiments";
import styles from "./SentimentWidget.module.css";

export const SentimentWidget: React.FC = () => {
  const { summaryStats } = useSentiments();
  return (
    <div className={styles.container}>
      <SentimentForm />
      <br />
      {summaryStats.totalSentiments > 0 && <SummaryPanel />}
    </div>
  );
};
