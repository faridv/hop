import {Service} from "../../libs";

export class QuranService extends Service {

    constructor() {
        super();
    }

    getSurahList() {
        return this.http.get(this.api.get('quran', 'surah'));
    }

    getSurah(surahId: number) {
        return this.http.get(this.api.get('quran', 'surah/' + surahId));
    }

}