/**
 * 党员模型
 */
import {Http} from "../../utils/http";
import {InterAction} from "../../utils/native-api/interface/interaction";
import {InteractionEnum} from "../../utils/native-api/interface/InteractionEnum";

class PartyMember {
    /**
     * 获取党员基本信息
     * @param corpId 组织id
     * @returns {Promise<*>}
     */
    static async getPartyMemberInfo(orgId) {
        const res = await Http.request({
            url: `5da9611d462d8`,
            data: {
                orgId
                // userid: userid
            }
        });
        if (res.code === 1) {
            return res.data;
        } else {
            InterAction.fnShowToast('获取支部信息失败', InteractionEnum.DD_SHOW_TOAST_TYPE_EXCEPTION, InteractionEnum.DD_SHOW_TOAST_DURATION);
        }
    }
}

export {
    PartyMember
}