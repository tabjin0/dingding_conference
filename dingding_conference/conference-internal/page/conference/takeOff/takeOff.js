import {Common} from "../../../utils/tabjin-utils/common";
import {InterAction} from "../../../utils/native-api/interface/interaction";
import {TakeOff} from "../../../components/conference/models/TakeOff";

const app = getApp();

Page({
    data: {
        conference: null,
        leaveType: null,
        leaveReason: null,
        isTakeOff: 0,// 请假标志，0，请假失败；1请假成功
        isTake: 'wa'
    },

    onLoad(param) {
        let conference = JSON.parse(param.conference);
        console.log('从会议详情界面携带的数据为：' + conference);
        console.log(conference);
        this.setData({
            conference: conference
        });
    },

    /**
     * 选择请假类型
     */
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
            },
        });
    },

    /**
     * 表单提交
     */
    async formSubmit(e) {
        this.setData({
            leaveReason: e.detail.value.leaveReason
        })


        let currentConference = this.data.conference;

        let isTakeOff = 0;// 请假失败

        const takeOff = await new TakeOff(currentConference, this.data.leaveType, this.data.leaveReason);
        console.log('takeOff', takeOff);
        //
        // if (app.isNull(currentConference)) {// currentConference，提示为获取到当前会议
        //     InterAction.fnAlert('抱歉', '未获取到当前会议，请重启应用', '好的');
        // } else { //有当前会议信息，绑定当前用户与其参加会议的签到行为
        //     // 会议地点经纬度
        //     let currentLocation = currentConference.roomId.location.split(',');
        //     let latitude = parseFloat(currentLocation[0]);// 纬度
        //     let longitude = parseFloat(currentLocation[1]);// 经度（大）
        //     // console.log(currentLocation);
        //     // console.log('纬度：' + latitude);
        //     // console.log('经度：' + longitude);
        //
        //     // 开始定位
        //     dd.getLocation({// 模拟器和手机真机返回不一致
        //         async success(res) {
        //             // console.log('定位结果');
        //             // console.log(res);
        //             // console.log('定位结果');
        //             let currentLatitude = parseFloat(res.longitude);
        //             let currentLongitude = parseFloat(res.latitude);
        //             // 计算距离
        //             const distance = CheckIn.getFlatternDistance(latitude, longitude, currentLatitude, currentLongitude);
        //             // 包装请假对象
        //             let checkInInfo = {};
        //             checkInInfo.mid = currentConference.id;
        //             checkInInfo.uid = Storage.getStorageSyncByKey('user');
        //             checkInInfo.address = res.address;
        //             checkInInfo.distance = distance;
        //             checkInInfo.leaveType = that.data.leaveType;
        //             checkInInfo.leaveReason = that.data.leaveReason;
        //             // console.log('包装好的请假对象');
        //             // console.log(checkInInfo);
        //             // console.log('包装好的请假对象');
        //             if (app.isNull(checkInInfo.mid)) {
        //                 InterAction.fnAlert('抱歉', '未获取到签到会议', '好的');
        //             } else if (app.isNull(checkInInfo.uid)) {
        //                 InterAction.fnAlert('抱歉', '未获取到用户信息', '好的');
        //             } else if (app.isNull(checkInInfo.address)) {
        //                 InterAction.fnAlert('抱歉', '未获取到地址信息', '好的');
        //             } else if (app.isNull(checkInInfo.distance)) {
        //                 InterAction.fnAlert('抱歉', '位置异常', '好的');
        //             } else {
        //                 const checkInInfoRes = await CheckIn.submitCheckInInfo(checkInInfo);
        //                 console.log('请假反馈');
        //                 console.log(checkInInfoRes);
        //                 if (checkInInfoRes.code === 1) {// 操作成功
        //                     InterAction.fnShowToast('success', '请假成功', 2000);
        //                     setTimeout(function () {
        //                         dd.navigateBack({
        //                             delta: 1
        //                         });
        //                     }, 2000);
        //                 } else {
        //                     InterAction.fnAlert('抱歉', `${checkInInfoRes.msg}`, '好的');
        //                 }
        //             }
        //         },
        //         fail() {
        //             InterAction.fnAlert('抱歉', '定位失败', '好的');
        //             // that.setData({
        //             //     isTakeOff: 0
        //             // })
        //             isTakeOff = 0;// 请假失败
        //         },
        //     });
        // }
    },

    /**
     * 请假 type 3
     * @returns {Promise<void>}
     */
    takeOff() {
        let that = this;
        let currentConference = that.data.conference;
        // console.log('会议详情，当前会议');
        // console.log(currentConference);
        // console.log('会议详情，当前会议');

        let isTakeOff = 0;// 请假失败

        if (app.isNull(currentConference)) {// currentConference，提示为获取到当前会议
            InterAction.fnAlert('抱歉', '未获取到当前会议，请重启应用', '好的');
        } else { //有当前会议信息，绑定当前用户与其参加会议的签到行为
            // 会议地点经纬度
            let currentLocation = currentConference.roomId.location.split(',');
            let latitude = parseFloat(currentLocation[0]);// 纬度
            let longitude = parseFloat(currentLocation[1]);// 经度（大）
            // console.log(currentLocation);
            // console.log('纬度：' + latitude);
            // console.log('经度：' + longitude);

            // 开始定位
            dd.getLocation({// 模拟器和手机真机返回不一致
                async success(res) {
                    // console.log('定位结果');
                    // console.log(res);
                    // console.log('定位结果');
                    let currentLatitude = parseFloat(res.longitude);
                    let currentLongitude = parseFloat(res.latitude);
                    // 计算距离
                    const distance = CheckIn.getFlatternDistance(latitude, longitude, currentLatitude, currentLongitude);
                    // 包装请假对象
                    let checkInInfo = {};
                    checkInInfo.mid = currentConference.id;
                    checkInInfo.uid = Storage.getStorageSyncByKey('user');
                    checkInInfo.address = res.address;
                    checkInInfo.distance = distance;
                    checkInInfo.leaveType = that.data.leaveType;
                    checkInInfo.leaveReason = that.data.leaveReason;
                    // console.log('包装好的请假对象');
                    // console.log(checkInInfo);
                    // console.log('包装好的请假对象');
                    if (app.isNull(checkInInfo.mid)) {
                        InterAction.fnAlert('抱歉', '未获取到签到会议', '好的');
                    } else if (app.isNull(checkInInfo.uid)) {
                        InterAction.fnAlert('抱歉', '未获取到用户信息', '好的');
                    } else if (app.isNull(checkInInfo.address)) {
                        InterAction.fnAlert('抱歉', '未获取到地址信息', '好的');
                    } else if (app.isNull(checkInInfo.distance)) {
                        InterAction.fnAlert('抱歉', '位置异常', '好的');
                    } else {
                        const checkInInfoRes = await CheckIn.submitCheckInInfo(checkInInfo);
                        console.log('请假反馈');
                        console.log(checkInInfoRes);
                        if (checkInInfoRes.code === 1) {// 操作成功
                            // 将最新的会议状态
                            // that.data.isTakeOff = true;// 请假成功
                            // that.setData({
                            //     isTakeOff: 1,
                            //     isTake: '请假成功'
                            // });
                            isTakeOff = 1;// 请假成功
                        } else {
                            // that.data.isTakeOff = false;// 请假失败
                            // that.setData({
                            //     isTakeOff: 0,
                            //     isTake: '请假失败'
                            // })
                            isTakeOff = 0;// 请假失败
                        }
                    }
                },
                fail() {
                    InterAction.fnAlert('抱歉', '定位失败', '好的');
                    // that.setData({
                    //     isTakeOff: 0
                    // })
                    isTakeOff = 0;// 请假失败
                },
            });
        }
        that.setData({
            isTakeOff: isTakeOff,
            isTake: '修改isTakeOff成功',
            successed: isTakeOff
        })
    },

});
