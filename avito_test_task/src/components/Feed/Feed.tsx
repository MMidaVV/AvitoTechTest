import type { FC } from 'react';
import type { FeedProps } from './types';
import styles from './Feed.module.css';
import Filters from '../Filters/Filters';
import CardGrid from '../CardGrid/CardGrid';

const Feed: FC<FeedProps> = ({ items }) => {
  return (
    <div className={styles.feed}>
      <Filters />
      <CardGrid items={items} />
    </div>
  );
};

export default Feed;