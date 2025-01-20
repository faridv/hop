import React, { useCallback, useEffect, useState } from "react";
import { loadPrayerTimes } from "../../utils/api";
import { iranProvinces } from "../../data/iran-provinces";
import axios, { AxiosResponse } from "axios";
import moment from "moment-jalaali";
import Loading from "../../components/Loading";
import Prayers from "../../components/Prayers";

function PrayerTimes() {
  interface PrayerData {
    [key: string]: {
      fajr: string;
      sunrise: string;
      dhuhr: string;
      sunset: string;
      maghrib: string;
      midnight: string;
    };
  }

  const [prayersData, setPrayersData] = useState<PrayerData | null>(null);
  const [todayDate, setTodayDate] = useState("");
  const [selectedCityCoords, setSelectedCityCoords] = useState<string>("");
  const [selectedCityName, setSelectedCityName] = useState<string>("tehran");
  const locations: {
    city: string;
    title: string;
    coords: number[];
  }[] = iranProvinces;

  const changeCity = (cityCoords: string, cityName: string) => {
    // const cityCoords = event.target.getAttribute('data-coords');
    // const cityName = event.target.getAttribute('data-city');
    setSelectedCityCoords(cityCoords);
    setSelectedCityName(cityName);
    localStorage.setItem("selectedCity", cityCoords);
  };

  const loadData = useCallback((coordination: any[]) => {
    loadPrayerTimes(coordination.join(";")).then((response) => {
      setPrayersData(response.data);
    });
  }, []);

  useEffect(() => {
    const savedCity = localStorage.getItem("selectedCity") || "51.42,35.7"; // Tehran
    setSelectedCityCoords(savedCity);
    setSelectedCityName(
      locations.find((province) => province.coords.join(",") === savedCity)!
        .city
    );

    const coordination: string[] = [];
    locations.forEach((province) => {
      coordination.push(province.coords.join(","));
    });
    loadData(coordination);
  }, [loadData, locations]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_CLOCK_URL!)
      .then((response: AxiosResponse<string>) => {
        const serverTime: Date = new Date(response.data);
        setTodayDate(moment(serverTime).format("jYYYY/jM/jD"));
      });
  }, []);

  return prayersData ? (
    <Prayers
      prayersData={prayersData}
      selectedCityCoords={selectedCityCoords}
      todayDate={todayDate}
      selectedCityName={selectedCityName}
      locations={locations}
      changeCity={changeCity}
    />
  ) : (
    <Loading />
  );
}

export default PrayerTimes;
