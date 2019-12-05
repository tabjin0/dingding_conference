/**
 * 请假模型
 */

import {Common} from "../../../utils/tabjin-utils/common";
import {InterAction} from "../../../utils/native-api/interface/interaction";
import {LocationUtils} from "../../../utils/native-api/location/location";
import {Caching} from "../../../utils/native-api/caching/caching";
import {CheckIn} from "../../../model/conference/CheckIn";
import {TakeOffInfo} from "./TakeOffInfo";
import {InteractionEnum} from "../../../utils/native-api/interface/InteractionEnum";
import {Navigate} from "../../../utils/native-api/interface/navigate";
import {LocationUtilsCustomized} from "../../../utils/tabjin-utils/location";

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
        console.log('currentConference', currentConference);
        console.log('leaveType', leaveType);
        console.log('leaveReason', leaveReason);
        if (currentConference) {
            this.currentConference = currentConference;
        }
        if (leaveType) {
            this.leaveType = leaveType;
        }
        if (leaveReason) {
            this.leaveReason = leaveReason;
        }
        console.log('this.currentConference', this.currentConference);
        console.log('this.leaveType', this.leaveType);
        console.log('this.leaveReason', this.leaveReason);
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
            await this._initLocationInfo(this.currentConference, this.leaveType, this.leaveReason);
        }
    }

    /**
     * 初始化位置信息
     * @param currentConference 当前会议
     * @returns {Promise<void>}
     * @private
     */
    async _initLocationInfo(currentConference, leaveType, leaveReason) {
        // 会议室地点经纬度
        const currentLocation = currentConference.roomId.location.split(',');
        let longitude = parseFloat(currentLocation[0]);// 纬度
        let latitude = parseFloat(currentLocation[1]);// 经度（大）
        // 当前定位经纬度
        const res = await LocationUtils.fnGetLocation();
        const currentLongitude = parseFloat(res.longitude);
        const currentLatitude = parseFloat(res.latitude);

        let distance = 0;

        if (currentConference.roomId.location) {// 会议室经纬度不为空
            distance = LocationUtilsCustomized.getFlatternDistance(latitude, longitude, currentLatitude, currentLongitude);
        }
        // 包装请假对象
        const takeOffInfo = new TakeOffInfo(
            currentConference.id,
            Caching.getStorageSync('user'),
            res.address,
            distance,
            leaveType,
            leaveReason
        );
        console.log('takeOffInfo', takeOffInfo);
        if (takeOffInfo.dataIntrospection()) {
            // 签到对象包装成功，发送CheckIn对象进行签到
            const takeOffRes = await CheckIn.submitCheckInInfo(takeOffInfo);
            console.log('takeOffRes', takeOffRes);
            InterAction.fnShowToast('请假成功', InteractionEnum.DD_SHOW_TOAST_TYPE_SUCCESS, InteractionEnum.DD_SHOW_TOAST_DURATION);
            setTimeout(function () {
                Navigate.navigateBack(1);// 返回上一个页面
            }, 2000);
        }
    }

}

export {
    TakeOff
}