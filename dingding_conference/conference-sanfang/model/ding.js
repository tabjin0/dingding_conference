/**
 * 发钉模型
 */

import {InterAction} from "./interaction";

class Ding {
    static createNoticeDing(
        {
            users,//默认选中用户工号列表；类型: Array<String>
            corpId,
            alertType = 0,// 钉发送方式 0:电话, 1:短信, 2：应用内；类型 Number
            alertDate = {"format": "yyyy-MM-dd HH:mm", "value": "2019-08-29 08:25"}, // 非必选，定时发送时间, 非定时DING不需要填写
            type = 1,// 附件类型 1：image, 2：link；类型: Number
            attachment = {
                images: ["https://www.baidu.com/img/bd_logo1.png?where=super", "https://www.baidu.com/img/bd_logo1.png?where=super", "https://www.baidu.com/img/bd_logo1.png?where=super"], // 图片附件, type=1时, 必选；类型: Array<String>
                image: "https://www.baidu.com/img/bd_logo1.png?where=super", // 链接附件, type=2时, 必选；类型: String
                title: text, // 链接附件, type=2时, 必选；类型: String
                url: "https://www.baidu.com/img/bd_logo1.png?where=super", // 链接附件, type=2时, 必选；类型 String
                text: "测试发钉成功" // 链接附件, type=2时, 必选；类型: String
            },// 附件信息
            text,
            bizType = 0,// 业务类型 0：通知DING；1：任务；2：会议
            taskInfo = {// 任务信息,bizType=1的时候选填
                ccUsers: ['100', '101'],// 抄送用户列表, 工号，类型: Array<String>
                deadlineTime: {"format": "yyyy-MM-dd HH:mm", "value": "2015-05-09 08:00"}, // 任务截止时间
                taskRemind: 30 // 任务提醒时间, 单位分钟；支持参数: 0：不提醒；15：提前15分钟；60：提前1个小时；180：提前3个小时；1440：提前一天；类型: Number
            },
            confInfo = {// 日程信息,bizType=2的时候选填
                bizSubType: 0,  // 子业务类型如会议: 0:预约会议, 1:预约电话会议, 2:预约视频会议；类型: Number (注: 目前只有会议才有子业务类型)；
                location: '某某会议室', // 会议地点(非必选)，类型: String
                startTime: {"format": "yyyy-MM-dd HH:mm", "value": "2015-05-09 08:00"},// 会议开始时间
                endTime: {"format": "yyyy-MM-dd HH:mm", "value": "2015-05-09 08:00"},// 会议结束时间
                remindMinutes: 30, // 会前提醒。单位分钟；1:不提醒, 0:事件发生时提醒, 5:提前5分钟, 15:提前15分钟, 30:提前30分钟, 60:提前1个小时, 1440:提前一天
                remindType: 2 // 会议提前提醒方式；0:电话, 1:短信, 2:应用内；类型: Number
            },

        }
    ) {
        dd.createDing({
            users: users, //默认选中用户工号列表；类型: Array<String>
            corpId: corpId, // 类型: String
            alertType: alertType, // 钉发送方式 0:电话, 1:短信, 2：应用内；类型 Number
            alertDate: alertDate,// 非必选，定时发送时间, 非定时DING不需要填写
            type: type,// 附件类型 1：image, 2：link；类型: Number

            // 非必选
            // 附件信息
            // attachment: attachment,

            text: text,  // 正文
            bizType: bizType, // 业务类型 0：通知DING；1：任务；2：会议；

            // 任务信息
            // bizType=1的时候选填
            taskInfo: taskInfo,

            // 日程信息
            // bizType=2的时候选填
            confInfo: confInfo,

            success: function (res) {
                console.log(res);
            },
            fail: function (err) {
                InterAction.fnAlert('抱歉', '发钉失败', '好的');
            }
        })
    }
}

export {
    Ding
}