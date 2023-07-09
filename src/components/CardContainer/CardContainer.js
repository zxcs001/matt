import React from 'react';
import Card from '../Card';

import styles from './CardContainer.module.css';

const CardContainer = props => {
  const { data } = props;
  return (
    <div className={styles['card-container']}>
      {
        data?.feed?.entry &&
        Object.keys(data.feed.entry).map(key =>
          <Card
            key={data.feed.entry[key].title.label}
            title={data.feed.entry[key].title.label}
            author={data.feed.entry[key]?.['im:artist'].label}
            podcastId={data.feed.entry[key]?.id?.attributes?.['im:id']}
            imageUrl={data.feed.entry[key]?.['im:image'][2].label}
          />)
      }
    </div>
  );
};

export default CardContainer;
