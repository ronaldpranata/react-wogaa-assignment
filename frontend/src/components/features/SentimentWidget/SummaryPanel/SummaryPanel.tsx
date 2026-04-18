import { useSentiments } from "../../../../hooks/useSentiments";
import { Card } from "../../../ui/Card/Card";

export const SummaryPanel: React.FC = () => {
  const { sentiments, summaryStats } = useSentiments();
  const last3Sentiments = sentiments
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 3);
  return (
    <Card>
      <h1>Summary</h1>
      <p>Total submissions: {summaryStats.totalSentiments}</p>
      <p>Average rating: {summaryStats.averageRating}</p>
      <br />
      <hr></hr>
      <br />
      <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem" }}>
        {last3Sentiments.map((sentiment) => (
          <li key={sentiment.id}>{sentiment.comment}</li>
        ))}
      </ul>
    </Card>
  );
};
