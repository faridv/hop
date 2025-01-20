import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { loadUhdItem } from "../../utils/api";
import { AxiosResponse } from "axios";
import { ApiResponse } from "../../types/response.model";
import { News } from "../../types/news.model";
import Loading from "../../components/Loading";
import NewsItemDetail from "../../components/News/NewsItemDetail";
import React from "react";

function Index() {
  const { id } = useParams<"id">();
  const [item, setItem] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadItem = useCallback(() => {
    loadUhdItem(Number(id)).then(
      (response: AxiosResponse<ApiResponse<News[]>>) => {
        setItem(response.data.data);
        setIsLoading(false);
      }
    );
  }, [id]);

  useEffect(() => {
    loadItem();
  }, [id, loadItem]);

  // Add null check for id
  if (!id) {
    return <Loading />;
  }

  return isLoading ? (
    <Loading />
  ) : (
    <NewsItemDetail item={item!} hideImage={false} />
  );
}

export default Index;
