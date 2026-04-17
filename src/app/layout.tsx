import type { Metadata } from 'next';
import '../index.css';
import { ThemeProvider } from '../context/ThemeContext';
import { TaskProvider } from '../context/TaskContext';

export const metadata: Metadata = {
  title: 'TaskMaster Pro',
  description: 'React Fundamentals Assessment using Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <ThemeProvider>
          <TaskProvider>
            {children}
          </TaskProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
