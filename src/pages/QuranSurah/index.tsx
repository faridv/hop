import { SurahDetail } from '../../types/quran-surah.model';
import React, { useCallback, useEffect, useState } from 'react';
import { getQuranSurah } from '../../utils/api';
import { useParams } from 'react-router-dom';
import { ApiResponse } from '../../types/response.model';
import { AxiosResponse } from 'axios';
import Loading from '../../components/Loading';
import QuranSurahDetail from '../../components/Quran/QuranSurahDetail';

function QuranSurah() {

  const { id }: { id: string } = useParams<{ id: string }>();

  const [data, setData] = useState<SurahDetail[]>([]);

  const loadSurahDetail = useCallback(async (id: number): Promise<void> => {
    getQuranSurah(id)
      .then((response: AxiosResponse<ApiResponse<SurahDetail[]>>) => setData(response.data.data))
  }, [])

  useEffect(() => {
    if (typeof id !== 'undefined') {
      loadSurahDetail(Number(id)).then(() => void 0);
    }
  }, [id, loadSurahDetail]);

  return data.length
    ? (<QuranSurahDetail items={data}/>)
    : (<Loading/>);

}

export default QuranSurah;
