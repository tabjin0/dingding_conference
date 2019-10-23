import {CheckIn} from "../../../model/checkIn";
import {User} from "../../../model/users";

const app = getApp();

Page({
    data: {
        conference: null,
        leaveType: null,
        leaveReason: null
    },
    onLoad(param) {
        console.log('请假界面');
        var conference = JSON.parse(param.conference);
        // console.log('从会议详情界面携带的数据为：' + conference);
        // console.log(conference);
        this.setData({
            conference: conference
        });
    },

    chooseTakeOffType() {
        dd.showActionSheet({
            title: '请假类型',
            items: ['病假', '事假'],
            cancelButtonText: '取消',
            success: (res) => {
                const btn = res.index === -1 ? '取消' : '第' + res.index + '个';
                console.log(res);
                switch (res.index) {
                    case 0:
                        this.setData({
                            leaveType: '病假'
                        });
                        break;
                    case 1:
                        this.setData({
                            leaveType: '事假'
                        })
                }
                // dd.alert({
                //     title: `你点了${btn}按钮`
                // });
            },
        });
    },

    /**
     * 请假 type 3
     * @returns {Promise<void>}
     */
    async takeOff() {
        var that = this;
        var currentConference = that.data.conference;
        console.log('会议详情，当前会议');
        console.log(currentConference);
        console.log('会议详情，当前会议');

        if (app.isNull(currentConference)) {// currentConference，提示为获取到当前会议
            dd.alert({content: '抱歉，未获取到当前会议，请重启应用'});
        } else { //有当前会议信息，绑定当前用户与其参加会议的签到行为
            // console.log('会议详情，当前会议');
            // console.log(currentConference);
            // console.log('会议详情，当前会议');
            // 首先判断当前用户是否在参加人员中

            // 会议地点经纬度
            var currentLocation = currentConference.roomId.location.split(',');
            var latitude = parseFloat(currentLocation[0]);// 纬度
            var longitude = parseFloat(currentLocation[1]);// 经度（大）
            console.log(currentLocation);
            console.log('纬度：' + latitude);
            console.log('经度：' + longitude);

            // 开始定位
            dd.getLocation({// 模拟器和手机真机返回不一致
                async success(res) {
                    console.log('定位结果');
                    console.log(res);
                    console.log('定位结果');
                    var currentLatitude = parseFloat(res.longitude);
                    var currentLongitude = parseFloat(res.latitude);
                    dd.hideLoading();
                    // 计算距离
                    const distance = CheckIn.getFlatternDistance(latitude, longitude, currentLatitude, currentLongitude);
                    // 包装请假对象
                    var checkInInfo = {};
                    checkInInfo.mid = currentConference.id;
                    const userFromStorage = await User.getUserFromStorage();// 从缓存中获取到当前用户
                    checkInInfo.uid = userFromStorage.user;// 从缓存中获取当前userId
                    checkInInfo.address = res.address;
                    checkInInfo.distance = distance;
                    checkInInfo.leaveType = that.data.leaveType;
                    checkInInfo.leaveReason = that.data.leaveReason;
                    console.log('包装好的请假对象');
                    console.log(checkInInfo);
                    console.log('包装好的请假对象');
                    if (app.isNull(checkInInfo.mid)) {
                        dd.alert({content: '未获取到签到会议'});
                    } else if (app.isNull(checkInInfo.uid)) {
                        dd.alert({content: '未获取到用户信息'});
                    } else if (app.isNull(checkInInfo.address)) {
                        dd.alert({content: '未获取到地址信息'});
                    } else if (app.isNull(checkInInfo.distance)) {
                        dd.alert({content: '坐标异常'});
                    } else {
                        const checkInInfoRes = await CheckIn.submitCheckInInfo(checkInInfo);
                        console.log('请假反馈');
                        console.log(checkInInfoRes);
                        if(checkInInfoRes.code == 1){// 操作成功
                            // 将最新的会议状态
                        }
                        console.log('请假反馈');
                        dd.alert({content: `${checkInInfoRes.msg}`});

                    }
                },
                fail() {
                    dd.alert({title: '定位失败'});
                },
            });
        }
        dd.alert({content: '请假'});
    },

    /**
     * 表单提交
     */
    formSubmit(e) {
        console.log(e);
        this.setData({
            leaveReason: e.detail.value.leaveReason
        })
        console.log('请假')
        this.takeOff();
        console.log('请假')
        // dd.navigateBack({
        //     delta: 1
        // });
        dd.navigateTo({
            url: '/page/index/index',
            success: (res) => {
                console.log(res);
            },
            fail: (res) => {
                console.log(res);
            }
        });
    }
});
