import {PartyMember} from "../../../model/organization/partyMember";
import {Caching} from "../../../utils/native-api/caching/caching";
import {CheckLogin} from "../../../core/authentication/CheckLogin";
import {Navigate} from "../../../utils/native-api/interface/navigate";
import {PageUrlConstant} from "../../../config/pageUrlConstant";

Page({
    data: {
        organizationPartyMember: [],
        defaultAvatar: [
            '/resources/icon/common/male.png',
            '/resources/icon/common/female.png',
        ],
    },
    async onLoad() {
        await CheckLogin.fnRecheck();
        await this.initData();
        console.log(`this.data`, this.data);
    },
    /**
     * 初始化党员基本信息
     */
    async initPartyMenberInfo() {
        const partyMemberInfoRes = await PartyMember.getPartyMemberInfo(Caching.getStorageSync('orgId'));
        console.log(`partyMemberInfoRes`, partyMemberInfoRes);
        let partyMemberInfo = partyMemberInfoRes.data;
        return partyMemberInfo;
    },

    /**
     * 初始化页面数据
     */
    async initData() {
        const partyMemberInfo = await this.initPartyMenberInfo();
        console.log(`partyMemberInfo`, partyMemberInfo)
        this.setData({
            organizationPartyMember: partyMemberInfo,
            partyBranchName: Caching.getStorageSync('orgName')
        });
    },

    onTapGrid(e) {
        let singleMember = e.cell;
        Navigate.navigateTo(`${PageUrlConstant.singleMember}?single=${JSON.stringify(singleMember)}`);
    },
});
