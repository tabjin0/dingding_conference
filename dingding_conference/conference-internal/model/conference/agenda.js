/**
 * 议题业务模型
 */

import {Http} from "../../utils/http";
import {InterAction} from "../interaction/interaction";

class Agenda {
    static async getAgenda() {

        const agenda = await Http.request({
            url: '5d8b1976c8132',
        });
        if (agenda.code === 1) {
            return agenda.data;
        } else {
            InterAction.fnShowToast('加载议题失败，请检查网络...', 'none', 2000, false);
        }
    }
}

export {
    Agenda
}
