import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate, formatTrackDuration } from '../../utils/util';
import styles from './TableEpisodes.module.css';
const TableEpisodes = ({ data }) => {
  return (
    <div className={styles['table-container']}>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td><Link to={`episode/${item.trackId}`}>{item.trackName}</Link></td>
              <td>{formatDate(item.releaseDate)}</td>
              <td>{formatTrackDuration(item.trackTimeMillis)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableEpisodes;
