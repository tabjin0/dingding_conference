import {Caching} from "../../../utils/native-api/caching/caching";
import {CheckLogin} from "../../../core/authentication/CheckLogin";
import {PartyMemberDues} from "../../..//model/party-member-dues/partyMemberDues";
import {PartyDuesInfo} from "../../../model/party-member-dues/PartyDuesInfo";
import {Status} from "../../../config/status";
import {InterAction} from "../../../utils/native-api/interface/interaction";

const app = getApp();

Page({
    data: {
        conferenceStatistic: [],
        gridList: [],
        currentMonth: '',
        showPopup: false,
    },
    async onLoad() {
        await CheckLogin.fnRecheck();
        await this.initData();
        this.initDate();
    },

    async onPullDownRefresh() {
        await CheckLogin.fnRecheck();
        await this.initData();
        dd.stopPullDownRefresh();
    },

    /**
     * 初始化数据
     * @returns {Promise<void>}
     */
    async initData() {
        const userId = Caching.getStorageSync('user');
        const duesInfo = await PartyMemberDues.getDuesInfo(userId);
        for (let i = 0; i < duesInfo.length; i++) {
            duesInfo[i].month = duesInfo[i].month.replace('月', '');
        }
        this.setData({
            gridList: duesInfo
        });
    },

    async onTapGrid(e) {
        const userId = await Caching.getStorageSync('user');
        let nowDate = new Date();
        let partyDuesInfo = new PartyDuesInfo(userId, nowDate.toLocaleDateString(), 50, 4, 30);
        // console.log(`partyDuesInfo:`, partyDuesInfo);
        console.log(`e`, e)
        if (e.cell.status === Status.partyDuePayed) {
            InterAction.fnShowToast('党费已缴纳', 'success', 1500);
        } else {
            dd.tabjin.showPopup({
                zIndex: 777,
                animation: 'show',
                contentAlign: 'bottom',
                locked: false
            });
            // TODO
            const duesInfo = await PartyMemberDues.getDuesInfo(userId);
        }
    },

    initDate() {
        let nowDate = new Date();
        this.setData({
            currentMonth: (nowDate.getMonth() + 1).toString()
        });
    },

    onHidePupopTap() {
        console.log(`弹出层`);
    },

    tapPopup(e) {
        console.log(`tapPopup`, e);
    },

    tapTrue() {
        this.setData({
            showPopup: true
        });
        console.log(`tapTrue this.data.showPopup`, this.data.showPopup);
    },

    tapFalse() {
        this.setData({
            showPopup: false
        });
        console.log(`tapFalse this.data.showPopup`, this.data.showPopup);
    }
})
