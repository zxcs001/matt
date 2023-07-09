import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Card.module.css';

const Card = props => {
  const navigate = useNavigate();
  const { title = 'No title', author = 'unknown', podcastId, imageUrl } = props;
  return (
    <div className={styles['card-container']} onClick={() => navigate(`/podcast/${podcastId}`)}>
      <img src={imageUrl} className={styles['logo-container']} alt="img"/>
      <div className={styles['card-description']}>
        <div>{title}</div>
        <div> autor: {author} </div>
      </div>
    </div>
  );
};

export default Card;
