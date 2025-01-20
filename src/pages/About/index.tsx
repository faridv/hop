import React, { useCallback, useEffect, useState } from 'react';
import { News } from '../../types/news.model';
import { ApiResponse } from '../../types/response.model';
import { loadUhdItem } from '../../utils/api';
import { AxiosResponse } from 'axios';
import NewsItemDetail from '../../components/News/NewsItemDetail';
import Loading from '../../components/Loading';

interface AboutProps {
  type: string;
}

function About({ type }: AboutProps) {

  const [content, setContent] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const convertTypeToId = (type: any): number => {
    switch (type) {
      case 'about':
        return 4;
      case 'frequencies':
        return 10;
      default:
        return 1;
    }
  }

  const loadContent = useCallback((id) => {
    loadUhdItem(Number(id))
      .then((response: AxiosResponse<ApiResponse<News[]>>) => {
        setContent(response.data.data);
        setIsLoading(false);
      });
  }, [])

  useEffect(() => {
    loadContent(convertTypeToId(type));
  }, [type, loadContent]);

  return (
    isLoading ? (<Loading/>) : (<NewsItemDetail hideImage item={content}/>)
  )
}

export default About;
