import { useCallback, useEffect, useState } from 'react';
import { getQuranSurahList } from '../../utils/api';
import { ApiResponse } from '../../types/response.model';
import { AxiosResponse } from 'axios';
import QuranSurahList from '../../components/Quran/QuranSurahList';
import Loading from '../../components/Loading';
import { Surah } from '../../types/quran-surah.model';

function Quran() {

  const [items, setItems] = useState<Surah[]>([]);

  const loadData = useCallback(() => {
    getQuranSurahList()
      .then((response: AxiosResponse<ApiResponse<Surah[]>>) => setItems(response.data.data));
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return items.length
    ? (<QuranSurahList items={items}/>)
    : (<Loading/>);
}

export default Quran;
