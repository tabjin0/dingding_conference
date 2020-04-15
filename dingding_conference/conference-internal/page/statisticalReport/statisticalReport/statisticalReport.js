import {Caching} from "../../../utils/native-api/caching/caching";
import {CheckLogin} from "../../../core/authentication/CheckLogin";
import {PartyMemberDues} from "../../..//model/party-member-dues/partyMemberDues";

const app = getApp();

Page({
    data: {
        conferenceStatistic: [],
        gridList: [],
    },
    async onLoad() {
        await CheckLogin.fnRecheck();
        await this.initData();
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
        this.setData({
            gridList: duesInfo
        });
        console.log('online data duesInfo: ', duesInfo);
    },

    onTapGrid(e) {
        console.log('页面onTapGrid:', e);
    }
})
