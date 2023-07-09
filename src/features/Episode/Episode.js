import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LeftPanel from '../../components/LeftPanel';
import { useQuery } from '@tanstack/react-query';
import { getPodcastDetails, getPodcasts } from '../../api';
import styles from './Episode.module.css';

const Episode = () => {
  const { podcastId, episodeId } = useParams();
  console.log('episodeid', episodeId);
  const [desc, setDesc] = useState('');
  const [trackTitle, setTrackTitle] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [episodeUrl, setEpisodeUrl] = useState('');
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

  useEffect(() => {
    const data = podcast?.results?.find(item => item?.trackId === episodeId);
    console.log('data', data);
    setTrackTitle(data?.trackName);
    setShortDesc(data?.description);
    setEpisodeUrl(data?.episodeUrl);
  }, [podcast]);

  if (isLoading) {
    return <>cargando</>;
  }

  if (isError) {
    return <>{error}</>;
  }

  return (
    <div className={styles['episode-container']}>
      <LeftPanel
        podcastId={podcastId}
        title={podcast.results[0]?.trackName}
        description={desc}
        img={podcast.results[0].artworkUrl600}
        author={podcast.results[0].artistName}
      />
      <div className={styles['main-view-container']}>
        <p>{trackTitle}</p>
        <p><div dangerouslySetInnerHTML={{ __html: shortDesc }} /></p>
        <audio src={episodeUrl} controls="controls" preload="none"></audio>
      </div>

    </div>
  );
};

export default Episode;
