import {MeetingRoom} from "../../../model/conference/meetingRoom";
import {InterAction} from "../../../utils/native-api/interface/interaction";
import {Caching} from "../../../utils/native-api/caching/caching";
import {FreeLogin} from "../../../model/authentication/FreeLogin";

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

    onLoad(e) {
        this.webViewContext = dd.createWebViewContext('web-view-1');
        this.chooseLocation();

    },

    async onShow() {
        if (!app.globalData.checkLogin || !Caching.getStorageSync('currentUser')) {
            const currentUser = await FreeLogin.currentUser();
            Caching.setStorageSync('currentUser', currentUser);// 用户登录并进入缓存
        }
    },

    async onPullDownRefresh() {
        if (!app.globalData.checkLogin || !Caching.getStorageSync('currentUser')) {
            const currentUser = await FreeLogin.currentUser();
            Caching.setStorageSync('currentUser', currentUser);// 用户登录并进入缓存
        }
        console.log('重新加载')
    },

    chooseLocation() {
        // 定位
        dd.getLocation({
            success(res) {
                console.log(res);
                this.setData({
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
        let location = e.detail.value.location;
        if (app.isNull(name) || name.length > 5) {
            InterAction.fnShowToast('fail', '请输入会议室名称', 2000);
        } else if (app.isNull(location)) {
            InterAction.fnShowToast('fail', '请到指定地点定位会议室', 2000);
        } else {
            const res = await MeetingRoom.addOrUpdateMeetingRoom(name, location, Caching.getStorageSync('orgId'));
            InterAction.fnShowToast('success', '新增会议室成功，请重新点击地点刷新会议室', 2000);
            dd.navigateBack({
                delta: 1
            })
        }
    }
});
