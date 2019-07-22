import httpHelper from "../../_helpers/http.helper";
import {ApiHelper} from "../../_helpers/api.helper";

export class QuranService {
    private static _instance: QuranService;
    private http = httpHelper;

    constructor() {
    }

    getSurahList() {
        return this.http.get(ApiHelper.get('quran', 'surah'));
    }

    getSurah(surahId: number) {
        return this.http.get(ApiHelper.get('quran', 'surah/${surahId}'));
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }
}