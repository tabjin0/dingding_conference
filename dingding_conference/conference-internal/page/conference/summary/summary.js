import {InterAction as Interaction} from "../../../utils/native-api/interface/interaction";
import {InteractionEnum} from "../../../utils/native-api/interface/InteractionEnum";
import {Summary} from "../../../model/conference/summary";
import {SummaryInfo} from "../../../model/conference/SummaryInfo";
import {Navigate} from "../../../utils/native-api/interface/navigate";
import {Caching} from "../../../utils/native-api/caching/caching";
import {FreeLogin} from "../../../core/authentication/FreeLogin";
import {CheckLogin} from "../../../core/authentication/CheckLogin";
import {PageUrlConstant} from "../../../config/pageUrlConstant";

Page({
    data: {
        mid: null,
        summary: '',
    },
    async onLoad(params) {
        await CheckLogin.fnRecheck();
        const conference = JSON.parse(params.conference);
        console.log('con', conference)
        this.setData({
            mid: conference.id,
            summary: conference.summary == null ? '' : conference.summary
        });
    },
    //
    // async onShow() {
    //    await this.initUser();
    // },
    //
    // async initUser() {
    //     if (!app.globalData.checkLogin || !Caching.getStorageSync('currentUser')) {
    //         const currentUser = await FreeLogin.currentUser();
    //         Caching.setStorageSync('currentUser', currentUser);// 用户登录并进入缓存
    //         app.globalData.checkLogin = true;
    //     }
    // },

    async formSubmit(e) {
        let mid = this.data.mid;
        let summary = e.detail.value.summary;
        let imgs = '';

        const summaryInfo = new SummaryInfo(mid, summary, imgs);
        if (summaryInfo.dateCheck()) {
            const res = await Summary.submitSummary(summaryInfo);
            Interaction.fnShowToast('您已成功提交会议纪要', InteractionEnum.DD_SHOW_TOAST_TYPE_SUCCESS, InteractionEnum.DD_SHOW_TOAST_DURATION);
            setTimeout(function () {
                Navigate.navigateTo(`${PageUrlConstant.conferenceDetail}?mid=` + mid);
            }, 2000);
        }
    }
});
