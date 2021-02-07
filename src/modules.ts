import PrayerTimesModule from './modules/prayer-times/prayer-times.module';
import WeatherModule from './modules/weather/weather.module';
import ScheduleCarouselModule from './modules/schedule-carousel/schedule-carousel.module';
import GamesModule from './modules/games/games.module';
import StreamModule from './modules/stream/stream.module';
import InfoModule from './modules/info/info.module';
import NewsModule from './modules/news/news.module';
import ProgramModule from './modules/program/program.module';
import MarketModule from './modules/market/market.module';
import QuranModule from './modules/quran/quran.module';
import TehranAirModule from "./modules/tehran-air/tehran-air.module";
import AboutChannelModule from './modules/about-channel/about-channel.module';
// import PollModule from './modules/poll/poll.module';
import FaqModule from "./modules/faq/faq.module";
import UnderConstructionModule from './modules/under-construction/under-construction.module';
import SepehrModule from "./modules/sepehr/sepehr.module";

export const modules = {
    'prayer-times': PrayerTimesModule,
    'weather': WeatherModule,
    'schedule-carousel': ScheduleCarouselModule,
    'games': GamesModule,
    'stream': StreamModule,
    'info': InfoModule,
    'news': NewsModule,
    'vod': ProgramModule,
    'market': MarketModule,
    'quran': QuranModule,
    'tehran-air': TehranAirModule,
    // 'poll': PollModule,
    'news-teaching': NewsModule,
    'tourism': NewsModule,
    'news-multimedia': NewsModule,
    'uhd-programs': NewsModule,
    'about-channel': AboutChannelModule,
    'faq': FaqModule,
    'under-construction': UnderConstructionModule,
	'sepehr': SepehrModule,
};
