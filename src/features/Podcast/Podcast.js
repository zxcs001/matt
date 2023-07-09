import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import styles from './Podcast.module.css';
import { getPodcasts, getPodcastDetails } from '../../api';

import TableEpisodes from '../../components/TableEpisodes';
import LeftPanel from '../../components/LeftPanel';

const Podcast = () => {
  const { podcastId } = useParams();
  const [desc, setDesc] = useState('');
  const { isLoading, isError, data: podcast, error } = useQuery(
    {
      queryKey: ['podcast', podcastId],
      queryFn: () => getPodcastDetails({ podcastId }),
      staleTime: 1400 * (60 * 1000)
    });

  const { data } = useQuery({
    queryKey: ['podcasts'],
    queryFn: getPodcasts,
    staleTime: 1400 * (60 * 1000)
  });

  useEffect(() => {
    const result = data?.feed?.entry?.find(item => item?.id?.attributes?.['im:id'] === podcastId);
    setDesc(result?.summary?.label);
  }, [data]);

  if (isLoading) {
    return <>cargando</>;
  }

  if (isError) {
    return <>{error}</>;
  }

  return (
    <div className={styles['podcast-container']}>
      <LeftPanel
        podcastId={podcastId}
        title={podcast.results[0].trackName}
        description={desc}
        img={podcast.results[0].artworkUrl600}
        author={podcast.results[0].artistName}
      />
      <div className={styles['main-view-container']}>
        <div className={styles['episodes-container']} >
          <p>Episodes: {podcast?.results?.length}</p>
        </div>
        <TableEpisodes data={podcast.results}/>
      </div>
    </div>
  );
};

export default Podcast;
