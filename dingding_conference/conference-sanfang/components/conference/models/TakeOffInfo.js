/**
 * 签到信息模型
 */
import { Common } from "../../../utils/tabjin-utils/common";
import { CheckInException } from "../../../exception/exception";
import { InteractionEnum } from "../../../utils/native-api/interface/InteractionEnum";
import { InterAction } from "../../../utils/native-api/interface/interaction";

class TakeOffInfo {
    mid;
    uid;
    address;
    distance;
    leaveType;
    leaveReason;

    constructor(mid, uid, address, distance, leaveType, leaveReason) {
        this.mid = mid;
        this.uid = uid;
        this.address = address;
        this.distance = distance;
        this.leaveType = leaveType;
        this.leaveReason = leaveReason;
    }

    dataIntrospection() {
        return this._introspection();
    }

    /**
     * 对象数据内省
     * @returns {boolean}
     * @private
     */
    _introspection() {
        if (Common.isEmpty(this.mid)) {
            console.log(`${CheckInException.MID_NULL}`);
            return false;
        }
        if (Common.isEmpty(this.uid)) {
            console.log(`${CheckInException.UID_NULL}`);
            return false;
        }
        if (!this.leaveType) {
            InterAction.fnShowToast('请假类型不能为空', InteractionEnum.DD_SHOW_TOAST_TYPE_EXCEPTION, InteractionEnum.DD_SHOW_TOAST_DURATION);
            return false;
        }
        if (!this.leaveReason) {
            InterAction.fnShowToast('请假理由不能为空', InteractionEnum.DD_SHOW_TOAST_TYPE_EXCEPTION, InteractionEnum.DD_SHOW_TOAST_DURATION);
            return false;
        }
        return true;
    }
}

export {
    TakeOffInfo
}