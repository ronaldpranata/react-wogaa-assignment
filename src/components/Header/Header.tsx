"use client";
import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { Button } from '../Button/Button';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>TaskMaster Pro</h1>
        <Button onClick={toggleTheme} variant="secondary">
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </Button>
      </div>
    </header>
  );
};
