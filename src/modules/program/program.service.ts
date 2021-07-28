import { Service } from '../../libs/service';

export class ProgramService extends Service {

    public getLatest(): JQuery.jqXHR {
        return this.http.get(this.api.get('program.latest'));
    }

    public getList(programType: number): JQuery.jqXHR {
        return this.http.get(this.api.get('program.list').replace(/{programType}/, programType.toString()));
    }

    public getEpisodes(programId: number): JQuery.jqXHR {
        return this.http.get(this.api.get('program.episodes').replace(/{programId}/, programId.toString()));
    }

}
