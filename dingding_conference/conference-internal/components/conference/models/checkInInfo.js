/**
 * 签到信息模型
 */
import {Common} from "../../../utils/tabjin-utils/common";
import {CheckInException} from "../../../exception/exception";

class CheckInInfo {
    mid;
    uid;
    address;
    distance;
    leaveType;
    leaveReason;
    dataCheck = false;// 默认CheckInfo数据校验不通过

    constructor(mid, uid, address, distance, leaveType, leaveReason) {
        this.mid = mid;
        this.uid = uid;
        this.address = address;
        this.distance = distance;
        this.leaveType = leaveType;
        this.leaveReason = leaveReason;
        console.log('mid', mid);
        console.log('uid', uid);
        console.log('address', address);
        console.log('distance', distance);
        console.log('leaveType', leaveType);
        console.log('leaveReason', leaveReason);
        this._introspection();
    }

    dataIntrospection() {
        this._introspection();
        console.log('dataCheck', this.dataCheck);
    }

    /**
     * 对象数据内省
     * @returns {boolean}
     * @private
     */
    _introspection() {
        if (!this.mid) {
            console.log(`${CheckInException.MID_NULL}`);
            this.dataCheck = false;
        }
        if (!this.uid) {
            console.log(`${CheckInException.UID_NULL}`);
            this.dataCheck = false;
        }
        // if (!this.address) {
        //     console.log(`${CheckInException.ADDRESS_NULL}`);
        //     this.dataCheck = false;
        // }
        if (!this.distance) {
            console.log(`${CheckInException.DISTANCE_NULL}`);
            this.dataCheck = false;
        }
        this.dataCheck = true;
    }

}

export {
    CheckInInfo
}