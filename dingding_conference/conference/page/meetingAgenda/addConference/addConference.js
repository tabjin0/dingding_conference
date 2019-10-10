var dateTimePicker = require('/utils/date/dateTimePicker.js');
const app = getApp();

Page({
    data: {
        array: ['中国', '美国', '巴西', '日本'],

        date: '2018-10-01',
        time: '12:00',
        dateTimeArray: null,
        dateTime: null,
        dateTimeArray1: null,
        dateTime1: null,
        startYear: 2000,
        endYear: 2050,

        // 会议主题
        // 会议表单
        conference: {
            // TODO 从缓存获取uid，这个uid是首次加载的时候
            uid: '1219441916791739',
            theme: '',
            dateTime: '',
            roomId: null,
            address: '',
            longitude: '',
            latitude: '',
            info: '',
            agenda: [
                {
                    typeIndex: 0,
                    typeName: '',
                    content: '',
                }
            ],
        },

        chooseParticipantNumber: 0,// 参加人员数
        chooseParticipant: [],// 参加人员
        chooseParticipantId: '',
        topic: '',// 议题

        meetingRoom: [],// 会议室列表

        collapseData: {
            onTitleTap: 'handleTitleTap',
            panels: [
                {
                    agendaTypeIndex: 0,
                    agendaTypeName: '会议议题',
                    agendaContent: [
                        // {
                        //     id: 1,
                        //     name: '党支部组织的理论学习教育及党性教育实践活动',
                        // }, {
                        //     id: 2,
                        //     name: '党支部\"统一活动日\"\"主题党日\"等活动',
                        // }, {
                        //     id: 3,
                        //     name: '党课',
                        // }, {
                        //     id: 4,
                        //     name: '组织生活会（民主生活会）',
                        // }, {
                        //     id: 5,
                        //     name: '民主评议党员活动',
                        // }, {
                        //     id: 6,
                        //     name: '党小组会、党员大会',
                        // }, {
                        //     id: 7,
                        //     name: '足额交纳党费',
                        // }, {
                        //     id: 8,
                        //     name: '社区报到开展志愿服务',
                        // }, {
                        //     id: 9,
                        //     name: '结对帮扶、走访慰问活动',
                        // }, {
                        //     id: 10,
                        //     name: '\"立足岗位、创先争优\"活动',
                        // }
                    ],
                    expanded: false,
                },
            ],
        },

        operation: [
            // {
            //     index: 0,
            //     pagePath: "/page/index/index",
            //     icon: "/resources/icon/addConference/huiyi.png",
            //     activeIcon: "/resources/icon/tarbar/ziyuan-selected.png",
            //     name: "新增会议室",
            //     isSelected: true // 默认选中
            // },
            {
                operaImg: '/resources/icon/addConference/huiyi.png',
                operaTitle: '新增会议室',
                operaTap: 'addMeetingRoom',
                isShow: true
            },
            {
                operaImg: '/resources/icon/addConference/ding.png',
                operaTitle: '通知',
                operaTap: 'notification',
                isShow: true
            }, {
                operaImg: '/resources/icon/addConference/fujian.png',
                operaTitle: '附件',
                operaTap: 'attachment',
                isShow: true
            },
            // {
            //     operaImg: '/resources/icon/addConference/miaoshucopy.png',
            //     operaTitle: '描述',
            //     operaTap: 'desc',
            //     isShow: true
            // }
        ]
    },

    onLoad() {
        var that = this;
        // 获取完整的年月日 时分秒，以及默认显示的数组
        var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
        console.log(obj);
        var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
        // 精确到分的处理，将数组的秒去掉
        var lastArray = obj1.dateTimeArray.pop();
        var lastTime = obj1.dateTime.pop();

        //dateTime = obj.dateTime;
        var dateTimeArray = obj.dateTimeArray;
        var dateTimeArray1 = obj1.dateTimeArray;
        var dateTime1 = obj1.dateTime;

        var dateTime = dateTimeArray1[0][dateTime1[0]] + '-' +
            dateTimeArray1[1][dateTime1[1]] + '-' + dateTimeArray1[2][dateTime1[2]] + ' ' + dateTimeArray1[3][dateTime1[3]] + ':' + dateTimeArray1[4][dateTime1[4]]

        this.setData({
            // dateTime: obj.dateTime,
            'conference.dateTime': dateTime,
            dateTime: dateTime,
            dateTimeArray: obj.dateTimeArray,
            dateTimeArray1: obj1.dateTimeArray,
            dateTime1: obj1.dateTime
        });

        that.getAgendaArray();
    },

    getAgendaArray() {
        var that = this;
        console.log("77777");
        console.log(that.data.collapseData.panels[0])
        var agendaContent = [];
        dd.httpRequest({
            url: 'http://api.yzcommunity.cn/api/5d8b1976c8132',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'version': 'v3.0',
                'access-token': ''
            },
            dataType: 'json',
            success: function(res) {
                console.log(res);
                console.log(res.data.data);
                console.log("1223");
                for (var i = 0; i < res.data.data.length; i++) {
                    agendaContent.push(res.data.data[i]);
                }
                that.setData({
                    'collapseData.panels[0].agendaContent': agendaContent
                })
            },
            fail: function(res) {
                dd.alert({ content: '获取议题失败' });
            },
        });
    },

    chooseTime() {
        dd.datePicker({
            format: 'yyyy-MM-dd HH:mm',
            // currentDate: '2012-12-12',// 默认当前时间
            success: (res) => {
                // dd.alert({
                // 	content: res.date,
                // });
                this.setData({
                    dateTime: res.date,
                })
            },
        });
    },

    formSubmit(e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value);
        var conference = e.detail.value;
        // conference.topic = e.detail.value.topic.join(',');
        console.log('conference');
        console.log(conference);
        console.log(app.isNull(conference.uid))

        // 表单数据内省
        if (app.isNull(conference.uid)) {
            dd.alert({ title: '未获取到当前用户，请重新打开应用' });
        } else if (app.isNull(conference.theme)) {
            dd.alert({ title: '请输入会议主题' });
        } else if (app.isNull(conference.time)) {
            dd.alert({ title: '请选择会议时间' });
        } else if (app.isNull(conference.address)) {
            dd.alert({ title: '请选择会议地点' });
        } else if (app.isNull(conference.topic)) {
            dd.alert({ title: '请选择会议议题' });
        } else if (app.isNull(conference.info)) {
            dd.alert({ title: '请输入会议内容' });
        } else if (app.isNull(conference.conferee)) {
            dd.alert({ title: '请选择参会人员' });
        } else {
            dd.httpRequest({
                url: 'https://api.yzcommunity.cn/api/5d8b1812a0cda',
                method: 'GET',
                headers: {
                    // 'Content-Type': 'application/json',
                    'version': 'v3.0',
                    'access-token': ''
                },
                data: conference,
                success: function(res) {
                    console.log("新增会议成功");
                    console.log(res);
                    dd.alert({ title: "新增会议成功" });
                    dd.navigateBack({
                        delta: 2
                    })

                },
                fail: function(res) {
                    console.log(res);
                    dd.alert({ content: '新增会议失败' });
                    console.log
                },
            });
        }


    },

    formReset() {
        console.log('form发生了reset事件');
    },

    changeDate(e) {
        this.setData({ date: e.detail.value });
    },
    changeTime(e) {
        this.setData({ time: e.detail.value });
    },
    changeDateTime(e) {
        this.setData({ dateTime: e.detail.value });
    },
    changeDateTime1(e) {
        this.setData({ dateTime1: e.detail.value });
    },
    changeDateTimeColumn(e) {
        var arr = this.data.dateTime, dateArr = this.data.dateTimeArray;

        arr[e.detail.column] = e.detail.value;
        dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

        this.setData({
            dateTimeArray: dateArr,
            dateTime: arr
        });
    },

    changeDateTimeColumn1(e) {
        var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;

        arr[e.detail.column] = e.detail.value;
        dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

        this.setData({
            dateTimeArray1: dateArr,
            dateTime1: arr
        });
    },

    handleTitleTap(e) {
        const { index } = e.currentTarget.dataset;
        console.log("e");
        console.log(e);
        console.log("e.currentTarget.dataset");
        console.log(e.currentTarget.dataset);
        const panels = this.data.collapseData.panels;
        console.log("this.data.collapseData.panels");
        console.log(this.data.collapseData.panels);
        console.log(panels[0]);
        // android does not supprt Array findIndex
        // panels[index].expanded = !panels[index].expanded;
        panels[0].expanded = !panels[0].expanded;
        this.setData({
            collapseData: {
                ...this.data.collapseData,// 各数组的值，不是数组
                panels: [...panels],// [...panels]才是一个数组，所以...panels可以用来对方法进行传值
            },
        });
    },

    radioChange(e) {
        console.log('你选择的框架是：', e.detail.value)
    },

    onChange(e) {
        console.log(e);

        // dd.alert({
        //     title: `你选择的框架是 ${e.detail.value}`,
        // });
    },

    /** 添加会议室 */
    addMeetingRoom() {
        dd.navigateTo({
            url: '/page/meetingAgenda/bookMeetingRoom/bookMeetingRoom',
            success: (res) => {
                console.log(res);
            },
            fail: (res) => {
                console.log(res);
            }
        });
    },

    /** 通知 */
    notification() {
        var that = this;
        console.log("会议内容");
        console.log(JSON.stringify(that.data.conference));
        console.log("会议内容2");

        var conferenceTheme = that.data.conference.theme;
        var conferenceDateTime = that.data.conference.dateTime;
        var conferenceAddress = that.data.conference.address;
        var conferenceAgenda = that.data.conference.agenda;
        if (conferenceTheme == '' || conferenceTheme == null || conferenceTheme == undefined) {
            dd.alert({
                content: '请输入会议主题'
            });
        } else if (conferenceDateTime == '' || conferenceDateTime == null || conferenceDateTime == undefined) {
            dd.alert({
                content: '请选择会议时间'
            });
        } else if (conferenceAddress == '' || conferenceAddress == null || conferenceAddress == undefined) {
            dd.alert({
                content: '请输入会议地点'
            });
        } else {
            var corpId = app.globalData.corpId;
            console.log(corpId);

            dd.createDing({
                users: ["1219441916791739"], //默认选中用户工号列表；类型: Array<String>
                corpId: "dingb6feca243794ddb335c2f4657eb6378f", // 类型: String
                alertType: 0, // 钉发送方式 0:电话, 1:短信, 2：应用内；类型 Number
                alertDate: { "format": "yyyy-MM-dd HH:mm", "value": "2019-08-29 08:25" }, // 非必选，定时发送时间, 非定时DING不需要填写
                type: 2,// 附件类型 1：image, 2：link；类型: Number

                // 非必选
                // 附件信息
                attachment: {
                    images: ["https://www.baidu.com/img/bd_logo1.png?where=super", "https://www.baidu.com/img/bd_logo1.png?where=super", "https://www.baidu.com/img/bd_logo1.png?where=super"], // 图片附件, type=1时, 必选；类型: Array<String>
                    image: "https://www.baidu.com/img/bd_logo1.png?where=super", // 链接附件, type=2时, 必选；类型: String    
                    title: conferenceTheme, // 链接附件, type=2时, 必选；类型: String
                    url: "https://www.baidu.com/img/bd_logo1.png?where=super", // 链接附件, type=2时, 必选；类型 String
                    text: "测试发钉成功" // 链接附件, type=2时, 必选；类型: String
                },

                text: conferenceTheme,  // 正文
                bizType: 0, // 业务类型 0：通知DING；1：任务；2：会议；

                // 任务信息
                // bizType=1的时候选填
                taskInfo: {
                    ccUsers: ['100', '101'],// 抄送用户列表, 工号，类型: Array<String>
                    deadlineTime: { "format": "yyyy-MM-dd HH:mm", "value": "2015-05-09 08:00" }, // 任务截止时间    
                    taskRemind: 30 // 任务提醒时间, 单位分钟；支持参数: 0：不提醒；15：提前15分钟；60：提前1个小时；180：提前3个小时；1440：提前一天；类型: Number
                },

                // 日程信息
                // bizType=2的时候选填
                confInfo: {
                    bizSubType: 0,  // 子业务类型如会议: 0:预约会议, 1:预约电话会议, 2:预约视频会议；类型: Number (注: 目前只有会议才有子业务类型)；
                    location: '某某会议室', // 会议地点(非必选)，类型: String    
                    startTime: { "format": "yyyy-MM-dd HH:mm", "value": "2015-05-09 08:00" },// 会议开始时间  
                    endTime: { "format": "yyyy-MM-dd HH:mm", "value": "2015-05-09 08:00" },// 会议结束时间    
                    remindMinutes: 30, // 会前提醒。单位分钟；1:不提醒, 0:事件发生时提醒, 5:提前5分钟, 15:提前15分钟, 30:提前30分钟, 60:提前1个小时, 1440:提前一天
                    remindType: 2 // 会议提前提醒方式；0:电话, 1:短信, 2:应用内；类型: Number
                },

                success: function(res) {
                    /*
                    {
                     "dingId": "1_1_a09f167xxx",
                     "text": "钉正文内容",
                     "result": true
                    }
                    */
                    console.log(res);
                },
                fail: function(err) {
                }
            })
        }
        // if (conferenceAgenda == '' || conferenceAgenda == null || conferenceAgenda == undefined) {
        //     dd.alert({
        //         content: '请输入会议主题'
        //     });
        // }


    },

    conferenceThemeInput(e) {
        var that = this;
        that.setData({
            'conference.theme': e.detail.value,
        });
    },

    conferenceTimeInput(e) {
        var that = this;
        console.log("选择时间input被触发");
        that.setData({
            'conference.dateTime': e.detail.value,
        });
    },

    conferenceAddressInput(e) {
        var that = this;
        that.setData({
            'conference.address': e.detail.value,
        });
    },

    conferenceInfoInput(e) {
        var that = this;
        that.setData({
            'conference.info': e.detail.value,
        });
    },

    chooseLocation() {
        var that = this;
        // 定位
        // dd.getLocation({
        //     success(res) {
        //         console.log(res);
        //         that.setData({
        //             'conference.address': res.address,// 地址
        //             'conference.longitude': res.longitude,// 经度
        //             'conference.latitude': res.latitude,// 纬度
        //         });
        //         console.log(that.data.conference);
        //     },
        //     fail() {

        //     },
        // })

        // 选择会议室
        var meetingRoom = [];
        dd.httpRequest({
            url: 'http://api.yzcommunity.cn/api/5d8b19b1744c7',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'version': 'v3.0',
                'access-token': ''
            },
            dataType: 'json',
            success: function(res) {
                console.log(res);
                console.log(res.data.data);
                console.log("1223");
                for (var i = 0; i < res.data.data.length; i++) {
                    meetingRoom.push(res.data.data[i]);
                }
                that.setData({
                    meetingRoom: meetingRoom
                })
                console.log('meetingRoom');
                console.log(meetingRoom);
            },
            fail: function(res) {
                console.log(res);
                dd.alert({ content: res.errorMessage });
            },
        });
    },

    meetingRoom(e) {
        console.log('e');
        console.log(e);
        var that = this;
        var meetingRoomId = e.target.dataset.meetingRoom.id;
        var meetingRoomName = e.target.dataset.meetingRoom.name;
        that.setData({
            'conference.roomId': meetingRoomId,
            'conference.address': meetingRoomName
        });

    },

    chooseParticipant() {
        var that = this;
        var chooseParticipantId = [];
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
            success: function(res) {
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
                console.log("突突突");
                console.log(chooseParticipantNumber);
                console.log(chooseParticipant);
                for (var i = 0; i < chooseParticipantNumber; i++) {
                    chooseParticipantId.push(res.users[i].userId);
                }
                console.log(chooseParticipantId);
                that.setData({
                    chooseParticipantNumber: res.selectedCount,
                    chooseParticipant: res.users,
                    chooseParticipantId: chooseParticipantId.join(',')
                })
            },
            fail: function(err) {
            }
        });

        console.log("数据");
        console.log(that.data.chooseParticipant);
    },

    test() {
        var that = this;
        that.getAgendaArray();
        console.log("9999999");
        app.getUrl('agendaArray');
        console.log("9999999");
    }

});

