import axios, { AxiosResponse } from 'axios';
import { News } from '../types/news.model';
import { ApiResponse } from '../types/response.model';
import { ISchedule } from '../types/schedule.model';
import { Surah, SurahDetail } from '../types/quran-surah.model';

export const loadPrayerTimes = async (locations: string) => {
  return await axios.get(`${process.env.REACT_APP_API_BASE}/islamic-prayers/${locations}`);
};

export const loadWeather = async (lat: number, lon: number) => {
  return await axios.get(`${process.env.REACT_APP_API_BASE}/weather?lat=${lat}&lon=${lon}`);
}

export const loadSepehrCategories = async () => {
  return await axios.get(`${process.env.REACT_APP_API_BASE}/sepehr/categories`);
};

export const loadSepehrChannels = async (id: number) => {
  // return await axios.get(`${process.env.REACT_APP_API_BASE}/sepehr/channels/${id}`);
  return await axios.get(`${process.env.REACT_APP_API_BASE}/sepehr/channels/${id}`);
};

export const loadEvents = async (): Promise<AxiosResponse<ApiResponse<News[]>>> => {
  return await axios.get(`${process.env.REACT_APP_API_BASE}/uhd/featured`);
};

/*!
  * Categories:
  * 1: News
  * 2: FAQ
  * 4: Programs
 */
export const loadUhdItemsByCatId = async (id: number, full: boolean): Promise<AxiosResponse<ApiResponse<News[]>>> => {
  return await axios.get(`${process.env.REACT_APP_API_BASE}/uhd?catid=${id}&full=${full}`);
};

export const loadUhdItem = async (id: number): Promise<AxiosResponse<ApiResponse<News[]>>> => {
  return await axios.get(`${process.env.REACT_APP_API_BASE}/uhd/${id}`);
};

export const loadUhdSchedule = async (date: string): Promise<AxiosResponse<ApiResponse<ISchedule[]>>> => {
  return await axios.get(`${process.env.REACT_APP_API_BASE}/sepehr/epg/196462/date/${date}`);
};

export const getMediaById = async (id: number): Promise<AxiosResponse<ApiResponse<any>>> => {
  return await axios.get(`${process.env.REACT_APP_API_BASE}/uhd/${id}`);
};

export const getQuranSurahList = async (): Promise<AxiosResponse<ApiResponse<Surah[]>>> => {
  return await axios.get(`${process.env.REACT_APP_API_BASE}/quran/surah`);
};

export const getQuranSurah = async (id: number): Promise<AxiosResponse<ApiResponse<SurahDetail[]>>> => {
  return await axios.get(`${process.env.REACT_APP_API_BASE}/quran/surah/${id}`);
};
