import httpHelper from "../../_helpers/http.helper";
import {ApiHelper} from "../../_helpers/api.helper";

export class ProgramService {

    private static _instance: ProgramService;
    private http = httpHelper;

    constructor() {
    }

    getLatest() {
        return this.http.get(ApiHelper.get('program.latest'));
    }

    getList(programType: number) {
        return this.http.get(ApiHelper.get('program.list').replace(/{programType}/, programType.toString()));
    }

    getEpisodes(programId: number) {
        return this.http.get(ApiHelper.get('program.episodes').replace(/{programId}/, programId.toString()));
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }
}