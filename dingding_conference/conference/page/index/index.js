import {Conference} from '../../model/conference';
import {Agenda} from '../../model/agenda';
import {CheckIn} from '../../model/checkIn';
import {User} from '../../model/users';
import {System} from '../../model/system';

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
        hideList: true,

        hasLocation: true,
        location: '',

        isAdmin: false,// 默认不是管理员
        // isAdmin: true,// 默认是管理员
        tarbar: [
            {
                index: 0,
                pagePath: "/page/index/index",
                icon: "/resources/icon/tarbar/icon1_1.png",
                activeIcon: "/resources/icon/tarbar/icon1_2.png",
                name: "支部会议",
                isSelected: true // 默认选中
            },
            {
                index: 1,
                pagePath: "/page/organization/myOrganization/myOrganization",
                icon: "/resources/icon/tarbar/icon2_1.png",
                activeIcon: "/resources/icon/tarbar/icon2_2.png",
                name: "我的组织",
                isSelected: false // 默认未选中
            },
            {
                index: 2,
                pagePath: "/page/statisticalReport/statisticalReport/statisticalReport",
                icon: "/resources/icon/tarbar/icon3_1.png",
                activeIcon: "/resources/icon/tarbar/icon3_2.png",
                name: "统计报表",
                isSelected: false // 默认未选中
            },
        ],

        isNeedCheckIn: true,// 默认需要签到

        checkInInfo: {
            uid: '1219441916791739',// 签到用户
            address: '11,11',// 用户签到地点
            mid: 0,// 签到会议id
            type: "3",// 签到状态，0签到成功，1早到，2迟到，3未签到
            leaveType: '请假类型',
            leaveReason: '请假理由',
        },
    },

    async onLoad() {
        console.log("onload先执行");
        var that = this;

        this.setData({
            corpId: app.globalData.corpId
        })
        // console.log("corpId: " + app.globalData.corpId);

        dd.showLoading({
            content: '加载中...'
        })
        /** 当前用户相关 */
        const userFromStorage = await User.getUserFromStorage();
        console.log('userFromStorage');
        console.log(userFromStorage);
        console.log('userFromStorage');
        if (app.isNull(userFromStorage) || app.isNull(userFromStorage.user)) {
            // 如果缓存中没有用户,则从网络获取当前用户
            const authCode = await System.loginSystem();// 获取钉钉免登授权码
            // console.log('authCode.authCode');
            // console.log(authCode.authCode);
            // console.log('authCode.authCode');
            const user = await User.getCurrentUser(authCode.authCode);// 从网络获取当前用户
            dd.hideLoading();
            var userId = user.result.userId;
            /** 将当前用户放入缓存 */
            var userData = {};
            userData.user = userId;
            const userIntoStorage = await User.setUserIntoStorage(userData);
            dd.hideLoading();
            /** 将当前用户放入缓存 */
            // const userFromStorage = await User.getUserFromStorage();// ok
            // console.log('user');
            // console.log(user);
            // console.log('user');
            that.setData({
                userId: userId,
                'checkInInfo.uid': userId,
                userName: user.result.userName,
            });
        } else {
            // 缓存中有用户
            console.log('缓存中有用户');
            console.log(userFromStorage);
            that.setData({
                userId: userFromStorage.user
            });
        }
        /** 当前用户相关 */

        /** 管理员相关 */
            // 1.管理员；是，ok；否则重新获取管理员并加入缓存
        const adminRes = await User.getAdministratorFromStorage();// 先从缓存中获取管理员
        console.log('adminRes');
        console.log(adminRes);
        console.log('adminRes');
        if (app.isNull(adminRes) || app.isNull(adminRes.administrator)) {// 缓存中没有管理员，从网络获取管理员信息
            const administrator = await User.getAdministratorFromOnline();// 从网络获取管理员
            var administratorId = administrator.data[0].userid;
            var data = {};
            data.administrator = administratorId;
            that.setData({
                administrator: administratorId
            });
            const setStorageRes = await User.setAdministratorIntoStorage(data);// 将管理员放入缓存
            dd.hideLoading();
            // console.log('写入缓存');
            // console.log(setStorageRes);
            // console.log('写入缓存');
        } else {// 缓存中有管理员，与当前人员比对
            that.setData({
                administrator: adminRes.administrator
            });
            console.log("比较管理员和当前用户");
            console.log(that.data.administrator);
            console.log(that.data.userId);
            // 当前人员与管理员进行比对
            if (that.data.administrator != that.data.userId) {// 不是管理员
                // dd.alert({ content: '不是当前管理员' });
                // const conferenceList = await Conference.getConferenceList(userId);// 获取会议列表
                that.setData({
                    isAdmin: false,// 不是管理员
                });
                // 将isAdmin写入缓存
                const isAdminIntoStorage = await User.setIsAdmin({isAdmin: false});
                // const isAdminFromStorage = await User.getIdAdmin();
                // console.log('isAdminFromStorage');
                // console.log(isAdminFromStorage);
                // console.log('isAdminFromStorage');
            } else {// 是管理员
                // dd.alert({ content: '是当前管理员' });
                that.setData({
                    isAdmin: true,// 是管理员
                });
                // 将isAdmin写入缓存
                const isAdminIntoStorage = await User.setIsAdmin({isAdmin: true});
                // const isAdminFromStorage = await User.getIdAdmin();
                // console.log('isAdminFromStorage');
                // console.log(isAdminFromStorage);
                // console.log('isAdminFromStorage');
            }
        }
        /** 管理员相关 */

        this.initAllData();// 获取会议列表
    },

    /** 初始化数据 */
    async initAllData() {
        const conferenceList = await Conference.getConferenceList();// 获取会议列表
        const agendaList = await Agenda.getAgenda();// 获取议题
        dd.hideLoading();
        console.log('conferenceList');
        console.log(conferenceList);
        console.log('conferenceList');
        this.setData({
            conferenceListOrderByDate: conferenceList.data
        });
    },

    async onShow() {
        var that = this;

        dd.getStorage({
            key: 'administrator',
            success: function (res) {
                console.log("缓存获取");
                console.log(res);
                console.log("缓存获取");
            },
            fail: async function (res) {
                const loginSys = await System.loginSystem();
            }
        });

        if (!that.data.isAdmin) {// 默认状态是非管理员
            const user = await User.getUserFromStorage();// 从缓存中获取当前用户
            console.log(user);
            var conferenceList = await Conference.getConferenceList();// 获取会议列表
            // var conferenceList = await Conference.getConferenceList(user.user);// 获取会议列表
            that.setData({
                conferenceListOrderByDate: conferenceList.data
            });
        } else {
            var conferenceList = await Conference.getConferenceList();// 获取会议列表
            that.setData({
                conferenceListOrderByDate: conferenceList.data,
                isAdmin: true
            });

        }

        // this.initAllData();
    },

    /**
     * 签到最新会议
     * @param e
     * @returns {Promise<void>}
     */
    async locationCheck(e) {
        var that = this;
        dd.showLoading({
            content: '加载中...'
        });
        // 根据userId 获取当前用户的会议列表
        const conferenceList = await Conference.getConferenceList(that.data.userId);// 获取会议列表
        // console.log('conferenceList');
        // console.log(conferenceList);
        // console.log('conferenceList');
        this.setData({
            conferenceListOrderByDate: conferenceList.data
        });
        var recentConference = conferenceList.data[0].list[0];// 最近的一次会议
        console.log(recentConference);
        var recentMid = recentConference.id;
        // 经纬度
        var recentLocation = recentConference.roomId.location.split(',');
        var latitude = parseFloat(recentLocation[0]);// 纬度
        var longitude = parseFloat(recentLocation[1]);// 经度（大）
        console.log(recentLocation);
        console.log('纬度：' + latitude);
        console.log('经度：' + longitude);
        // TODO 获取当前userId

        // TODO 从服务器获取会议地址
        var latitude1 = 32.38017578125;// 纬度
        var longitude1 = 119.40954372829862;// 经度


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
                console.log(parseFloat(res.latitude));
                console.log(parseFloat(res.longitude));
                // const distance = that.getDistance(latitude, longitude, currentLatitude, currentLongitude);
                const distance = that.getFlatternDistance(latitude, longitude, currentLatitude, currentLongitude)
                // const distance2 = that.getFlatternDistance(119.40960801866319, 32.380183919270834, 119.40958767361111, 32.38012858072916)
                // const distance = await CheckIn.getDistance(119.40954372829862, 32.38017578125, 119.4095423719618, 32.38011854383681);
                console.log('distance');
                console.log(distance);
                // console.log(distance2);
                console.log('distance');
                var checkInInfo = {};
                checkInInfo.mid = recentMid;
                checkInInfo.uid = that.data.userId;
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
    },


    /**
     * 计算两个经纬度的距离(千米)
     * @param lat1 纬度1
     * @param lng1 经度1
     * @param lat2 纬度2
     * @param lng2 经度2
     * @returns {number}
     */
    getDistance(lat1, lng1, lat2, lng2) {
        var radLat1 = lat1 * Math.PI / 180.0;
        var radLat2 = lat2 * Math.PI / 180.0;
        var a = radLat1 - radLat2;
        var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
            Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
        s = s * 6378.137;// EARTH_RADIUS;
        s = Math.round(s * 10000) / 10000;
        return s;
    },

    getGreatCircleDistance(lat1, lng1, lat2, lng2) {
        var that = this;
        let EARTH_RADIUS = 6378137.0;    //单位m
        let radLat1 = that.getRad(lat1);
        let radLat2 = that.getRad(lat2);

        let a = radLat1 - radLat2;
        let b = that.getRad(lng1) - that.getRad(lng2);

        let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
        s = s * EARTH_RADIUS;
        s = Math.round(s * 10000) / 10000.0;

        return s;
    },

    getRad(d) {
        return d * Math.PI / 180.0;
    },

    /**
     * 计算两经纬度之间的距离，单位是km
     */
    getFlatternDistance(lat1, lng1, lat2, lng2) {
        var that = this;
        const PI = Math.PI
        const EARTH_RADIUS = 6378137.0

        let f = that.getRad((lat1 + lat2) / 2)
        let g = that.getRad((lat1 - lat2) / 2)
        let l = that.getRad((lng1 - lng2) / 2)
        let sg = Math.sin(g)
        let sl = Math.sin(l)
        let sf = Math.sin(f)

        let s, c, w, r, d, h1, h2
        let a = EARTH_RADIUS
        let fl = 1 / 298.257

        sg = sg * sg
        sl = sl * sl
        sf = sf * sf

        s = sg * (1 - sl) + (1 - sf) * sl
        c = (1 - sg) * (1 - sl) + sf * sl

        w = Math.atan(Math.sqrt(s / c))
        r = Math.sqrt(s * c) / w
        d = 2 * w * a
        h1 = (3 * r - 1) / 2 / c
        h2 = (3 * r + 1) / 2 / s

        return d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg)) / 1000
    },

    /**
     * 计算时间差
     */
    timeOffset(time) {
        var time1Date = new Date(time.replace(/-/g, "/"));// 会议时间
        var time2Date = new Date(app.getDate().replace(/-/g, "/"));// 当前时间
        console.log(time1Date);
        console.log(time2Date);

        console.log(parseInt(time1Date - time2Date));//两个时间相差的毫秒数
        console.log(parseInt(time1Date - time2Date) / 1000);//两个时间相差的秒数
        console.log(parseInt(time1Date - time2Date) / 1000 / 60);//两个时间相差的分钟数
        console.log(parseInt(time1Date - time2Date) / 1000 / 60);//两个时间相差的小时数

        return parseInt(time1Date - time2Date) / 1000;
    },

    nowTime() {
        var that = this;

        console.log(that.timeOffset());
    },

    bindButtonTap: function () {
        this.setData({
            focus: true
        })
    },

    search() {
        dd.navigateTo({
            url: '/page/index/search/search',
            success: (res) => {
                console.log(res);
            },
            fail: (res) => {
                console.log(res);
            }
        });
    },

    agendaManager(e) {
        var id = e.currentTarget.dataset.id;
        dd.navigateTo({
            url: '/page/meetingAgenda/agendaManagement/agendaManagement?id=' + id,
            success: (res) => {
                console.log(res);
            },
            fail: (res) => {
                console.log(res);
            }
        });
    },

    toConferenceDetail(e) {
        console.log('e');
        console.log(e);
        var conference = e.target.dataset.conference;
        dd.navigateTo({
            url: '/page/meetingAgenda/conferenceDetail/conferenceDetail?conference=' + JSON.stringify(conference),
            success: (res) => {
                console.log(res);
            },
            fail: (res) => {
                console.log(res);
            }
        });
    },

    dateOrder() {
        var that = this;
        // console.log(that.getDateArr(that.data.conferenceList));
        // var dateStr = '2017-1-2';
        // var reg = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
        // console.log(dateStr.match(reg));
        // console.log(RegExp.$1);
        // console.log(RegExp.$2);
        // console.log(RegExp.$3);

        dd.removeStorage({
            key: 'administrator',
            success: function () {
                dd.alert({content: '删除administrator成功'});
            }
        });

        dd.removeStorage({
            key: 'user',
            success: function () {
                dd.alert({content: '删除user成功'});
            }
        });

        console.log(that.getMeetingList());
        // console.log(that.data.conferenceList);

    },


    getDateArr(arr) {
        console.log('arr');
        console.log(arr);
        var new_arr = {};
        for (var i = 0, len = arr.length; i < len; i++) {
            var Month_index = arr[i].time.lastIndexOf('-');// 从右向左查某个指定的字符串在字符串中最后一次出现的位置（也就是从后往前查）
            console.log(Month_index);// 月份索引 7
            var time = arr[i].time.substr(0, Month_index);
            console.log(time);// 2019-1
            if (!new_arr[time]) {
                new_arr[time] = [];
                new_arr[time].push(arr[i])
            } else {
                new_arr[time].push(arr[i])
            }

        }
        return new_arr;
    },

    addConference() {
        dd.navigateTo({
            url: '/page/meetingAgenda/addConference/addConference',
            success: (res) => {

            },
            fail: (res) => {

            }
        })
    },

    operation(e) {
        console.log("operation");
        console.log(e);
        var conference = e.target.dataset.conference;
        var id = e.target.dataset.conference.id;
        console.log(id);
        var that = this;
        var isAdmin = that.data.isAdmin;// 默认是管理员
        console.log(isAdmin);
        // TODO 分管理员与非管理员
        if (isAdmin) {// 如果是管理员：'会议详情', '签到统计', '补充会议纪要', '请假管理'
            // dd.showActionSheet({
            //     title: '管理员',
            //     items: ['会议详情', '签到统计', '补充会议纪要', '请假管理'],
            //     cancelButtonText: '取消',
            //     success: (res) => {
            //         console.log("动作界面");
            //         console.log(res);
            //         const btn = res.index === -1 ? '取消' : '第' + res.index + '个';
            //         console.log(btn);
            //         switch (res.index) {
            //             case 0:
            //                 dd.navigateTo({
            //                     url: '/page/meetingAgenda/conferenceDetail/conferenceDetail?conference=' + JSON.stringify(conference),
            //                     success: (res) => {
            //                         console.log(res);
            //                     },
            //                     fail: (res) => {
            //                         console.log(res);
            //                     }
            //                 });
            //                 break;
            //             case 1:
            //                 dd.alert({ title: '签到统计' });
            //                 break;
            //             case 2:
            //                 dd.navigateTo({
            //                     url: '/page/index/addMeetingSummary/addMeetingSummary?conference=' + conference,
            //                     success: (res) => {
            //                         console.log(res);
            //                     },
            //                     fail: (res) => {
            //                         console.log(res);
            //                     }
            //                 });
            //                 break;
            //             case 3:
            //                 dd.alert({ title: '请假管理' });
            //                 break;
            //         }
            //
            //         // dd.alert({
            //         //     title: `你点了${btn}按钮`
            //         // });
            //     },
            // });
        } else {// 非管理员：'会议详情', '请假'
            // dd.showActionSheet({
            //     title: '普通用户',
            //     items: ['会议详情', '会议笔记', '请假'],
            //     cancelButtonText: '取消',
            //     success: (res) => {
            //         const btn = res.index === -1 ? '取消' : '第' + res.index + '个';
            //         switch (res.index) {
            //             case 0:
            //                 dd.navigateTo({
            //                     url: '/page/meetingAgenda/conferenceDetail/conferenceDetail?conference=' + JSON.stringify(conference),
            //                     success: (res) => {
            //                         console.log(res);
            //                     },
            //                     fail: (res) => {
            //                         console.log(res);
            //                     }
            //                 });
            //                 break;
            //             case 1:
            //                 dd.navigateTo({
            //                     url: '/page/index/notes/notes?conference=' + JSON.stringify(conference),
            //                     success: (res) => {
            //                         console.log(res);
            //                     },
            //                     fail: (res) => {
            //                         console.log(res);
            //                     }
            //                 });
            //                 dd.alert({ title: '会议笔记' });
            //                 break;
            //             case 2:
            //                 // dd.navigateTo({
            //                 //     url: '/page/meetingAgenda/conferenceDetail/conferenceDetail?id=' + id,
            //                 //     success: (res) => {
            //                 //         console.log(res);
            //                 //     },
            //                 //     fail: (res) => {
            //                 //         console.log(res);
            //                 //     }
            //                 // });
            //                 dd.alert({ title: '请假' });
            //                 break;
            //         }
            //         // dd.alert({
            //         //     title: `你点了${btn}按钮`
            //         // });
            //     },
            // });
        }

    },

    tarbarOpera(e) {
        var that = this;
        console.log(e);
        var tarBarItem = e.target.dataset.tarBarItem;
        var tarbarIndex = tarBarItem.index;
        var pagePath = tarBarItem.pagePath;
        var icon = tarBarItem.icon;
        var activeIcon = tarBarItem.activeIcon;
        var tarBarName = tarBarItem.name;
        var isSelected = tarBarItem.isSelected;
        if (isSelected == false) {// 未被选中才可以跳转
            dd.navigateTo({
                url: pagePath,
                success: (res) => {
                    console.log(res);
                },
                fail: (res) => {
                    console.log(res);
                }
            });
            for (var i = 0; i < that.data.tarbar.length; i++) {
                that.data.tarbar[i].isSelected = false;// 全部置为未选状态
            }
            that.setData({})
            console.log(tarbarIndex);
            console.log(that.data.tarbar);
        } else {
            // 选中状态什么都不做
        }
    },

    /**
     * 根据url保存文件到我的钉盘、企业钉盘
     */
    saveFileToDingPlate(url) {
        console.log('上传文件');
        // 转存文件到钉盘
        dd.saveFileToDingTalk({
            url: "http://tglive-qa.oss-cn-hangzhou.aliyuncs.com/admin/source2018022510025548318668-c170-43a2-bce3-462ab20a207d.doc",  // 文件在第三方服务器地址
            name: "source2018022510025548318668-c170-43a2-bce3-462ab20a207d.doc",
            success: (res) => {
                console.log(JSON.stringify(res))
                console.log(JSON.stringify(res.data))
                console.log(JSON.stringify(res.data[0].spaceId))
                console.log(JSON.stringify(res.data[0].fileId))
                console.log(JSON.stringify(res.data[0].fileName))
                console.log(JSON.stringify(res.data[0].fileSize))
                console.log(JSON.stringify(res.data[0].fileType))
                // 预览文件
                dd.previewFileInDingTalk({
                    corpId: "ding44bff8b1633ae32e35c2f4657eb6378f",
                    spaceId: res.data[0].spaceId,
                    fileId: res.data[0].fileId,
                    fileName: res.data[0].fileName,
                    fileSize: res.data[0].fileSize,
                    fileType: res.data[0].fileType
                })
            },
            fail: (err) => {
                dd.alert({
                    content: JSON.stringify(err)
                })
            }
        })
    },

    filePreview() {
        dd.previewFileInDingTalk({
            corpId: "ding44bff8b1633ae32e35c2f4657eb6378f",
            spaceId: "1837002072",
            fileId: "8148877510",
            fileName: "DBBCCB5D-E0C9-40BF-BCC0-856C968D91A2-4074-000002F08AC45747.JPG",
            fileSize: 7512,
            fileType: "jpg"
        })
    },

    /**
     * 获取企业下的自定义空间
     */
    querySpaceId() {
        dd.httpRequest({
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            url: domain + '/dingPlate/getCustomSpace?domain=test',
            method: 'POST',
            dataType: 'json',
            success: function (res) {
                // dd.alert({ content: 'success' });
                console.log("获取企业下的自定义空间 成功");
                console.log(res);
            },
            fail: function (res) {
                dd.alert({content: 'fail'});
                console.log(res);
            },
            // complete: function(res) {
            //     dd.alert({ content: 'complete' });
            //     console.log(res);
            // }
        });

    },

    /**
     * 上传附件到钉盘/从钉盘选择文件
     */
    uploadFileToDingTalk() {

        this.querySpaceId();

        // TODO 调用grantCustomSpace接口 授权用户访问企业自定义空间
        dd.httpRequest({
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            url: domain + '/dingPlate/grantCustomSpace?type=add&domain=test',
            method: 'GET',
            data: {},
            dataType: 'json',
            success: function (res) {
                // dd.alert({ content: 'success' });
                console.log("授权用户访问企业自定义空间 成功");
                console.log(res);
            },
            // fail: function (res) {
            // 	dd.alert({ content: 'fail' });
            // 	console.log(res);
            // },
            // complete: function (res) {
            // 	dd.alert({ content: 'complete' });
            // 	console.log(res);
            // }
        });


        dd.uploadAttachmentToDingTalk({
            image: {multiple: true, compress: false, max: 9, spaceId: "1837002072"},
            space: {spaceId: "1837002072", isCopy: 1, max: 9},
            file: {spaceId: "1837002072", max: 1},
            types: ["photo", "camera", "file", "space"],//PC端仅支持["photo","file","space"]
            success: (res) => {
                console.log(res);
                // 后端进行上传
            },
            fail: (err) => {
                console.log(err);
                dd.alert({
                    content: JSON.stringify(err)
                })
            }
        })
    },

    /**
     * 选取钉盘目录
     */
    chooseDingTalkPlateDir() {
        dd.chooseDingTalkDir({
            success: (res) => {
                console.log(res);
                /* data结构
                 {"data":
                    [
                        {
                            "spaceId": "" //被选中的空间id
                            "path": "", // 被选中的文件夹路径
                            "dirId": "", //被选中的文件夹id
                        }
                    ]
                 }
               */
            },
            fail: (err) => {
                dd.alert({
                    content: JSON.stringify(err)
                })
            }
        })
    },


})