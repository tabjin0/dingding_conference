/**
 * 签到信息模型
 */
import {Common} from "../../../utils/tabjin-utils/common";
import {CheckInException} from "../../../exception/exception";

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
            console.log(`${CheckInException.LEAVETYPE_NULL}`);
            return false;
        }
        if (!this.leaveReason) {
            console.log(`${CheckInException.LEAVEREASON_NULL}`);
            return false;
        }
        return true;
    }

}

export {
    TakeOffInfo
}