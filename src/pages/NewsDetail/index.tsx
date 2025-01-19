import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { loadUhdItem } from '../../utils/api';
import { AxiosResponse } from 'axios';
import { ApiResponse } from '../../types/response.model';
import { News } from '../../types/news.model';
import Loading from '../../components/Loading';
import NewsItemDetail from '../../components/News/NewsItemDetail';

function Index() {

  const { id }: { id: string } = useParams<{ id: string }>();
  const [item, setItem] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadItem = useCallback(() => {
    loadUhdItem(Number(id))
      .then((response: AxiosResponse<ApiResponse<News[]>>) => {
        setItem(response.data.data);
        setIsLoading(false);
      });
  }, [id])

  useEffect(() => {
    loadItem();
  }, [id, loadItem]);

  return isLoading ? (<Loading/>) : (<NewsItemDetail item={item!}/>);

}

export default Index;
