import axios, { AxiosResponse } from 'axios';

export const fetchServerTime = async (): Promise<Date> => {
  try {
    const response: AxiosResponse<string> = await axios.get(process.env.REACT_APP_CLOCK_URL);
    return new Date(response.data);
  } catch (error: unknown) {
    console.error('Error fetching server time:', error);
  }
};
