import { Http } from '../utils/http';

class Agenda {
    static async getAgenda() {
        return await Http.request({
            url: '5d8b1976c8132',
        })
    }
}

export {
    Agenda
}
