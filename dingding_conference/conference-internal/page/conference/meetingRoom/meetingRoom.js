import { MeetingRoom } from "../../../model/conference/meetingRoom";
import { InterAction } from "../../../utils/native-api/interface/interaction";
import { Caching } from "../../../utils/native-api/caching/caching";
import { FreeLogin } from "../../../core/authentication/FreeLogin";
import { Navigate } from "../../../utils/native-api/interface/navigate";
import { CheckLogin } from "../../../core/authentication/CheckLogin";
import { PageUrlConstant } from "../../../config/pageUrlConstant";


const app = getApp();

Page({
    data: {
        room: [
            {
                rid: 1,
                rName: '东边会议室',
            }
        ],
        location: '',
    },

    async onLoad(e) {
        this.webViewContext = dd.createWebViewContext('web-view-1');
        await CheckLogin.fnRecheck();
        this.chooseLocation();
        console.log('e', e);

    },

    // async onShow() {
    //     await this.initUser();
    // },
    //
    // async initUser() {
    //     if (!app.globalData.checkLogin || !Caching.getStorageSync('currentUser')) {
    //         const currentUser = await FreeLogin.currentUser();
    //         Caching.setStorageSync('currentUser', currentUser);// 用户登录并进入缓存
    //         app.globalData.checkLogin = true;
    //     }
    // },

    async onPullDownRefresh() {
        if (!app.globalData.checkLogin || !Caching.getStorageSync('currentUser')) {
            const currentUser = await FreeLogin.currentUser();
            Caching.setStorageSync('currentUser', currentUser);// 用户登录并进入缓存
            app.globalData.checkLogin = true;
        }
        console.log('重新加载')
    },

    chooseLocation() {
        let that = this;
        // 定位
        dd.getLocation({
            success(res) {
                console.log(res);
                that.setData({
                    'conference.address': res.address,// 地址
                    'conference.longitude': res.longitude,// 经度(钉钉接口模拟器这边有问题)
                    'conference.latitude': res.latitude,// 纬度
                    location: `${res.longitude},${res.latitude}`
                });

                // dd.openLocation({
                //   longitude: res.longitude,
                //   latitude: res.latitude,
                //   name: res.address,
                //   address: res.address,
                // });
            },
            fail() {

            },
        });
    },

    meetingRoom(e) {
        let that = this;
        let meetingRoom = e.target.dataset.meetingRoom;
        that.setData({
            'conference.address': meetingRoom
        });

    },

    async formSubmit(e) {
        let name = e.detail.value.name;
        console.log(`name:`,name)
        let location = e.detail.value.location;
        if (name=='') {
            InterAction.fnShowToast('请输入会议室名称', 'fail', 2000);
        } else if (location=='') {
            InterAction.fnShowToast('请到指定地点定位会议室', 'fail', 2000);
        } else {
            const res = await MeetingRoom.addOrUpdateMeetingRoom(name, location);
            InterAction.fnShowToast('新增会议室成功', 'success', 2000);
            setTimeout(function() {
                Navigate.navigateTo(`${PageUrlConstant.addConference}`);
            }, 2000);
        }
    }
});
