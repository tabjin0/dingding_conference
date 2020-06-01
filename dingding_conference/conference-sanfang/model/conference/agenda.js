import {Http} from '../../utils/http';
import {InterAction} from "../../utils/native-api/interface/interaction";
import {InteractionEnum} from "../../utils/native-api/interface/InteractionEnum";
import {ApiUrlConstant} from "../../config/ApiUrlConstant";

class Agenda {
    static async getAgenda(orgId) {
        const agenda = await Http.request({
            url: `${ApiUrlConstant.AGENDA}`,
            data: {
                orgId: orgId
            }
        });
        if (agenda.code === 1) {
            return agenda.data;
        } else {
            InterAction.fnShowToast('加载议题失败，请检查网络...', InteractionEnum.DD_SHOW_TOAST_TYPE_EXCEPTION, InteractionEnum.DD_SHOW_TOAST_DURATION);
        }
    }
}

export {
    Agenda
}
