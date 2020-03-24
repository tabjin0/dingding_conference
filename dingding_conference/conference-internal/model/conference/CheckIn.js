import {ApiUrlConstant} from "../../config/ApiUrlConstant";
import {Http} from "../../utils/http";
import {InterAction} from "../../utils/native-api/interface/interaction";
import {InteractionEnum} from "../../utils/native-api/interface/InteractionEnum";

class CheckIn {
    /**
     * 发送签到消息
     * @param checkInInfo
     * @returns {Promise<*>}
     */
    static async submitCheckInInfo(checkInInfo) {
        const res = await Http.request({
            url: `${ApiUrlConstant.CHECK_IN}`,
            data: {
                mid: checkInInfo.mid,
                uid: checkInInfo.uid,
                address: checkInInfo.address,
                distance: checkInInfo.distance,
                leaveType: checkInInfo.leaveType,
                leaveReason: checkInInfo.leaveReason
            },
        });
        if (res.code === 1) {
            return res.data;
        } else {
            console.log(res)
            InterAction.fnShowToast(`${res.msg}`, InteractionEnum.DD_SHOW_TOAST_TYPE_fail, InteractionEnum.DD_SHOW_TOAST_DURATION);
        }
    }
}

export {
    CheckIn
}
