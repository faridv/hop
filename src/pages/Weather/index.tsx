import React, { useEffect, useState } from 'react';
import { FocusContext, useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { iranProvinces } from '../../data/iran-provinces';
import { loadWeather } from '../../utils/api';
import LocationItem from '../../components/Location';
import IranMap from '../../components/IranMap';
import { WeatherStyled } from './style';
import moment from 'moment-jalaali';
import { AxiosResponse } from 'axios';
import { ApiResponse } from '../../types/response.model';
import WeatherData from '../../components/Weather/WeatherData';
import Loading from '../../components/Loading';

function Weather() {

  const [weatherData, setWeatherData] = useState<{ weather: any, forecast: any } | null>(null);
  const [selectedCityCoords, setSelectedCityCoords] = useState<string>('');
  const [selectedCityName, setSelectedCityName] = useState<string>('tehran');
  const locations: {
    city: string;
    title: string;
    coords: number[];
  }[] = iranProvinces;

  const { ref, focusKey } = useFocusable();

  const changeCity = (cityCoords: string, cityName: string) => {
    setSelectedCityCoords(cityCoords);
    setSelectedCityName(cityName);
    loadWeatherData(Number(cityCoords.split(',')[0]), Number(cityCoords.split(',')[1]));
    localStorage.setItem('selectedCity', cityCoords);
  };

  const prepareData = (data: { weather: any; forecast: any; }) => {
    let weather: any = data;
    moment.locale('en');
    moment.loadPersian({ dialect: 'persian-modern' });
    weather.forecast = weather.forecast.slice(0, 5);
    interface Forecast {
      date: string | number;
      fdate?: string;
      [key: string]: any; // for other potential properties
    }

    weather.forecast.forEach((forecast: Forecast) => {
      const momentDate = moment(forecast.date.toString().split(' ')[0], 'YYYY-MM-DD ', false);
      forecast['fdate'] = momentDate.isSame(moment(), 'day') ? 'امشب' : momentDate.format('dddd jM/jD');
    });
    return weather;
  }

  const loadWeatherData = (lat: number, lon: number) => {
    setWeatherData(null);
    loadWeather(lat, lon)
      .then((response: AxiosResponse<ApiResponse<{ weather: any, forecast: any }>>) => {
        setWeatherData(prepareData(response.data.data));
      })
  }

  useEffect(() => {
    const savedCity: string = localStorage.getItem('selectedCity') || '51.42,35.7'; // Tehran
    setSelectedCityCoords(savedCity);
    setSelectedCityName(locations.find((province) => province.coords.join(',') === savedCity)!.city);

    const [lat, lon] = savedCity.split(',');
    loadWeatherData(Number(lat), Number(lon));
    // eslint-disable-next-line
  }, [locations]);


  return (
    <WeatherStyled>
      {
        weatherData
          ? (<WeatherData data={weatherData}/>)
          : (<Loading/>)
      }
      <FocusContext.Provider value={focusKey}>
        <div className='locations' ref={ref}>
          {locations.map((province, index) => (
            <LocationItem
              key={index}
              province={province}
              selectedCityCoords={selectedCityCoords}
              changeCity={changeCity}
            />
          ))}
        </div>
        <div className='map'>
          <IranMap selectedProvince={selectedCityName}/>
        </div>
      </FocusContext.Provider>
    </WeatherStyled>
  );
}

export default Weather;
