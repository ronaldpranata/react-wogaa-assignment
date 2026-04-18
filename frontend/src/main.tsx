import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext";
import { SentimentProvider } from "./context/SentimentContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <SentimentProvider>
        <App />
      </SentimentProvider>
    </ThemeProvider>
  </StrictMode>,
);
