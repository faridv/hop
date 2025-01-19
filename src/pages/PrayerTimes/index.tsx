import { useEffect, useState } from 'react';
import { loadPrayerTimes } from '../../utils/api';
import { iranProvinces } from '../../data/iran-provinces';
import { PrayerTimesStyles } from './style';
import { BrightnessHighIcon } from '../../icons/BrightnessHigh';
import { SunriseIcon } from '../../icons/Sunrise';
import { SunIcon } from '../../icons/Sun';
import { SunsetIcon } from '../../icons/Sunset';
import { BrightnessMoonIcon } from '../../icons/BrightnessMoon';
import { MoonIcon } from '../../icons/Moon';
import axios, { AxiosResponse } from 'axios';
import * as moment from 'moment-jalaali';
import IranMap from '../../components/IranMap';
import Loading from '../../components/Loading';
import { FocusContext, useFocusable } from '../../libs/spacial-navigation';
import LocationItem from '../../components/Location';


function PrayerTimes() {

  const [prayersData, setPrayersData] = useState({});
  const [todayDate, setTodayDate] = useState('');
  const [selectedCityCoords, setSelectedCityCoords] = useState<string>();
  const [selectedCityName, setSelectedCityName] = useState<string>('tehran');
  const locations: {
    city: string;
    title: string;
    coords: number[];
  }[] = iranProvinces;

  const { ref, focusKey } = useFocusable();

  const changeCity = (cityCoords, cityName) => {
    // const cityCoords = event.target.getAttribute('data-coords');
    // const cityName = event.target.getAttribute('data-city');
    setSelectedCityCoords(cityCoords);
    setSelectedCityName(cityName);
    localStorage.setItem('selectedCity', cityCoords);
  };

  useEffect(() => {
    const savedCity = localStorage.getItem('selectedCity') || '51.42,35.7'; // Tehran
    setSelectedCityCoords(savedCity);
    setSelectedCityName(locations.find((province) => province.coords.join(',') === savedCity)!.city);

    const coordination = [];
    locations.forEach((province) => {
      coordination.push(province.coords.join(','));
    });
    loadPrayerTimes(coordination.join(';')).then((response) => {
      setPrayersData(response.data);
    })
  }, [locations]);

  useEffect(() => {
    axios.get(process.env.REACT_APP_CLOCK_URL)
      .then((response: AxiosResponse<string>) => {
        const serverTime: Date = new Date(response.data);
        setTodayDate(moment(serverTime).format('jYYYY/jM/jD'));
      })
  }, [])

  return (
    <PrayerTimesStyles>
      <div className='times' style={{ height: '340px' }}>
        {Object.keys(prayersData).length ? (
          <>
            <h1 className='text-center text-md mt-6'>
              اوقات شرعی
              &nbsp;{todayDate}
            </h1>
            <ul className="prayers">
              <li data-type="fajr">
                <div className="inner">
                    <span className="title">
                      <BrightnessHighIcon/>
                      اذان صبح
                    </span>
                  <span className="time">{prayersData[selectedCityCoords].fajr}</span>
                </div>
              </li>
              <li data-type="sunrise">
                <div className="inner">
                    <span className="title">
                      <SunriseIcon/>
                      طلوع آفتاب
                    </span>
                  <span className="time">{prayersData[selectedCityCoords].sunrise}</span>
                </div>
              </li>
              <li data-type="dhuhr">
                <div className="inner">
                    <span className="title">
                      <SunIcon/>
                      اذان ظهر
                    </span>
                  <span className="time">{prayersData[selectedCityCoords].dhuhr}</span>
                </div>
              </li>
              <li data-type="sunset">
                <div className="inner">
                    <span className="title">
                      <SunsetIcon/>
                        غروب خورشید
                    </span>
                  <span className="time">{prayersData[selectedCityCoords].sunset}</span>
                </div>
              </li>
              <li data-type="maghrib">
                <div className="inner">
                    <span className="title">
                      <BrightnessMoonIcon/>
                      اذان مغرب
                    </span>
                  <span className="time">{prayersData[selectedCityCoords].maghrib}</span>
                </div>
              </li>
              <li data-type="midnight">
                <div className="inner">
                    <span className="title">
                      <MoonIcon/>
                      نیمه‌شب شرعی
                    </span>
                  <span className="time">{prayersData[selectedCityCoords].midnight}</span>
                </div>
              </li>
            </ul>
          </>
        ) : (<Loading/>)}
      </div>
      <FocusContext.Provider value={focusKey}>
        <div className='locations' ref={ref}>
          {locations.map((province, index) => (
            <LocationItem key={index} province={province} selectedCityCoords={selectedCityCoords} changeCity={changeCity}/>
          ))}
        </div>
        <div className='map'>
          <IranMap selectedProvince={selectedCityName}/>
        </div>
      </FocusContext.Provider>
    </PrayerTimesStyles>
  );
}

export default PrayerTimes;
