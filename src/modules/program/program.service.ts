import {Service} from '../../libs/service';

export class ProgramService extends Service {

    constructor() {
        super();
    }

    getLatest() {
        return this.http.get(this.api.get('program.latest'));
    }

    getList(programType: number) {
        return this.http.get(this.api.get('program.list').replace(/{programType}/, programType.toString()));
    }

    getEpisodes(programId: number) {
        return this.http.get(this.api.get('program.episodes').replace(/{programId}/, programId.toString()));
    }

}