import React from 'react';
import styles from './Badge.module.css';

const Badge = ({ results = 0 }) => {
  return (
    <div className={styles['badge-container']}>{results}</div>
  );
};

export default Badge;
