import { loadUhdSchedule } from '../../utils/api';
import React, { useEffect, useState } from 'react';
import { ApiResponse } from '../../types/response.model';
import { AxiosResponse } from 'axios';
import { fetchServerTime } from '../../libs/server-time';
import Loading from '../../components/Loading';
import ScheduleMain from '../../components/Schedule/ScheduleMain';
import { ISchedule } from '../../types/schedule.model';

function Schedule() {

  const [items, setItems] = useState<ISchedule[]>([]);

  const loadData = async (): Promise<void> => {
    const date: Date = await fetchServerTime();
    const dateString: string = date.toISOString().slice(0, 10);
    loadUhdSchedule(dateString)
      .then((response: AxiosResponse<ApiResponse<ISchedule[]>>) => {
        setItems(response.data.data);
      });
  }

  useEffect(() => {
    loadData().then(() => void 0);
  }, []);

  return items.length
    ? (<ScheduleMain items={items}/>)
    : (<Loading/>);
}

export default Schedule;
