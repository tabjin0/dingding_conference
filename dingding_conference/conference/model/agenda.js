import {Http} from '../utils/http';

class Agenda {
    static async getAgenda() {

        const agenda = await Http.request({
            url: '5d8b1976c8132',
        });
        if (agenda.code === 1) {
            return agenda.data;
        } else {
            dd.alert({content: '加载议题失败，请检查网络...'});
        }
    }
}

export {
    Agenda
}
