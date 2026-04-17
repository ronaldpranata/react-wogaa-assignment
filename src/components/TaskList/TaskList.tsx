
import React, { useState } from 'react';
import { useTasks } from '../../hooks/useTasks';
import { Card } from '../Card/Card';
import { Button } from '../Button/Button';
import styles from './TaskList.module.css';

export const TaskList: React.FC = () => {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      addTask(newTaskTitle.trim());
      setNewTaskTitle('');
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.addCard}>
        <form onSubmit={handleAddTask} className={styles.form}>
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="What needs to be done?"
            className={styles.input}
          />
          <Button type="submit" disabled={!newTaskTitle.trim()}>
            Add Task
          </Button>
        </form>
      </Card>

      <div className={styles.list}>
        {tasks.map((task) => (
          <Card key={task.id} className={`${styles.taskCard} ${task.completed ? styles.completed : ''}`}>
            <div className={styles.taskContent}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className={styles.checkbox}
              />
              <span className={styles.taskTitle}>{task.title}</span>
            </div>
            <Button 
              variant="danger" 
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </Button>
          </Card>
        ))}
        {tasks.length === 0 && (
          <p className={styles.empty}>No tasks yet. Add one above!</p>
        )}
      </div>
    </div>
  );
};
