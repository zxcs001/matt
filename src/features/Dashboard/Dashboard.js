import React, { useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import debounce from 'lodash/debounce';

import Input from '../../components/input';
import { getPodcasts } from '../../api';
import CardContainer from '../../components/CardContainer';
import Badge from '../../components/Badge';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const { data } = useQuery({
    queryKey: ['podcasts'],
    queryFn: getPodcasts,
    staleTime: 1400 * (60 * 1000)
  });
  const [filterValue, setFilterValue] = useState('');
  const [filteredData, setFilteredData] = useState(null);

  const filterPodcasts = ({ data, value }) => {
    const filtered = data?.feed?.entry?.filter(item => item.title.label.includes(value) || item?.['im:artist'].label.includes(value));
    return setFilteredData(filtered);
  };
  const debounceLoadData = useCallback(debounce(filterPodcasts, 200), []);

  const handleFilterChange = (event) => {
    const { value } = event.target;
    setFilterValue(value);
    debounceLoadData({ data, value });
  };

  return (
    <>
      <div className={styles['dashboard-header']}>
        <Badge results={data?.feed?.entry?.length}/>
        <Input value={filterValue} onChange={handleFilterChange} placeholder='Filter podcasts...' />
      </div>
      { !filterValue?.length && <CardContainer data={data} />}
      { !!filteredData?.length && <CardContainer data={{ feed: { entry: filteredData } }} />}
    </>
  );
};

export default Dashboard;
