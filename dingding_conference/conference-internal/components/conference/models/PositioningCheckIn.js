import {InterAction} from "../../../utils/native-api/interface/interaction";
import {Common} from "../../../utils/tabjin-utils/common";
import {LocationUtils} from "../../../utils/native-api/location/location";
import {LocationUtilsCustomized} from "../../../utils/tabjin-utils/location";
import {CheckIn} from "../../../model/conference/CheckIn";
import {Caching} from "../../../utils/native-api/caching/caching";
import {CheckInInfo} from "./checkInInfo";
import {OperationGroupJudger} from "./operation/operationGroupJudger";
import {InteractionEnum} from "../../../utils/native-api/interface/InteractionEnum";

class PositioningCheckIn {
    currentConference;// 当前会议
    operationGroup;// 操作按钮组

    constructor(conference) {
        this.currentConference = conference;
    }

    async checkIn() {
        if (!this.currentConference) {// 无前会议信息
            InterAction.fnShowToast('未获取到当前会议，请重启应用', InteractionEnum.DD_SHOW_TOAST_TYPE_EXCEPTION, InteractionEnum.DD_SHOW_TOAST_DURATION);
        } else { // 当前会议非空，绑定当前用户与其参加会议的签到行为
            // TODO 首先判断当前用户是否在参加人员中，实际上不需要判断，因为会议列表是定向展示
            await this._initLocationInfo(this.currentConference);
        }
    }

    async _initLocationInfo(currentConference) {
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

        const checkInInfo = new CheckInInfo(
            currentConference.id,
            Caching.getStorageSync('currentUser').basicCurrentUserInfo.userid,
            res.address,
            distance,
            "",
            ""
        );
        if (checkInInfo.dataCheck) {
            // 签到对象包装成功，发送CheckIn对象进行签到
            delete checkInInfo.dataCheck;
            const checkInInfoRes = await CheckIn.submitCheckInInfo(checkInInfo);
            let operationGroupJudger = new OperationGroupJudger(checkInInfoRes.sign_type);
            this.operationGroup = operationGroupJudger;
        }
    }
}

export {
    PositioningCheckIn
}