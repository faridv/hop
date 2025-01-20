import React from 'react';
import { WeatherDataStyled, WeatherForecastStyled, WeatherWeatherStyled } from './style';

interface WeatherDataProps {
  data: {
    weather: {
      icon: string;
      description: string;
      temperature: {
        current: number;
      };
      wind: {
        speed: number;
      };
      humidity: number;
      visibility: number | null;
      pressure: number;
    };
    forecast: {
      temperature: {
        max: number;
      };
      icon: string;
      description: string;
      fdate: string;
    }[];
  };
}

function WeatherData({ data }: WeatherDataProps) {

  return (
    <WeatherDataStyled>
      <WeatherWeatherStyled>
        <div className='preview'>
          <div className='weather-icon'>
            <i className={`icon-${data.weather.icon}`}></i>
            <h3>{data.weather.description}</h3>
          </div>
          <div className='temperature'>
            <h2 className="ltr">
              {data.weather.temperature.current}
              <small>℃</small>
            </h2>
          </div>
        </div>
        <div className='details'>
          <ul>
            <li>
              <h4><i className="icon-windy"></i> باد</h4>
              <h4 className="ltr">
                {data.weather.wind.speed}
                <small>km/h</small>
              </h4>
            </li>
            <li><h4><i className="icon-drop"></i> رطوبت</h4>
              <h4 className="ltr">
                {data.weather.humidity}
                <small>%</small>
              </h4></li>
            <li>
              <h4><i className="icon-street-view"></i> دید</h4>
              <h4 className="ltr">
                {
                  data.weather.visibility
                    ? <>{data.weather.visibility}<small>m</small></>
                    : 'نامشخص'
                }
              </h4>
            </li>
            <li>
              <h4><i className="icon-thermometer"></i> فشار هوا</h4>
              <h4 className="ltr">
                {data.weather.pressure}
                <small>hPa</small>
              </h4>
            </li>
          </ul>
        </div>
      </WeatherWeatherStyled>
      <WeatherForecastStyled>
        <ul>
          {data.forecast.map((forecast, index) => (
            <li key={index}>
              <div className='forecast-header'>
                <div className='temperature ltr'>{forecast.temperature.max}°</div>
                <div className='weather-icon'>
                  <i className={`icon-${forecast.icon}`}></i>
                </div>
              </div>
              <div className='forecast-details'>
                <div className='title'>{forecast.description}</div>
                <div className='date'>{forecast.fdate}</div>
              </div>
            </li>
          ))}
        </ul>
      </WeatherForecastStyled>
    </WeatherDataStyled>
  );
}

export default WeatherData;
