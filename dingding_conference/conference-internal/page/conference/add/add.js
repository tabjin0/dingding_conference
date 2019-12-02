import {MeetingRoom} from "../../../model/conference/meetingRoom";
import {Agenda} from "../../../model/agenda";
import {Department} from "../../../model/conference/department";
import {Storage} from "../../../utils/storage";
import {InterAction} from "../../../utils/native-api/interface/interaction";
import {Navigate} from "../../../utils/native-api/interface/navigate";
import {PageUrlConstant} from "../../../config/pageUrlConstant";

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
    // 会议表单
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
          expanded: false,
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
  },

  async getAgendaArray() {
    let agendaContent = [];
    const agendaList = await Agenda.getAgenda();
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
  radioChange: function (e) {
    console.log('你选择的框架是：');
    console.log(e);
    this.setData({
      'conference.roomId': e.detail.value.id,
      'conference.address': e.detail.value.name,
    })
    // console.log(e.detail)
    // console.log(e.detail.value)
    // console.log('你选择的框架是：');
  },

  /**
   * 发布会议
   * @param e
   */
  formSubmit(e) {

    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    let currentUser = Storage.getStorageSyncByKey('currentUser');
    let conference = e.detail.value;
    conference.orgId = currentUser.orgId;
    conference.open = conference.isOpen ? 1 : 0;
    delete conference.radio;
    // 表单数据内省
    if (app.isNull(conference.uid)) {
      InterAction.fnAlert('抱歉', '未获取到当前用户，请重新打开应用', '好的');
    } else if (app.isNull(conference.theme)) {
      InterAction.fnAlert('抱歉', '请输入会议主题', '好的');
    } else if (app.isNull(conference.time)) {
      InterAction.fnAlert('抱歉', '请选择会议时间', '好的');
    } else if (app.isNull(conference.address)) {
      InterAction.fnAlert('抱歉', '请选择会议地点', '好的');
    } else if (app.isNull(conference.topic)) {
      InterAction.fnAlert('抱歉', '请选择会议议题', '好的');
    } else if (app.isNull(conference.info)) {
      InterAction.fnAlert('抱歉', '请输入会议内容', '好的');
    } else if (app.isNull(conference.conferee)) {
      InterAction.fnAlert('抱歉', '请选择参会人员', '好的');
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
        success: function (res) {
          InterAction.fnShowToast('success', '新增会议成功', 2000);
          dd.navigateBack({
            delta: 1
          });
        },
        fail: function (res) {
          console.log(res);
          InterAction.fnAlert('抱歉', '新增会议失败', '好的');
          console.log
        },
      });
    }
  },

  /** 发钉 */
  notification(confereeArr) {
    let that = this;
    console.log("会议内容");
    console.log(JSON.stringify(that.data.conference));
    console.log(that.data.conference);
    console.log("会议内容2");

    if (app.isNull(that.data.conference.theme)) {
      InterAction.fnAlert('抱歉', '请输入会议主题', '好的');
    } else if (app.isNull(that.data.conference.dateTime)) {
      InterAction.fnAlert('抱歉', '请选择会议时间', '好的');
    } else if (app.isNull(that.data.conference.address)) {
      InterAction.fnAlert('抱歉', '请输入会议地点', '好的');
    } else if (app.isNull(that.data.conference.agenda)) {
      InterAction.fnAlert('抱歉', '请输入会议议题', '好的');
    } else if (app.isNull(that.data.conference.info)) {
      InterAction.fnAlert('抱歉', '请输入会议内容', '好的');
    } else {
      // 发送钉
      dd.createDing({
        users: confereeArr, //默认选中用户工号列表；类型: Array<String>
        corpId: app.globalData.corpId, // 类型: String
        alertType: 0, // 钉发送方式 0:电话, 1:短信, 2：应用内；类型 Number
        alertDate: {"format": "yyyy-MM-dd HH:mm", "value": "2019-08-29 08:25"}, // 非必选，定时发送时间, 非定时DING不需要填写
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
          deadlineTime: {"format": "yyyy-MM-dd HH:mm", "value": "2015-05-09 08:00"}, // 任务截止时间
          taskRemind: 30 // 任务提醒时间, 单位分钟；支持参数: 0：不提醒；15：提前15分钟；60：提前1个小时；180：提前3个小时；1440：提前一天；类型: Number
        },

        // 日程信息
        // bizType=2的时候选填
        confInfo: {
          bizSubType: 0,  // 子业务类型如会议: 0:预约会议, 1:预约电话会议, 2:预约视频会议；类型: Number (注: 目前只有会议才有子业务类型)；
          location: '某某会议室', // 会议地点(非必选)，类型: String
          startTime: {"format": "yyyy-MM-dd HH:mm", "value": "2015-05-09 08:00"},// 会议开始时间
          endTime: {"format": "yyyy-MM-dd HH:mm", "value": "2015-05-09 08:00"},// 会议结束时间
          remindMinutes: 30, // 会前提醒。单位分钟；1:不提醒, 0:事件发生时提醒, 5:提前5分钟, 15:提前15分钟, 30:提前30分钟, 60:提前1个小时, 1440:提前一天
          remindType: 2 // 会议提前提醒方式；0:电话, 1:短信, 2:应用内；类型: Number
        },

        success: function (res) {
          /*
          {
           "dingId": "1_1_a09f167xxx",
           "text": "钉正文内容",
           "result": true
          }
          */
          console.log(res);
        },
        fail: function (err) {
        }
      })
    }
  },

  formReset() {
    console.log('form发生了reset事件');
  },

  changeDate(e) {
    this.setData({date: e.detail.value});
  },
  changeTime(e) {
    this.setData({time: e.detail.value});
  },
  changeDateTime(e) {
    this.setData({dateTime: e.detail.value});
  },
  changeDateTime1(e) {
    this.setData({dateTime1: e.detail.value});
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
    const {index} = e.currentTarget.dataset;
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

  onChange(e) {
    console.log(e);
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
    let that = this;

    // 选择会议室
    let meetingRoom = [];
    dd.showLoading({content: '获取会议室中...'})
    const meetingRoomList = await MeetingRoom.getMeetingRoom();
    if (meetingRoomList.code === 1) {
      dd.hideLoading();
      that.setData({
        meetingRoom: meetingRoomList.data,
        meetingRoomShow: true
      })
    } else {
      InterAction.fnShowToast('fail', '获取会议室失败！', '2000');
    }
  },

  meetingRoom(e) {
    console.log('e');
    console.log(e);
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
      success: async function (res) {
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
      fail: function (err) {
      }
    });
  },

  switchChange(e) {
    console.log('switchChange 事件，值:', e.detail.value);
    this.setData({
      isOpen: e.detail.value
    })
  },

  test() {
    let that = this;
    that.getAgendaArray();
    console.log("9999999");
    app.getUrl('agendaArray');
    console.log("9999999");
  }
});

