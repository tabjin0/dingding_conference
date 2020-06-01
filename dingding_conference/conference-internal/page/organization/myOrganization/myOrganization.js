import {PageUrlConstant} from "../../../config/pageUrlConstant";
import {Navigate} from "../../../utils/native-api/interface/navigate";
import {PartyBranch} from "../../../model/party/party-branch";
import {InterAction} from "../../../utils/native-api/interface/interaction";
import {Caching} from "../../../utils/native-api/caching/caching";

const app = getApp();

Page({
    data: {
        menuList: [],
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
            url: PageUrlConstant.partyMembers
        }, {
            img: "/resources/icon/organization/member4.png",
            name: "入党积极分子名册",
            url: PageUrlConstant.partyActiveMember
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
            url: PageUrlConstant.electionSituationOfPartyBranch
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
        await this._init();
    },

    // async onShow() {
    //     await CheckLogin.fnRecheck();
    //     await this.initData();
    // },

    async _init() {
        await this._initMenu();
    },

    async _initMenu() {
        const menuList = await PartyBranch.getMenu(2);
        console.log(`menuList`, menuList);
        this.setData({
            menuList: menuList
        });
    },

    /**
     * 下拉刷新
     */
    async onPullDownRefresh() {
        this.setData({
            menuList: []
        })
        await this._init();
        dd.stopPullDownRefresh();
    },

    async onTapGrid(e) {
        console.log(`e`, e);
        if (e.cell.url) {
            await Navigate.navigateTo(`/page/organization/webView/webView?url=` + e.cell.url + 'type/2/orgId/' + await Caching.getStorageSync('orgId'));
        } else {
            InterAction.fnShowToast('暂无数据', 'none', 1500);
        }

    },

    onTapGridPartyInfo(e) {

    }
});
