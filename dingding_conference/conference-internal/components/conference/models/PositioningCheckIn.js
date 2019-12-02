import {InterAction} from "../../../utils/native-api/interface/interaction";
import {Common} from "../../../utils/tabjin-utils/common";
import {LocationUtils} from "../../../utils/native-api/location/location";
import {LocationUtilsCustomized} from "../../../utils/tabjin-utils/location";
import {CheckIn} from "../../../model/conference/CheckIn";
import {Caching} from "../../../utils/native-api/caching/caching";
import {CheckInInfo} from "./checkInInfo";
import {OperationGroupJudger} from "./operation/operationGroupJudger";

class PositioningCheckIn {
    currentConference;// 当前会议
    operationGroup;// 操作按钮组

    constructor(conference) {
        this.currentConference = conference;
    }

    async checkIn() {
        if (Common.isNull(this.currentConference)) {// currentConference，提示为获取到当前会议
            // TODO 改新模型
            InterAction.fnAlert('抱歉', '未获取到当前会议，请重启应用', '好的');
        } else { //有当前会议信息，绑定当前用户与其参加会议的签到行为
            // TODO 首先判断当前用户是否在参加人员中

            await this._initLocationInfo(this.currentConference);
        }
    }

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
        const checkInInfo = new CheckInInfo(
            currentConference.id,
            Caching.getStorageSync('user'),
            res.address,
            LocationUtilsCustomized.getFlatternDistance(latitude, longitude, currentLatitude, currentLongitude),
            "",
            ""
        );
        if (checkInInfo.dataCheck) {
            // 签到对象包装成功，发送CheckIn对象进行签到
            const checkInInfoRes = await CheckIn.submitCheckInInfo(checkInInfo);
            let operationGroupJudger = new OperationGroupJudger(checkInInfoRes.sign_type);
            this.operationGroup = operationGroupJudger;
        }
    }
}

export {
    PositioningCheckIn
}