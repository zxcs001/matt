import React from 'react';
import styles from './LeftPanel.module.css';
import { useNavigate } from 'react-router-dom';
// Se debe mostrar una barra lateral con la imagen del podcast, su título, su autor y su descripción.
const LeftPanel = ({ podcastId, img, title = 'No title', author = 'Matias Serrato', description = 'No desc' }) => {
  const navigate = useNavigate();
  const handlerNavigate = () => navigate(`/podcast/${podcastId}`);
  return (
    <div className={styles['left-panel-container']}>
      <div>
        <img onClick={handlerNavigate} src={img} className={styles['img-container']} alt='img'/>
      </div>
      <div className={styles['left-info-container']}>
        <h3 onClick={handlerNavigate}>{title}</h3>
        <p onClick={handlerNavigate}>{author}</p>
      </div>
      <div className={styles['description-container']}>
        <p>Description: </p>
        {description}
      </div>
    </div>
  );
};

export default LeftPanel;
