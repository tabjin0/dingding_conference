import {MeetingRoom} from "../../../model/meetingRoom";

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

    },



    test(e) {
        dd.alert({
            content: JSON.stringify(e.detail),
        });
        this.webViewContext.postMessage({'sendToWebView': '1'});
    },

    onPullDownRefresh() {
        console.log('重新加载')
        dd.alert({
            content: '重新加载'
        })
    },

    chooseLocation() {
        var that = this;

        // 定位
        dd.getLocation({
            success(res) {
                console.log(res);
                that.setData({
                    'conference.address': res.address,// 地址
                    'conference.longitude': res.longitude,// 经度(钉钉接口模拟器这边有问题)
                    'conference.latitude': res.latitude,// 纬度
                    location: `${res.longitude},${res.latitude}000000`
                });

                dd.openLocation({
                    longitude: res.longitude,
                    latitude: res.latitude,
                    name: res.address,
                    address: res.address,
                });
            },
            fail() {

            },
        });
    },

    meetingRoom(e) {
        console.log(e);
        var that = this;
        var meetingRoom = e.target.dataset.meetingRoom;
        console.log(meetingRoom);
        that.setData({
            'conference.address': meetingRoom
        });

    },

    async formSubmit(e) {
        console.log(e);
        let name = e.detail.value.name;
        let location = e.detail.value.location;
        if (app.isNull(name)) {
            dd.alert({content: '请输入会议室名称'});
        }else if(app.isNull(location)){
            dd.alert({content: '请定义会议室'});
        }else {
            const res = await MeetingRoom.addOrUpdateMeetingRoom(name, location);
            console.log(res);
            if(res.code === 1){
                dd.alert({content: '编辑会议室成功'});
                dd.navigateBack({
                    delta: 1
                })
            }else {
                dd.alert({content: '编辑会议室失败'});
            }
        }

    }
});
