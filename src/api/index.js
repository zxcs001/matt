import http from '../utils/http';

const BASE_URL = 'https://itunes.apple.com/';

const getUrl = (url) => `${BASE_URL}${url}`;

export async function getPodcasts ({ limit = 100, genre = 1310 }) {
  const url = getUrl(`/us/rss/toppodcasts/limit=${limit}/genre=${genre}/json`);
  return await http.get(url);
}

export async function getPodcastDetails ({ podcastId = '934552872', limit = '20' }) {
  const url = getUrl(`lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=${limit}`);
  return await http.get(url);
}

export default {
  getPodcasts,
  getPodcastDetails
};
