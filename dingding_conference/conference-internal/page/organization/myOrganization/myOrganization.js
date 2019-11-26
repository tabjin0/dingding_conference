import {PartyMember} from "../../../model/partyMember";

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
        dd.showLoading({content: '加载中...'})
        await this.initData();
        dd.hideLoading();
    },

    async onShow() {
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
            organizationPartyMember: partyMemberInfo
        })
    },

    /**
     * 初始化党员基本信息
     */
    async initPartyMenberInfo() {
        const partyMemberInfoRes = await PartyMember.getPartyMemberInfo(1);
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
