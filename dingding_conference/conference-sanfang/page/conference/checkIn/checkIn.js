import {PositionCaculator} from "../../../model/conference/positionCaculator";
import {CheckInInfo} from "../../../components/conference/models/checkInInfo";
import {Caching} from "../../../utils/native-api/caching/caching";
import {CheckIn} from "../../../model/conference/CheckIn";
import {StringReplace} from "../../../utils/tabjin-utils/string/replace";
import {Storage} from "../../../utils/storage";
import {Conference} from "../../../model/conference/conference";

Page({
    data: {
        currentConference: Object,// 当前会议
        checkInTime: '',// 前端签到时间
        checkInTimeLock: false,// 签到时间锁
    },
    onLoad(params) {
        console.log(params)
        let currentConference = JSON.parse(params.conference);
        console.log(`checkin currentConference:`, currentConference);
        if (currentConference) {
            this.setData({
                currentConference: currentConference
            })
        }
    },

    async onShow() {
        if (this.data.currentConference) {
            await this.refreshCurrentConference(this.data.currentConference);
        } else {
            console.log(`签到界面 onShow 未拿到当前会议`);
        }

    },

    async onCheckIn() {
        const currentConference = this.data.currentConference;
        const positionCaculator = new PositionCaculator(currentConference.roomId.location);
        const {distance, currentLocation} = await positionCaculator.CacuDistance();
        // console.log(`distance: `, distance);

        const checkInInfo = new CheckInInfo(
            currentConference.id,
            Caching.getStorageSync('currentUser').basicCurrentUserInfo.userid,
            currentLocation.address,
            distance,
            "",
            ""
        );
        if (checkInInfo.dataCheck) {
            // 签到对象包装成功，发送CheckIn对象进行签到
            delete checkInInfo.dataCheck;
            const checkInInfoRes = await CheckIn.submitCheckInInfo(checkInInfo);
            console.log(checkInInfoRes);

            this.setData({
                checkInTime: StringReplace.slash2hyphen(new Date().toLocaleString('chinese', {hour12: false}))
            });
        }
        // TODO 刷新会议信息
        await this.refreshCurrentConference(currentConference);

    },

    async refreshCurrentConference(target) {
        const userId = Storage.getStorageSyncByKey('user');

        let currentConferenceRefresh = {};
        if (this.data.currentConference) {
            currentConferenceRefresh = await Conference.getConferenceDetail(target.id, userId);
        }
        console.log(`refresh`, currentConferenceRefresh)
        this.setData({
            currentConference: currentConferenceRefresh
        })
    },

    relocation() {

    }
});
