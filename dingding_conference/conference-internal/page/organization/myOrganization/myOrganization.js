import {PartyMember} from "../../../model/organization/partyMember";
import {Caching} from "../../../utils/native-api/caching/caching";
import {FreeLogin} from "../../../model/authentication/FreeLogin";

const app = getApp();

Page({
    data: {
        organizationPartyMember: [],
        defaultAvatar: [
            '/resources/icon/common/male.png',
            '/resources/icon/common/female.png',
        ]
    },

    async onLoad() {
    },

    async onShow() {
        if (app.globalData.checkLogin) {
            return;
        } else {
            const currentUser = await FreeLogin.currentUser();
            Caching.setStorageSync('currentUser', currentUser);// 用户登录并进入缓存
        }
        await this.initData();
    },

    /**
     * 下拉刷新
     */
    async onPullDownRefresh() {
        await this.initData();
        dd.stopPullDownRefresh();
    },

    /**
     * 初始化页面数据
     */
    async initData() {
        const partyMemberInfo = await this.initPartyMenberInfo();
        this.setData({
            organizationPartyMember: partyMemberInfo,
            partyBranchName: Caching.getStorageSync('orgName')
        })
    },

    /**
     * 初始化党员基本信息
     */
    async initPartyMenberInfo() {
        const partyMemberInfoRes = await PartyMember.getPartyMemberInfo(Caching.getStorageSync('orgId'));
        console.log(partyMemberInfoRes);
        let partyMemberInfo = partyMemberInfoRes.data;
        // for (let i = 0; i < partyMemberInfo.length; i++) {
        //     if (app.isNull(partyMemberInfo[i].headImg)) {
        //         switch (partyMemberInfo[i].gender) {
        //             case '男':
        //                 partyMemberInfo[i].headImg = this.data.defaultAvatar[0];
        //                 break;
        //             case '女':
        //                 partyMemberInfo[i].headImg = this.data.defaultAvatar[1];
        //                 break;
        //         }
        //     }
        // }
        return partyMemberInfo;
    },

    toSingleMember(e) {
        console.log(e)
        let singleMember = e.target.dataset.singleMember;
        console.log(singleMember)
        dd.navigateTo({
            url: '/page/organization/singleMember/singleMember?single=' + JSON.stringify(singleMember)
        })
    }
});
