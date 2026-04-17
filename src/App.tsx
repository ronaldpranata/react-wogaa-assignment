import { Header } from "./components/layout/Header/Header";
import { SentimentWidget } from "./components/features/SentimentWidget/SentimentWidget";

export default function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <SentimentWidget />
      </main>
    </div>
  );
}
