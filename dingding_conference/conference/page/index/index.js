import {Conference} from '../../model/conference';
import {Agenda} from '../../model/agenda';
import {CheckIn} from '../../model/checkIn';
import {User} from '../../model/users';
import {System} from '../../model/system';
import {FreeLogin} from "../../model/FreeLogin";

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
        // isAdmin: true,// 默认是管理员
        hideList: true,

        nowConferenceList: null,// 当前会议
        futureConferenceList: null,// 预备会议
        pastConferenceList: null,// 历史会议

        isShowNowConferenceList: false,// 默认不显示当前会议列表
        isShowFutureConferenceList: false,// 默认不显示预备会议列表
        isShowPastConferenceList: false,// 默认不显示历史会议列表


        isNeedCheckIn: true,// 默认需要签到

        checkInInfo: {
            uid: '1219441916791739',// 签到用户
            address: '11,11',// 用户签到地点
            mid: 0,// 签到会议id
            type: "3",// 签到状态，0签到成功，1早到，2迟到，3未签到
            leaveType: '请假类型',
            leaveReason: '请假理由',
        },
        checkInRes: null,// 当前用户的签到情况

    },

    async onLoad() {
        this.initData();// 初始化页面数据
    },

    async onShow() {
        this.initData();// 重新初始化会议列表
    },

    /**
     * 初始化页面数据
     */
    async initData() {
        dd.showLoading({
            content: '加载中...'
        });
        const authCode = await System.loginSystem();// 获取钉钉免登授权码
        const freeLogin = await FreeLogin.freeLogin(authCode.authCode, app.globalData.corpId);// 用户登录并进入缓存
        let isAdmin = freeLogin.is_sys;
        this.setData({
            isAdmin: isAdmin
        });

        this.initConferenceData();// 获取会议列表
    },

    /** 初始化会议数据 */
    async initConferenceData() {
        let that = this;
        const currentUser = await User.getUserFromStorage();
        console.log('初始化会议数据，当前用户');
        console.log(currentUser);
        const conferenceList = await Conference.getConferenceList();// 获取会议列表
        const conferenceListByUserId = await Conference.getConferenceList(currentUser.user);// 获取当前用户会议列表，因为涉及到用户签到情况
        console.log(conferenceList);
        console.log(conferenceListByUserId);
        dd.hideLoading();

        const nowConferenceList = conferenceList.data.now;// 当前会议
        const futureConferenceList = conferenceList.data.future;// 预备会议
        const pastConferenceList = conferenceListByUserId.data.past;// 当前用户历史会议

        // 控制列表显示
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
        console.log('onPullDownRefresh');
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
        dd.navigateTo({
            url: '/page/meetingAgenda/addConference/addConference',
            success: (res) => {

            },
            fail: (res) => {

            }
        })
    },
})