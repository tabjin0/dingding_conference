import {Conference} from "../../../model/conference";
import {CheckIn} from "../../../model/checkIn";
import {User} from "../../../model/users";
import {Notes} from "../../../model/notes";
import {Upload} from "../../../model/upload";

const app = getApp();

Page({
    data: {

        conference: {},
        chooseParticipantNumber: 0,// 参加人员数
        chooseParticipant: [],// 参加人员

        noticeReadNumber: 0,// 通知阅读数
        noticeRead: [],// 已阅读人员
        noticeNotRead: [],// 未阅读人员

        agendaList: [
            {
                agendaName: '学习传达总书记关于生活垃圾分类重要指示精神',
                agendaReportingUnit: '县建设局',
                agendaAttendanceUnit: '县城管局、县卫生局',
                agendaOrder: 1,
                agendaCraeteTime: '9:00-9:30',
            },
            {
                agendaName: '关于加快推进嘉善县生活垃圾分类工作的实施意见',
                agendaReportingUnit: '县建设局',
                agendaAttendanceUnit: '县城管局、县卫生局',
                agendaOrder: 2,
                agendaCraeteTime: '9:30-10:00',
            },
            {
                agendaName: '关于垃圾分类的问题汇总',
                agendaReportingUnit: '县建设局',
                agendaAttendanceUnit: '县城管局、县卫生局',
                agendaOrder: 3,
                agendaCraeteTime: '10:00-11:00',
            },
        ],

        adminOperation: [
            {
                index: 0,
                operation: 'takeOff',
                name: "请假",
            },
            {
                index: 1,
                operation: 'locationCheckCurrentConference',
                name: "签到",
            },
            {
                index: 2,
                operation: 'chooseImage',
                name: "照片",
            },
            {
                index: 3,
                operation: 'summary',
                name: "纪要",
            },
        ],

        commonOperation: [
            {
                index: 0,
                operation: 'takeOff',
                name: "请假",
            },
            {
                index: 1,
                operation: 'locationCheckCurrentConference',
                name: "签到",
            },
            {
                index: 2,
                operation: 'note',
                name: "笔记",
            },
        ],


        filePaths: null,
        imgArr: [],
        chooseViewShow: true,

        currentUserId: null,

        isAllowCheckIn: false,// 默认不允许签到
    },
    async onLoad(param) {
        var that = this;
        console.log("param");
        console.log(param);
        console.log("param");
        var conference = JSON.parse(param.conference);
        console.log(conference);
        that.setData({
            conference: conference
        });

        // 管理员标志从缓存中获取
        const isAdmin = await User.getIdAdmin();
        console

        // 当前用户相关
        var userId;
        const userFromStorage = await User.getUserFromStorage();// 从缓存中获取到当前用户
        console.log(userFromStorage)
        if (app.isNull(userFromStorage) || app.isNull(userFromStorage.user)) {
            // 如果缓存中没有用户,则从网络获取当前用户
            const authCode = await System.loginSystem();// 获取钉钉免登授权码
            const user = await User.getCurrentUser(authCode.authCode);// 从网络获取当前用户
            dd.hideLoading();
            userId = user.result.userId;
            // 将当前用户放入缓存
            var userData = {};
            userData.user = userId;
            const userIntoStorage = await User.setUserIntoStorage(userData);
            dd.hideLoading();
        } else {
            that.setData({
                currentUserId: userFromStorage.user
            })
            userId = userFromStorage.user;
        }
        console.log(userId);
        // 判断当前用户是否在参加人员中
        const conferee = conference.conferee.split(',');
        console.log(conferee);
        if (app.inArray(conferee, userId)) {
            console.log(app.inArray(conferee, userId));
            console.log('当前党员在参会人员中');
            that.setData({
                isAllowCheckIn: false
            })
        } else {
            console.log(app.inArray(conferee, userId));
            console.log('当前党员不在参会人员中');
            that.setData({
                isAllowCheckIn: true
            })
        }

    },

    chooseParticipant() {
        var that = this;
        dd.complexChoose({
            title: "参加人员",            //标题
            multiple: true,            //是否多选
            limitTips: "超出了",          //超过限定人数返回提示
            maxUsers: 10000,            //最大可选人数
            pickedUsers: [],            //已选用户
            pickedDepartments: [],          //已选部门
            disabledUsers: [],            //不可选用户
            disabledDepartments: [],        //不可选部门
            requiredUsers: [],            //必选用户（不可取消选中状态）
            requiredDepartments: [],        //必选部门（不可取消选中状态）
            permissionType: "GLOBAL",          //可添加权限校验，选人权限，目前只有GLOBAL这个参数
            responseUserOnly: false,        //返回人，或者返回人和部门
            success: function (res) {
                /**
                 {
					selectedCount:1,                              //选择人数
					users:[{"name":"","avatar":"","userId":""}]，//返回选人的列表，列表中的对象包含name（用户名），avatar（用户头像），userId（用户工号）三个字段
					departments:[{"id":,"name":"","count":}]//返回已选部门列表，列表中每个对象包含id（部门id）、name（部门名称）、number（部门人数）
				}
                 */
                console.log("res");
                console.log(res);
                console.log(res.selectedCount);
                console.log(res.users[0].name);
                console.log(res.users[1]);
                var chooseParticipantNumber = res.selectedCount;
                var chooseParticipant = res.users;
                console.log(chooseParticipantNumber);
                console.log(chooseParticipant);
                that.setData({
                    chooseParticipantNumber: res.selectedCount,
                    chooseParticipant: res.users
                })
            },
            fail: function (err) {
            }
        })
    },

    operation(e) {
        console.log(e);
        var agendaStateOfTheMeeting = e.target.dataset.agendaStateOfTheMeeting;
        console.log(agendaStateOfTheMeeting);
        dd.showActionSheet({
            title: '操作',
            items: ['查看详情', '上会', '拒绝'],
            cancelButtonText: '取消好了',
            success: (res) => {
                const btn = res.index === -1 ? '取消' : '第' + res.index + '个';
                dd.alert({
                    title: `你点了${btn}按钮`
                });
            },
        });
    },

    /** 选择图片 */
    chooseImage() {
        var that = this;
        dd.chooseImage({
            count: 4 - that.data.imgArr.length,//最多选择4张图片
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: async function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                console.log('返回选定照片的本地文件路径列表');
                console.log(res);
                console.log(res.apFilePaths);
                if (res.apFilePaths.count == 0) {
                    return;
                }
                //上传图片
                // dd.showLoading({content: '图片上传中...'});
                // const uploadImg = await Upload.uploadImg(res.apFilePaths, '上传测试文件');
                // dd.hideLoading();
                // console.log('图片上传');
                // console.log(uploadImg);
                //显示图片
                var imgArrNow = that.data.imgArr;
                imgArrNow = imgArrNow.concat(res.apFilePaths);
                console.log(imgArrNow);
                that.setData({
                    imgArr: imgArrNow
                })
                that.chooseViewShow();
            }
        })
    },

    /** 删除图片 */
    deleteImv(e) {
        var imgArr = this.data.imgArr;
        var itemIndex = e.currentTarget.dataset.id;
        imgArr.splice(itemIndex, 1);
        console.log(imgArr);
        this.setData({
            imgArr: imgArr
        })
        //判断是否隐藏选择图片
        this.chooseViewShow();
    },


    /** 是否隐藏图片选择 */
    chooseViewShow() {
        if (this.data.imgArr.length >= 4) {
            this.setData({
                chooseViewShow: false
            })
        } else {
            this.setData({
                chooseViewShow: true
            })
        }
    },

    /** 显示图片 */
    showImage(e) {
        var imgArr = this.data.imgArr;
        var itemIndex = e.currentTarget.dataset.id;

        dd.previewImage({
            current: imgArr[itemIndex], // 当前显示图片的http链接
            urls: imgArr // 需要预览的图片http链接列表
        })
    },

    async formSubmit(e) {
        console.log(e);
        console.log('e.detail.value');
        console.log(e.detail.value);
        var conference = JSON.parse(this.data.conference);
        var mid = conference.id;
        var uid = '11111111111';
        var text = e.detail.value.text;
        // var img = this.data.imgArr.join(',');
        var img = 'https://www.baidu.com/img/bd_logo1.png?qua=high&where=super';
        console.log(mid);
        console.log(uid);
        console.log(text);
        console.log(img);
        var res = await Notes.submitNotes(mid, uid, text, img);
        console.log(res);
    },

    /**
     * 签到当前会议
     * @param e
     * @returns {Promise<void>}
     */
    async locationCheckCurrentConference() {
        var that = this;
        var currentConference = that.data.conference;

        if (app.isNull(currentConference)) {// currentConference，提示为获取到当前会议
            dd.alert({content: '抱歉，未获取到当前会议，请重启应用'});
        } else { //有当前会议信息，绑定当前用户与其参加会议的签到行为
            console.log(currentConference);
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
                    console.log('res');
                    console.log(res)
                    var currentLatitude = parseFloat(res.longitude);
                    var currentLongitude = parseFloat(res.latitude);
                    // let result1 = that.getGreatCircleDistance(30.1234, 140.1234, 30.3456, 140.3456)
                    // let result2 = that.getFlatternDistance(30.1234, 140.1234, 30.3456, 140.3456)
                    // console.log(result1) // 32688.3298
                    // console.log(result2) // 32622.43244078783

                    console.log('res');
                    dd.hideLoading();
                    console.log(latitude);
                    console.log(longitude);
                    console.log(parseFloat(res.latitude));// 定位纬度
                    console.log(parseFloat(res.longitude));// 定位经度
                    const distance = CheckIn.getFlatternDistance(latitude, longitude, currentLatitude, currentLongitude);
                    console.log('distance');
                    console.log(distance);
                    console.log('distance');
                    // 包装签到对象
                    var checkInInfo = {};
                    checkInInfo.mid = currentConference.id;
                    const userFromStorage = await User.getUserFromStorage();// 从缓存中获取到当前用户
                    checkInInfo.uid = userFromStorage.user;// 从缓存中获取当前userId
                    checkInInfo.address = res.address;
                    checkInInfo.distance = distance;
                    checkInInfo.leaveType = "";
                    checkInInfo.leaveReason = "";
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
                        console.log(checkInInfoRes);
                        dd.alert({content: `${checkInInfoRes.msg}`});
                        console.log(checkInInfoRes);
                    }
                },
                fail() {
                    dd.alert({title: '定位失败'});
                },
            });
        }
    },


    /**
     * 请假
     */
    takeOff() {
        var that = this;
        console.log(that.data.conference);
        const conference = that.data.conference;
        dd.navigateTo({
            url: '/page/meetingAgenda/takeOff/takeOff?conference=' + JSON.stringify(conference),
            success: (res) => {
                console.log(res);
            },
            fail: (res) => {
                console.log(res);
            }
        });
    },

    summary() {
        var that = this;
        console.log(that.data.conference);
        const conference = that.data.conference;
        dd.navigateTo({
            url: '/page/index/addMeetingSummary/addMeetingSummary?conference=' + JSON.stringify(conference),
            success: (res) => {
                console.log(res);
            },
            fail: (res) => {
                console.log(res);
            }
        });
    },


    note() {
        var that = this;
        console.log(that.data.conference);
        const conference = that.data.conference;
        dd.navigateTo({
            url: '/page/index/notes/notes?conference=' + JSON.stringify(conference),
            success: (res) => {
                console.log(res);
            },
            fail: (res) => {
                console.log(res);
            }
        });
    }
});
