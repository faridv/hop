import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout';
import Launcher from './Launcher';
import News from './News';
import Schedule from './Schedule';
import About from './About';
import Faq from './Faq';
import PrayerTimes from './PrayerTimes';
import Weather from './Weather';
import Quran from './Quran';
import Games from './Games';
import Sepehr from './Sepehr';
import NewsDetail from './NewsDetail';
import QuranSurah from './QuranSurah';
import SepehrChannel from './SepehrChannel';

function PageRouter() {
  return (
    <Routes>
      <Route path={''} element={<Layout/>}>
        <Route index element={<Launcher/>}/>
        <Route path={'events'} element={<News type='events'/>}/>
        <Route path={'events/:id'} element={<NewsDetail/>}/>
        <Route path={'schedule'} element={<Schedule/>}/>
        <Route path={'programs'} element={<News type='programs'/>}/>
        <Route path={'programs/:id'} element={<NewsDetail/>}/>
        <Route path={'news'} element={<News type='news'/>}/>
        <Route path={'news/:id'} element={<NewsDetail/>}/>
        <Route path={'about'} element={<About type='about'/>}/>
        <Route path={'frequencies'} element={<About type='frequencies'/>}/>
        <Route path={'faq'} element={<Faq/>}/>
        <Route path={'prayers'} element={<PrayerTimes/>}/>
        <Route path={'weather'} element={<Weather/>}/>
        <Route path={'quran'} element={<Quran/>}/>
        <Route path={'quran/:id'} element={<QuranSurah/>}/>
        <Route path={'games'} element={<Games/>}/>
        <Route path={'sepehr'} element={<Sepehr/>}/>
        <Route path={'sepehr/:channel'} element={<SepehrChannel/>}/>
      </Route>
    </Routes>
  )
}

export default PageRouter;
