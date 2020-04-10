import {PartyMember} from "../../../model/organization/partyMember";
import {Caching} from "../../../utils/native-api/caching/caching";
import {CheckLogin} from "../../../core/authentication/CheckLogin";
import {PageUrlConstant} from "../../../config/pageUrlConstant";
import {Navigate} from "../../../utils/native-api/interface/navigate";

const app = getApp();

Page({
    data: {
        organizationPartyMember: [],
        defaultAvatar: [
            '/resources/icon/common/male.png',
            '/resources/icon/common/female.png',
        ],
        partyMemberInfos: [{
            img: "/resources/icon/organization/member1.png",
            name: "党支部情况",
            url: PageUrlConstant.partyBranchInfo
        }, {
            img: "/resources/icon/organization/member2.png",
            name: "党小组划分",
        }, {
            img: "/resources/icon/organization/member3.png",
            name: "党员名册",
        }, {
            img: "/resources/icon/organization/member4.png",
            name: "入党积极分子名册",
        }, {
            img: "/resources/icon/organization/member5.png",
            name: "流入党员情况",
        }, {
            img: "/resources/icon/organization/member6.png",
            name: "流出党员情况",
        }, {
            img: "/resources/icon/organization/member7.png",
            name: "党员受党内、行政奖励情况",
        }, {
            img: "/resources/icon/organization/member8.png",
            // name: "党员受党内、行政处分和不合格党员处置情况",
            name: "党员受党内、行政处分和不合格党员处置情况",
        }],
        workManage: [{
            img: "/resources/icon/organization/work1.png",
            name: "党支部改选情况",
        }, {
            img: "/resources/icon/organization/work2.png",
            name: "党支部任期目标",
        }, {
            img: "/resources/icon/organization/work3.png",
            name: "党支部年度工作计划",
        }, {
            img: "/resources/icon/organization/work4.png",
            name: "党支部年度工作总结",
        }, {
            img: "/resources/icon/organization/work5.png",
            name: "民主评议党员情况",
        }, {
            img: "/resources/icon/organization/work6.png",
            name: "党支部组织生活情况",
        }, {
            img: "/resources/icon/organization/work7.png",
            name: "谈心谈话情况",
        }, {
            img: "/resources/icon/organization/work8.png",
            name: "党员交纳党费情况",
        }],
    },

    async onLoad() {
        await CheckLogin.fnRecheck();
        await this.initData();
    },

    // async onShow() {
    //     await CheckLogin.fnRecheck();
    //     await this.initData();
    // },

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
    },

    onTapGrid(e) {
        console.log(`e`, e)
        Navigate.navigateTo(e.cell.url);
    }


});
