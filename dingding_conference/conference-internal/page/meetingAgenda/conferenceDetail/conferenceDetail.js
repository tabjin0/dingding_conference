import {Conference} from "../../../model/conference/conference";
import {Storage} from "../../../utils/storage";
import {System} from "../../../core/authentication/system";
import {FreeLogin} from "../../../core/authentication/FreeLogin";
import {PageUrlConstant} from "../../../config/pageUrlConstant";
import {Caching} from "../../../utils/native-api/caching/caching";
import {Common} from "../../../utils/tabjin-utils/common";
import {CheckLogin} from "../../../core/authentication/CheckLogin";
import {Navigate} from "../../../utils/native-api/interface/navigate";
import {InterAction} from "../../../utils/native-api/interface/interaction";

const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentUserId: null,// 当前用户id
        isAdmin: false,// 默认是非管理员
        isLeaderInDepts: false,// 默认非部门主管
        conference: {},
        currentConference: null,// 当前会议
        currentConferenceMid: null,


        confereeInfo: [],// 会议人员参会信息

        chooseParticipantNumber: 0,// 参加人员数
        chooseParticipant: [],// 参加人员
        conferee: null,// 参加人员数组

        readInfo: [],   // 通知阅读人员情况数组
        noticeReadNumber: 0,// 通知阅读数
        noticeRead: [],// 已阅读人员
        noticeNotRead: [],// 未阅读人员

        participatedStatus: ['已参加', '未参加', '请假', '迟到'],
        swiperParticipantCurrent: 0,
        noticeReadStatus: ['已阅读', '未阅读'],
        swiperNoticeReadCurrent: 0,

        filePaths: null,
        imgArr: [],
        chooseViewShow: true,
        imgObjArr: [],

        tabBarList: [
            {
                icon_name: "checkin",
                icon: "",
                activeIcon: "",
                text: '签到',
                pagePath: "/page/conference/checkIn/checkIn",
            },
            {
                icon_name: "calendar",
                icon: "",
                activeIcon: "",
                text: '请假',
                pagePath: `${PageUrlConstant.takeOff}`,
            },
            {
                icon_name: "note",
                activeIcon: "",
                icon: "",
                text: '笔记',
                pagePath: `${PageUrlConstant.conferenceNote}`,
            }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(param) {
        console.log('onload');
        this.init(parseInt(param.mid));
        const currentConference = await Conference.getConferenceDetail(param.mid, Storage.getStorageSyncByKey('user'));
        this.setData({
            currentConference: currentConference,
            currentConferenceMid: parseInt(param.mid),
        });

    },

    /**
     * 生命周期函数--监听页面显示
     */
    // async onShow() {
    //     console.log('onshow');
    //     this.init(this.data.currentConferenceMid);
    //     this.setData({
    //         isLeaderInDepts: Caching.getStorageSync('isLeaderInDepts'),
    //     });
    // },


    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: async function () {
        this.init(this.data.currentConferenceMid);
        dd.stopPullDownRefresh();
    },

    async init(mid) {
        await CheckLogin.fnRecheck();
        this.initData(mid);
    },

    /**
     * 初始化页面信息
     * 会议信息
     * @returns {Promise<void>}
     */
    async initData(mid) {
        // console.log('mid', mid);
        // console.log(`123,`, Caching.getStorageSync('isLeaderInDepts'));
        const userId = Storage.getStorageSyncByKey('user');
        const currentConference = await Conference.getConferenceDetail(mid, userId);
        console.log('initData', currentConference);
        let imgArr = [];
        for (let i = 0; i < currentConference.imgs.length; i++) {
            imgArr.push(currentConference.imgs[i].path);
        }
        this.setData({
            isLeaderInDepts: Caching.getStorageSync('isLeaderInDepts'),
            currentConferenceMid: currentConference.id,
            conference: currentConference,
            imgArr: imgArr,
            imgObjArr: currentConference.imgs
        });

        this.checkCurrentIsInParticipator(currentConference, userId);// 判断当前用户是否在参加人员中
        this.onPackageConfereeInfo(currentConference);// 包装参会人员信息
        this.onPackageReadInfo(currentConference);// 包装阅读人员信息
    },

    /**
     * 初始化用户信息
     */
    async initUser() {
        const authCode = await System.loginSystem();// 获取钉钉免登授权码
        const currentUser = await FreeLogin.freeLogin(authCode.authCode, app.globalData.corpId);// 用户登录并进入缓存
        this.setData({
            isAdmin: currentUser.currentUser.isAdmin,
            isLeaderInDepts: Storage.getStorageSyncByKey('isLeaderInDepts')
        });
        return currentUser;
    },

    /**
     * 校验管理员或者用户
     * 如果没有当前用户是否是管理员
     * 或没有当前用户信息
     */
    async checkUserInfo() {
        let that = this;
        const isAdmin = Storage.getStorageSyncByKey('isAdmin');// 管理员标志从缓存中获取
        const isLeaderInDepts = Storage.getStorageSyncByKey('isLeaderInDepts');// 主管标志从缓存中获取
        const userid = Storage.getStorageSyncByKey('user');// 从缓存中获取到当前用户
        let userId = null;
        if (app.isNull(isLeaderInDepts) || app.isNull(userid)) {
            // 如果缓存中没有是否是管理员或当前用户信息,则从网络获取当前用户，并将当前用户信息缓存
            const currentUserInfo = await that.initUser();
            userId = currentUserInfo.currentUser.userid;
        } else {
            this.setData({
                isAdmin: isAdmin,
                currentUserId: userid,
                isLeaderInDepts: isLeaderInDepts
            })
            userId = userid;
        }
        return userId;
    },

    /**
     * 判断当前用户是否在参加人员中
     * @param currentConference 当前会议
     */
    checkCurrentIsInParticipator(currentConference, userId) {
        // 判断当前用户是否在参加人员中
        let conferee = [];
        for (let i = 0; i < currentConference.conferee.length; i++) {
            conferee.push(currentConference.conferee[i].userid)
        }
        this.setData({
            conferee: conferee
        });
        if (app.inArray(conferee, userId)) {
            this.setData({
                isAllowCheckIn: false
            })
        } else {
            this.setData({
                isAllowCheckIn: true
            });
        }
    },

    /**
     * 分享
     * @returns {{path: string, title: string, desc: string}}
     */
    onShareAppMessage() {
        return {
            title: '支部会议详情',
            desc: '展示支部会议详情',
            path: `${PageUrlConstant.conferenceDetail}?conference=` + JSON.stringify(this.data.currentConference),
            // path: `${PageUrlConstant.conferenceDetail}?mid=` + this.data.currentConferenceMid,
        };
    },

    /**
     * 包装会议参会信息 ok
     */
    onPackageConfereeInfo(currentConference) {
        const conferee = currentConference.conferee;
        let confereeArray = []; // 参会信息数组
        let attended = [];      // 已参加人员
        let notAttended = [];   // 未参加人员
        let leaveStaff = [];    // 请假人员
        let latePerson = [];    // 迟到人员

        for (let i = 0; i < conferee.length; i++) {
            // 筛选参加人员
            switch (conferee[i].sign_type) {
                case 0:// 未签到
                    notAttended.push(conferee[i]);
                    break;
                case 1:// 已签到
                    attended.push(conferee[i]);
                    break;
                case 2:// 迟到
                    attended.push(conferee[i]);
                    latePerson.push(conferee[i]);
                    break;
                case 3:// 请假
                    leaveStaff.push(conferee[i]);
                    break;
            }
        }
        confereeArray.push(attended);
        confereeArray.push(notAttended);
        confereeArray.push(leaveStaff);
        confereeArray.push(latePerson);
        this.setData({
            confereeInfo: confereeArray
        });
        // console.log('confereeArray', confereeArray);
    },

    /**
     * 包装阅读情况 ok
     */
    onPackageReadInfo(currentConference) {
        const read = currentConference.msg;
        let readArr = [];       // 通知阅读情况数组
        readArr.push(currentConference.msg.read);// readArr[0]
        readArr.push(currentConference.msg.unread);// readArr[1]
        const isUnreadNull = Common.isArrayNull(currentConference.msg.unread);
        this.setData({
            readInfo: readArr,
            isUnreadNull: isUnreadNull
        });
        // console.log('readInfo', readArr);
    },

    /**
     * 切换会议人员swiper
     * @param e
     */
    switchParticipantSwiper(e) {
        let swiperChangeCurrent = parseInt(e.currentTarget.dataset.index),
            num = parseInt(e.currentTarget.dataset.index)
        this.curIndex = parseInt(e.currentTarget.dataset.index)
        console.log('切换swiper', swiperChangeCurrent);
        this.setData({
            swiperParticipantCurrent: swiperChangeCurrent
        })
    },

    /**
     * 会议人员轮播切换
     * @param e
     */
    swiperParticipantChange(e) {
        console.log('触发会议人员轮播');
        console.log(e);
        this.setData({
            swiperParticipantCurrent: e.detail.current
        })
        console.log(this.data.swiperParticipantCurrent)
    },

    /**
     * 切换会议人员swiper
     * @param e
     */
    switchNoticeReadSwiper(e) {
        let id = e.currentTarget.dataset.id,
            swiperChangeCurrent = parseInt(e.currentTarget.dataset.index),
            num = parseInt(e.currentTarget.dataset.index)
        this.curIndex = parseInt(e.currentTarget.dataset.index)
        console.log('切换swiper', swiperChangeCurrent);
        this.setData({
            swiperNoticeReadCurrent: swiperChangeCurrent
        })
    },

    /**
     * 阅读情况轮播切换
     * @param e
     */
    swiperNoticeReadChange(e) {
        this.setData({
            swiperNoticeReadCurrent: e.detail.current
        })
        console.log(this.data.swiperNoticeReadCurrent)
    },

    /**
     * 发送钉
     */
    notice() {
        let useridArr = [];
        this.data.readInfo[1].forEach(user => {
            useridArr.push(user.userid);
            Ding.createNoticeDing({
                users: useridArr,
                corpId: app.globalData.corpId,
                text: this.data.conference.theme,
            })
        });
    },

    toSummary() {
        Navigate.navigateTo(`${PageUrlConstant.conferenceSummary}?conference=` + JSON.stringify(this.data.conference));
    },

    toPhoto() {
        // console.log(`this.data:`, this.data)
        let imgArr = this.data.conference.imgs;
        let mid = this.data.conference.id;
        Navigate.navigateTo(`${PageUrlConstant.photo}?imgArr=` + JSON.stringify(imgArr) + '&mid=' + mid);
    },

    /**
     * 处理tabbar相关
     * @param e
     */
    detailTabBar(e) {
        const currentIndex = e;
        const signType = this.data.conference.sign_type;
        if (signType == 2 && currentIndex == 1) {
            InterAction.fnShowToast(`已签到，无法请假`, 'none', 1500);
        } else {
            Navigate.navigateTo(`${this.data.tabBarList[currentIndex].pagePath}?conference=` + JSON.stringify(this.data.conference));
        }
    }
})
