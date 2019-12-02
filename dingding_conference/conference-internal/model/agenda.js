import {Http} from '../utils/http';
import {InterAction} from "../utils/native-api/interface/interaction";

class Agenda {
    static async getAgenda() {

        const agenda = await Http.request({
            url: '5d8b1976c8132',
        });
        if (agenda.code === 1) {
            return agenda.data;
        } else {
            InterAction.fnAlert('抱歉', '加载议题失败，请检查网络...', '好的');
        }
    }
}

export {
    Agenda
}
