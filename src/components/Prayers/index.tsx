import React from "react";
import { BrightnessHighIcon } from "../../icons/BrightnessHigh";
import { BrightnessMoonIcon } from "../../icons/BrightnessMoon";
import { MoonIcon } from "../../icons/Moon";
import { SunIcon } from "../../icons/Sun";
import { SunriseIcon } from "../../icons/Sunrise";
import { SunsetIcon } from "../../icons/Sunset";
import { PrayerTimesStyles } from "../../pages/PrayerTimes/style";
import IranMap from "../IranMap";
import Loading from "../Loading";
import LocationItem from "../Location";
import { FocusContext, useFocusable } from "@noriginmedia/norigin-spatial-navigation";

interface PrayerTime {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  sunset: string;
  maghrib: string;
  midnight: string;
}

interface PrayerTimesData {
  [key: string]: PrayerTime;
}

interface Province {
  title: string;
  city: string;
  coords: number[];
}

interface PrayersProps {
  prayersData: PrayerTimesData;
  todayDate: string;
  selectedCityCoords: string;
  locations: Province[];
  changeCity: (cityCoords: string, cityName: string) => void;
  selectedCityName: string;
}

function Prayers({
  prayersData,
  todayDate,
  selectedCityCoords,
  locations,
  changeCity,
  selectedCityName,
}: PrayersProps) {
  const { ref, focusKey } = useFocusable();

  return (
    <PrayerTimesStyles>
      <div className="times" style={{ height: "340px" }}>
        {Object.keys(prayersData!).length ? (
          <>
            <h1 className="text-center text-md mt-6">
              اوقات شرعی &nbsp;{todayDate}
            </h1>
            <ul className="prayers">
              <li data-type="fajr">
                <div className="inner">
                  <span className="title">
                    <BrightnessHighIcon />
                    اذان صبح
                  </span>
                  <span className="time">
                    {prayersData![selectedCityCoords].fajr}
                  </span>
                </div>
              </li>
              <li data-type="sunrise">
                <div className="inner">
                  <span className="title">
                    <SunriseIcon />
                    طلوع آفتاب
                  </span>
                  <span className="time">
                    {prayersData![selectedCityCoords].sunrise}
                  </span>
                </div>
              </li>
              <li data-type="dhuhr">
                <div className="inner">
                  <span className="title">
                    <SunIcon />
                    اذان ظهر
                  </span>
                  <span className="time">
                    {prayersData![selectedCityCoords].dhuhr}
                  </span>
                </div>
              </li>
              <li data-type="sunset">
                <div className="inner">
                  <span className="title">
                    <SunsetIcon />
                    غروب خورشید
                  </span>
                  <span className="time">
                    {prayersData![selectedCityCoords].sunset}
                  </span>
                </div>
              </li>
              <li data-type="maghrib">
                <div className="inner">
                  <span className="title">
                    <BrightnessMoonIcon />
                    اذان مغرب
                  </span>
                  <span className="time">
                    {prayersData![selectedCityCoords].maghrib}
                  </span>
                </div>
              </li>
              <li data-type="midnight">
                <div className="inner">
                  <span className="title">
                    <MoonIcon />
                    نیمه‌شب شرعی
                  </span>
                  <span className="time">
                    {prayersData![selectedCityCoords].midnight}
                  </span>
                </div>
              </li>
            </ul>
          </>
        ) : (
          <Loading />
        )}
      </div>
      <FocusContext.Provider value={focusKey}>
        <div className="locations" ref={ref}>
          {locations.map((province, index) => (
            <LocationItem
              key={index}
              province={province}
              selectedCityCoords={selectedCityCoords}
              changeCity={changeCity}
            />
          ))}
        </div>
        <div className="map">
          <IranMap selectedProvince={selectedCityName} />
        </div>
      </FocusContext.Provider>
    </PrayerTimesStyles>
  );
}

export default Prayers;
