import { MeetingRoom } from "../../../model/conference/meetingRoom";
import { Agenda } from "../../../model/conference/agenda";
import { Department } from "../../../model/department/department";
import { InterAction } from "../../../utils/native-api/interface/interaction";
import { Navigate } from "../../../utils/native-api/interface/navigate";
import { PageUrlConstant } from "../../../config/pageUrlConstant";
import { Caching } from "../../../utils/native-api/caching/caching";
import { AddConferenceInfo } from "../../../model/conference/AddConferenceInfo";
import { Conference } from "../../../model/conference/conference";
import { InteractionEnum } from "../../../utils/native-api/interface/InteractionEnum";
import { Common } from "../../../utils/tabjin-utils/common";

let dateTimePicker = require('/utils/date/dateTimePicker.js');
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
        conference: {
            // TODO 从缓存获取uid，这个uid是首次加载的时候
            uid: '1219441916791739',
            theme: '',
            dateTime: '',
            roomId: 1,
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
        meetingRoomShow: false,// 默认不展示会议室

        collapseData: {
            onTitleTap: 'handleTitleTap',
            panels: [
                {
                    agendaTypeIndex: 0,
                    agendaTypeName: '会议议题',
                    agendaContent: [],
                    // expanded: false,
                    expanded: true
                },
            ],
        },
        isOpen: true,// 默认公开
    },

    onLoad() {
        let that = this;
        // 获取完整的年月日 时分秒，以及默认显示的数组
        let obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
        console.log(obj);
        let obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
        // 精确到分的处理，将数组的秒去掉
        let lastArray = obj1.dateTimeArray.pop();
        let lastTime = obj1.dateTime.pop();

        //dateTime = obj.dateTime;
        let dateTimeArray = obj.dateTimeArray;
        let dateTimeArray1 = obj1.dateTimeArray;
        let dateTime1 = obj1.dateTime;

        let dateTime = dateTimeArray1[0][dateTime1[0]] + '-' +
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

        that.chooseLocation();
    },

    onShow() {
        this.getAgendaArray();

        this.chooseLocation();
    },

    async getAgendaArray() {
        let agendaContent = [];
        const agendaList = await Agenda.getAgenda(Caching.getStorageSync('orgId'));
        // 内省在agenda模型中做了
        for (let i = 0; i < agendaList.length; i++) {
            agendaContent.push(agendaList[i]);
        }
        this.setData({
            'collapseData.panels[0].agendaContent': agendaContent
        });
    },

    /**
     * 选择会议地点
     * @param e
     */
    radioChange: function(e) {
        console.log('你选择的框架是：');
        console.log(e);
        this.setData({
            'conference.roomId': e.detail.value.id,
            'conference.address': e.detail.value.name,
        });
    },

    /**
     * 发布会议
     * @param e
     */
    async formSubmit(e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value);
        let currentUser = Caching.getStorageSync('currentUser');
        console.log('currentUser', currentUser);
        console.log('currentUser.basicCurrentUserInfo.userid,', currentUser.basicCurrentUserInfo.userid);
        let conference = e.detail.value;
        delete conference.radio;
        const addConferenceInfo = new AddConferenceInfo(
            currentUser.basicCurrentUserInfo.userid,
            conference.theme,
            conference.address,
            conference.time,
            conference.info,
            conference.conferee,
            conference.topic,
            conference.roomId,
            currentUser.basicCurrentUserInfo.orgId,
            conference.isOpen ? 1 : 0
        );
        console.log('addConferenceInfo', addConferenceInfo);
        if (addConferenceInfo.dataCheck()) {
            const addConferenceRes = await Conference.addConference(addConferenceInfo);
            InterAction.fnShowToast('新增成功', InteractionEnum.DD_SHOW_TOAST_TYPE_SUCCESS, InteractionEnum.DD_SHOW_TOAST_DURATION);
            Navigate.navigateBack(1);
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
        let arr = this.data.dateTime, dateArr = this.data.dateTimeArray;

        arr[e.detail.column] = e.detail.value;
        dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

        this.setData({
            dateTimeArray: dateArr,
            dateTime: arr
        });
    },

    changeDateTimeColumn1(e) {
        let arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;

        arr[e.detail.column] = e.detail.value;
        dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

        this.setData({
            dateTimeArray1: dateArr,
            dateTime1: arr
        });
    },

    handleTitleTap(e) {
        const { index } = e.currentTarget.dataset;
        const panels = this.data.collapseData.panels;
        // android does not supprt Array findIndex
        // panels[index].expanded = !panels[index].expanded;
        // panels[0].expanded = !panels[0].expanded;
        panels[0].expanded = true;
        this.setData({
            collapseData: {
                ...this.data.collapseData,// 各数组的值，不是数组
                panels: [...panels],// [...panels]才是一个数组，所以...panels可以用来对方法进行传值
            },
        });
    },

    onChange(e) {
        console.log(e);
    },


    conferenceThemeInput(e) {
        let that = this;
        that.setData({
            'conference.theme': e.detail.value,
        });
    },

    conferenceTimeInput(e) {
        let that = this;
        console.log("选择时间input被触发");
        that.setData({
            'conference.dateTime': e.detail.value,
        });
    },

    conferenceAddressInput(e) {
        let that = this;
        that.setData({
            'conference.address': e.detail.value,
        });
    },

    conferenceInfoInput(e) {
        let that = this;
        that.setData({
            'conference.info': e.detail.value,
        });
    },

    /**
     * 选择会议室
     * @returns {Promise<void>}
     */
    async chooseLocation() {
        this.setData({
            meetingRoomShow: true
        })

        // 选择会议室
        const meetingRoomList = await MeetingRoom.getMeetingRoom(Caching.getStorageSync('orgId'));

        if (!Common.isEmpty(meetingRoomList)) {
            if (this._checkMeetingRoomLocationIsEmpty(meetingRoomList)) {// 会议室数据异常仅报异常，至于会议室数据严格校验放在会议室新增部分
                // InterAction.fnShowToast(`数据室异常，存在空数据，请联系管理员校验数据`, InteractionEnum.DD_SHOW_TOAST_TYPE_EXCEPTION, InteractionEnum.DD_SHOW_TOAST_DURATION);
            }
            this.setData({// 不管会议室数据有误异常，都要展示
                meetingRoom: meetingRoomList,
                meetingRoomShow: true
            });
        } else {
            InterAction.fnShowToast('获取会议室失败！', InteractionEnum.DD_SHOW_TOAST_TYPE_EXCEPTION, InteractionEnum.DD_SHOW_TOAST_DURATION);
        }
    },

    _checkMeetingRoomLocationIsEmpty(meetingRoomList) {
        return meetingRoomList.some(meetingRoom => {
            return meetingRoom.location === '';
        });
    },

    meetingRoom(e) {
        let that = this;
        let meetingRoomId = e.target.dataset.meetingRoom.id;
        let meetingRoomName = e.target.dataset.meetingRoom.name;
        that.setData({
            'conference.roomId': meetingRoomId,
            'conference.address': meetingRoomName
        });
    },

    /**
     * 新增会议室
     */
    bookMeetingRoom() {
        Navigate.navigateTo(PageUrlConstant.meetingRoom);
    },

    chooseTime() {
        dd.datePicker({
            format: 'yyyy-MM-dd HH:mm',
            // currentDate: '2012-12-12',// 默认当前时间
            success: (res) => {
                this.setData({
                    dateTime: res.date,
                })
            },
        });
    },

    chooseParticipant() {
        let that = this;
        let chooseParticipantId = [];

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
            success: async function(res) {
                console.log("res");
                console.log(res);
                console.log(JSON.stringify(res));

                /**
                 *
                 {
	"selectedCount": 5,
	"users": [{
		"name": "徐安平",
		"avatar": "https://static.dingtalk.com/media/lADPDgQ9q42pCw_NDufNDuc_3815_3815.jpg",
		"userId": "083829343524260506"
	}, {
		"selectDeptName": "党支部2",
		"selectDeptId": 143807302,
		"name": "哇申丽娜",
		"avatar": "https://static.dingtalk.com/media/lADPDgQ9q8RWBaXNA4XNA4U_901_901.jpg",
		"userId": "06276449361971558656"
	}, {
		"name": "王芳芳",
		"avatar": "https://static.dingtalk.com/media/lADOATikS80E2s0E1w_1239_1242.jpg",
		"userId": "012452322629496107"
	}, {
		"selectDeptName": "党支部2",
		"selectDeptId": 143807302,
		"name": "张",
		"avatar": "",
		"userId": "266741284524352"
	}],
	"departments": [{
		"id": 143414386,
		"name": "党支部1",
		"count": 1
	}]
}
                 */

                console.log('res')
                console.log(res.selectedCount);
                let chooseParticipantNumber = res.selectedCount;
                // 检查选的个人还是部门，即users或departments
                if (JSON.stringify(res.users) != '[]') {// 用户被选
                    res.users.forEach(user => {
                        chooseParticipantId.push(user.userId);
                    });
                }

                if (JSON.stringify(res.departments) != '[]') {// 部门被选
                    // 根据部门查询所有用户
                    const denpartmentUseridList = await Department.getDepartmentUserid(res.departments[0].id);
                    chooseParticipantId.push(...denpartmentUseridList);
                }

                console.log('chooseParticipantId');
                console.log(chooseParticipantId);
                console.log('chooseParticipantId');

                that.setData({
                    chooseParticipantNumber: res.selectedCount,
                    chooseParticipant: res.users,
                    chooseParticipantId: chooseParticipantId.join(',')
                })
            },
            fail: function(err) {
            }
        });
    },

    switchChange(e) {
        console.log('switchChange 事件，值:', e.detail.value);
        this.setData({
            isOpen: e.detail.value
        })
    },
});

