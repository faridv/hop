import React, { useCallback, useEffect, useState } from 'react';
import { loadEvents, loadUhdItemsByCatId } from '../../utils/api';
import Loading from '../../components/Loading';
import NewsList from '../../components/News/NewsList';

function News({ type }: { type: string }) {

  const [items, setItems] = useState<any[]>([]);


  const loadItems = useCallback(async (type: string) => {
    setItems([]);
    switch (type) {
      case 'news':
        loadUhdItemsByCatId(1, true)
          .then((response) => {
            setItems(response.data.data);
          });
        break;
      case 'programs':
        loadUhdItemsByCatId(4, true)
          .then((response) => {
            setItems(response.data.data);
          });
        break;
      case 'events':
        loadEvents()
          .then((response) => {
            setItems(response.data.data);
          });
        break;
      default:
        break;
    }
  }, []);

  useEffect(() => {
    loadItems(type);
  }, [type, loadItems]);

  return (
    items.length
      ? (<NewsList type={type} items={items}/>)
      : <Loading/>
  );
}

export default News;
