import { Service } from "../../libs";

export class QuranService extends Service {

    public getSurahList(): JQuery.jqXHR {
        return this.http.get(this.api.get('quran', 'surah'));
    }

    public getSurah(surahId: number): JQuery.jqXHR {
        return this.http.get(this.api.get('quran', 'surah/' + surahId));
    }

}
