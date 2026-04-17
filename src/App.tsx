import { Header } from './components/Header/Header';
import { TaskList } from './components/TaskList/TaskList';

export default function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <TaskList />
      </main>
    </div>
  );
}
