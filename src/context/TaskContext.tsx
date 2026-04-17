"use client";
import React, { createContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Task, TaskAction, TaskContextType } from '../types/task';

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

const initialState: Task[] = [];

const taskReducer = (state: Task[], action: TaskAction): Task[] => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, action.payload as Task];
    case 'TOGGLE_TASK':
      return state.map((task) =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      );
    case 'DELETE_TASK':
      return state.filter((task) => task.id !== action.payload);
    case 'SET_TASKS':
      return action.payload as Task[];
    default:
      return state;
  }
};

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, dispatch] = useReducer(taskReducer, initialState);

  // Fetch all tasks on mount
  useEffect(() => {
    fetch('/api/tasks')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          dispatch({ type: 'SET_TASKS', payload: data });
        } else {
          console.error('API Error:', data);
          dispatch({ type: 'SET_TASKS', payload: [] });
        }
      })
      .catch((err) => console.error("Failed to load tasks", err));
  }, []);

  const addTask = async (title: string) => {
    // Generate an optimistic ID so the UI updates immediately
    const optimisticTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    
    // 1. Optimistic Update
    dispatch({ type: 'ADD_TASK', payload: optimisticTask as any });

    // 2. Persist to API
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });
      const savedTask = await res.json();
      
      // Optionally replace the optimistic ID with the real DB ID here,
      // But we can also just fetch all tasks to sync perfectly:
      // (This guarantees order and real IDs)
      const allRes = await fetch('/api/tasks');
      const allTasks = await allRes.json();
      if (Array.isArray(allTasks)) {
        dispatch({ type: 'SET_TASKS', payload: allTasks });
      }

    } catch (error) {
      console.error("Failed to add task", error);
      // Rollback logic could go here
    }
  };

  const toggleTask = async (id: string) => {
    // 1. Optimistic Update
    dispatch({ type: 'TOGGLE_TASK', payload: id });
    
    // 2. API Request
    fetch(`/api/tasks/${id}`, { method: 'PATCH' }).catch(console.error);
  };

  const deleteTask = async (id: string) => {
    // 1. Optimistic Update
    dispatch({ type: 'DELETE_TASK', payload: id });
    
    // 2. API Request
    fetch(`/api/tasks/${id}`, { method: 'DELETE' }).catch(console.error);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
