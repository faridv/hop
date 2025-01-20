import React, { useCallback, useEffect, useState } from "react";
import { loadUhdItemsByCatId } from "../../utils/api";
import { FaqStyled } from "./style";
import FaqContainer from "../../components/Faq";
import Loading from "../../components/Loading";
import { News } from "../../types/news.model";

function Faq() {
  const [data, setData] = useState<News[]>([]);

  const loadItems = useCallback(() => {
    loadUhdItemsByCatId(3).then((response) => {
      setData(response.data.data);
    });
  }, []);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  return (
    <FaqStyled>
      {data.length ? <FaqContainer items={data} /> : <Loading />}
    </FaqStyled>
  );
}

export default Faq;
