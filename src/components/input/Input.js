import React from 'react';
import styles from './Input.module.css';

const Input = props => {
  const { value, onChange, placeholder = '' } = props;
  return (
    <div className={styles['filter-input']} >
      <input value={value} onChange={onChange} placeholder={placeholder}/>
    </div>
  );
};

export default Input;
