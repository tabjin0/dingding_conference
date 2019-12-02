import {System} from '../../model/system';
import {FreeLogin} from "../../model/FreeLogin";
import {Storage} from "../../utils/storage";
import {VersionController} from "../../model/version/VersionController";
import {ApiAccessToken} from "../../model/authentication/apiAccessToken";
import {Conference} from "../../model/conference/conference";
import {Navigate} from "../../utils/native-api/interface/navigate";
import {PageUrlConstant} from "../../config/pageUrlConstant";

const app = getApp();


//内网穿透工具介绍:
// https://open-doc.dingtalk.com/microapp/debug/ucof2g
//替换成开发者后台设置的安全域名
// let domain = "http://127.0.0.1:8888";
let domain = "http://tabjin.vaiwan.com";//这边不需要加端口

let url = domain + '/login';

Page({
    data: {
        corpId: '',
        authCode: '',
        administrator: '',
        userId: '',
        userName: '',
        isAdmin: false,// 默认不是管理员
        isLeaderInDepts: false,// 默认不是部门主管
        hideList: true,

        hasMeeting: true,// 默认有会议的

        nowConferenceList: null,// 当前会议
        futureConferenceList: null,// 预备会议
        pastConferenceList: null,// 历史会议

        isShowNowConferenceList: false,// 默认不显示当前会议列表
        isShowFutureConferenceList: false,// 默认不显示预备会议列表
        isShowPastConferenceList: false,// 默认不显示历史会议列表

        isNeedCheckIn: true,// 默认需要签到
    },

    async onLoad() {
        dd.showLoading({content: '加载中...'}); // ok
        this.initData();// 重新初始化会议列表
        dd.hideLoading(); // ok
    },

    async onShow() {
        // dd.showLoading({content: '加载中...'}); // ok
        this.initData();// 重新初始化会议列表

        const res = await ApiAccessToken.initAccessToken();
    },

    /**
     * 初始化页面数据
     */
    async initData() {

        const authCode = await System.loginSystem();// 获取钉钉免登授权码
        const currentUser = await FreeLogin.freeLogin(authCode.authCode, app.globalData.corpId);// 用户登录并进入缓存
        console.log('currentUser', currentUser);

        this.setData({
            isAdmin: currentUser.currentUser.isAdmin,
            isLeaderInDepts: Storage.getStorageSyncByKey('isLeaderInDepts')
        });

        this.initConferenceData();// 获取会议列表
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

        // 控制列表显示，没有会议，展示"暂无会议"


        // 有会议
        if (nowConferenceList.length == 0) {// 没有当前会议，不显示
            that.setData({
                isShowNowConferenceList: false
            })
        } else {
            that.setData({
                isShowNowConferenceList: true
            })
        }
        if (futureConferenceList.length == 0) {// 没有预备会议，不显示
            that.setData({
                isShowFutureConferenceList: false
            })
        } else {
            that.setData({
                isShowFutureConferenceList: true
            })
        }
        if (pastConferenceList.length == 0) {// 没有历史会议，不显示
            that.setData({
                isShowPastConferenceList: false
            })
        } else {
            that.setData({
                isShowPastConferenceList: true
            })
        }

        if (nowConferenceList.length == 0 &&
            futureConferenceList.length == 0 &&
            pastConferenceList.length == 0) {
            that.setData({
                hasMeeting: false
            });
            // InterAction.fnShowToast('exception', '无会议记录', 2000);
        } else {
            that.setData({
                hasMeeting: true
            });
        }

        // 将当前用户
        this.setData({
            nowConferenceList: nowConferenceList,// 当前会议
            futureConferenceList: futureConferenceList,// 预备会议
            pastConferenceList: pastConferenceList,// 当前用户历史会议
        });


    },

    /**
     * 下拉刷新
     */
    async onPullDownRefresh() {
        this.initData();// 重新初始化会议列表
        dd.stopPullDownRefresh();
    },

    /**
     * 跳转到会议详情
     * @param e
     */
    toConferenceDetail(e) {
        console.log('e');
        console.log(e);
        let conference = e.target.dataset.conference;
        let mid = conference.id;
        dd.navigateTo({
            url: '/page/meetingAgenda/conferenceDetail/conferenceDetail?mid=' + mid,
            success: (res) => {
                console.log(res);
            },
            fail: (res) => {
                console.log(res);
            }
        });
    },

    /**
     * 管理员新增会议
     */
    addConference() {
        Navigate.navigateTo(PageUrlConstant.addConference);
    },
})