import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext";
import { SentimentProvider } from "./context/SentimentContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <SentimentProvider>
          <App />
        </SentimentProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);
