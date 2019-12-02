import {ApiUrlConstant} from "../../config/ApiUrlConstant";
import {Http} from "../../utils/http";
import {InterAction} from "../../utils/native-api/interface/interaction";
import {InteractionEnum} from "../../utils/native-api/interface/InteractionEnum";

class CheckIn {
    /**
     * 发送签到消息
     * @param mid
     * @param uid
     * @param address
     * @param distance
     * @param leaveType
     * @param leaveReason
     * @returns {Promise<*>}
     */
    static async submitCheckInInfo({mid, uid, address, distance, leaveType, leaveReason}) {
        const res = await Http.request({
            url: `${ApiUrlConstant.CHECK_IN}`,
            data: {
                mid: mid,
                uid: uid,
                address: address,
                distance: distance,
                leaveType: leaveType,
                leaveReason: leaveReason
            },
        });
        console.log('res', res);
        if (res.code === 1) {
            return res.data;
        } else {
            InterAction.fnShowToast(`${res.msg}`, InteractionEnum.DD_SHOW_TOAST_TYPE_fail, InteractionEnum.DD_SHOW_TOAST_DURATION);
        }
    }
}

export {
    CheckIn
}