import { HomeIcon } from '../icons/Home';
import { ScheduleIcon } from '../icons/Schedule';
import { InfoCardIcon } from '../icons/InfoCard';
import { NewspaperIcon } from '../icons/Newspaper';
import { TVInfoIcon } from '../icons/TVInfo';
import { QuestionIcon } from '../icons/Question';
import { SunriseIcon } from '../icons/Sunrise';
import { WeatherIcon } from '../icons/Weather';
import { BookIcon } from '../icons/Book';
import { GameIcon } from '../icons/Game';
import { TVPlayIcon } from '../icons/TVPlay';
import React from 'react';
import { AntennaIcon } from '../icons/Antenna';

export const menuItems = [
  {
    title: 'رویدادها',
    route: 'events',
    icon: <HomeIcon/>,
  },
  {
    title: 'جدول پخش',
    route: 'schedule',
    icon: <ScheduleIcon/>,
  },
  {
    title: 'معرفی برنامه‌ها',
    route: 'programs',
    icon: <InfoCardIcon/>,
  },
  {
    title: 'اخبار',
    route: 'news',
    icon: <NewspaperIcon/>,
  },
  {
    title: 'درباره شبکه فراتر',
    route: 'about',
    icon: <TVInfoIcon/>,
  },
  {
    title: 'راهنمای دریافت',
    route: 'frequencies',
    icon: <AntennaIcon/>,
  },
  {
    title: 'سوالات متداول',
    route: 'faq',
    icon: <QuestionIcon/>,
  },
  {
    title: 'اوقات شرعی',
    route: 'prayers',
    icon: <SunriseIcon/>,
  },
  {
    title: 'آب و هوا',
    route: 'weather',
    icon: <WeatherIcon/>,
  },
  {
    title: 'قرآن کریم',
    route: 'quran',
    icon: <BookIcon/>,
  },
  {
    title: 'بازی',
    route: 'games',
    icon: <GameIcon/>,
  },
  {
    title: 'تلویزیون تعاملی',
    route: 'sepehr',
    icon: <TVPlayIcon/>,
  },
];
