import {Storage} from "../../utils/storage";
import {ApiAccessToken} from "../../core/authentication/apiAccessToken";
import {Conference} from "../../model/conference/conference";
import {Navigate} from "../../utils/native-api/interface/navigate";
import {PageUrlConstant} from "../../config/pageUrlConstant";
import {Caching} from "../../utils/native-api/caching/caching";
import {FreeLogin} from "../../core/authentication/FreeLogin";
import {InterAction} from "../../utils/native-api/interface/interaction";
import {CheckLogin} from "../../core/authentication/CheckLogin";

const app = getApp();


//内网穿透工具介绍:
// https://open-doc.dingtalk.com/microapp/debug/ucof2g
//替换成开发者后台设置的安全域名
// let domain = "http://127.0.0.1:8888";
let domain = "http://tabjin.vaiwan.com";//这边不需要加端口

let url = domain + '/login';

Page({
    data: {
        isLeaderInDepts: false,// 默认不是部门主管

        hasMeeting: false,

        nowConferenceList: null,// 当前会议
        futureConferenceList: null,// 预备会议
        pastConferenceList: null,// 历史会议

        isShowNowConferenceList: false,// 默认不显示当前会议列表
        isShowFutureConferenceList: false,// 默认不显示预备会议列表
        isShowPastConferenceList: false,// 默认不显示历史会议列表
    },

    async onLoad() {
    },

    async onShow() {
        dd.showLoading({content: '加载中...'});
        await this.initData();
        // const res = await ApiAccessToken.initAccessToken();
        dd.hideLoading();
    },

    /**
     * 下拉刷新
     */
    async onPullDownRefresh() {
        await this.removeCache();
        await this.initData();// 重新初始化会议列表
        dd.stopPullDownRefresh();
    },

    async removeCache() {
        try {
            await Caching.removeStorageSync('AccessToken');
            await Caching.removeStorageSync('AccessTokenTime');
            await Caching.removeStorageSync('currentUser');
            await Caching.removeStorageSync('department');
            await Caching.removeStorageSync('dev_id');
            await Caching.removeStorageSync('isLeaderInDepts');
            await Caching.removeStorageSync('orgId');
            await Caching.removeStorageSync('orgName');
            await Caching.removeStorageSync('user');
        } catch (err) {
            console.log('err', err);
        }
    },

    async initUser() {
        await CheckLogin.fnRecheck();
    },

    /**
     * 初始化页面骨架数据
     */
    async initData() {
        await this.initUser();
        const currentUser = Caching.getStorageSync('currentUser');
        if (currentUser) {
            const orgName = currentUser.basicCurrentUserInfo.orgName == undefined ? '支部' : currentUser.basicCurrentUserInfo.orgName;
            await Navigate.setNavigationBar(`${orgName}`, '#D40029');
            this.setData({
                isLeaderInDepts: Caching.getStorageSync('isLeaderInDepts')
            });
            // 获取会议列表
            this.initConferenceData();
        } else {
            InterAction.fnShowToast('初始化页面失败', 'none', 2000);
        }
    },


    /** 初始化会议数据 */
    async initConferenceData() {
        let that = this;
        const currentUserid = Storage.getStorageSyncByKey('user');

        // const conferenceList = await Conference.getConferenceList();// 获取会议列表
        const conferenceListByUserId = await Conference.getConferenceList(currentUserid);// 获取当前用户会议列表，因为涉及到用户签到情况

        const nowConferenceList = conferenceListByUserId.now;// 当前会议
        const futureConferenceList = conferenceListByUserId.future;// 预备会议
        const pastConferenceList = conferenceListByUserId.past;// 当前用户历史会议
        const ishasMeeting = nowConferenceList.length == 0 && futureConferenceList.length == 0 && pastConferenceList.length == 0;
        this.setData({
            hasMeeting: ishasMeeting,
            nowConferenceList: nowConferenceList,// 当前会议
            futureConferenceList: futureConferenceList,// 预备会议
            pastConferenceList: pastConferenceList,// 当前用户历史会议
            isShowNowConferenceList: nowConferenceList.length == 0 ? false : true,
            isShowFutureConferenceList: futureConferenceList.length == 0 ? false : true,
            isShowPastConferenceList: pastConferenceList.length == 0 ? false : true,
        });
    },

    /**
     * 管理员新增会议
     */
    addConference() {
        Navigate.navigateTo(PageUrlConstant.addConference);
    },
})
