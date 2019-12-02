/**
 * 请假模型
 */

import {Common} from "../../../utils/tabjin-utils/common";
import {InterAction} from "../../../utils/native-api/interface/interaction";
import {LocationUtils} from "../../../utils/native-api/location/location";
import {Caching} from "../../../utils/native-api/caching/caching";
import {CheckIn} from "../../../model/conference/CheckIn";
import {TakeOffInfo} from "./TakeOffInfo";

class TakeOff {
    currentConference;
    leaveType;
    leaveReason

    /**
     * 构造函数
     * @param currentConference 当前会议
     * @param leaveType 请假类型
     * @param leaveReason 请假理由
     */
    constructor(currentConference, leaveType, leaveReason) {
        if (currentConference) {
            this.currentConference = currentConference;
        }
        if (leaveType) {
            this.leaveType = leaveType;
        }
        if (leaveReason) {
            this.leaveReason = leaveReason;
        }
        this._takeOff();
    }

    /**
     * 请假
     * @returns {Promise<void>}
     */
    async _takeOff() {
        if (Common.isNull(this.currentConference)) {// currentConference，提示为获取到当前会议
            // TODO 改新模型
            InterAction.fnAlert('抱歉', '未获取到当前会议，请重启应用', '好的');
        } else { //有当前会议信息，绑定当前用户与其参加会议的签到行为
            // TODO 首先判断当前用户是否在参加人员中
            await this._initLocationInfo(this.currentConference);
        }
    }

    /**
     * 初始化位置信息
     * @param currentConference 当前会议
     * @returns {Promise<void>}
     * @private
     */
    async _initLocationInfo(currentConference) {
        // 会议室地点经纬度
        let currentLocation = currentConference.roomId.location.split(',');
        let longitude = parseFloat(currentLocation[0]);// 纬度
        let latitude = parseFloat(currentLocation[1]);// 经度（大）

        // 当前定位经纬度
        const res = await LocationUtils.fnGetLocation();
        let currentLongitude = parseFloat(res.longitude);
        let currentLatitude = parseFloat(res.latitude);

        //
        const takeOffInfo = new TakeOffInfo(
            currentConference.id,
            Caching.getStorageSync('user'),
            // res.address,
            '',
            // LocationUtilsCustomized.getFlatternDistance(latitude, longitude, currentLatitude, currentLongitude),
            '',
            this.leaveType,
            this.leaveReason
        );
        if (takeOffInfo.dataCheck) {
            // 签到对象包装成功，发送CheckIn对象进行签到
            const takeOffRes = await CheckIn.submitCheckInInfo(takeOffInfo);
            console.log('takeOffRes', takeOffRes);

        }
    }

}

export {
    TakeOff
}