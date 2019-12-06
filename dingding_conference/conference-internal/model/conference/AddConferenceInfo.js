import {Common} from "../../utils/tabjin-utils/common";
import {InterAction} from "../../utils/native-api/interface/interaction";
import {InteractionEnum} from "../../utils/native-api/interface/InteractionEnum";

class AddConferenceInfo {
    uid;// 创建者的用户id
    theme;// 会议主题
    address;// 会议地点
    time;// 会议时间
    info;// 会议内容
    conferee;// 参加会议者ID，用,拼接
    topic;// 会议议题
    roomId;// 会议室ID
    orgId;// 党支部id
    open;// 是否公开，1：公开，0：不公开

    constructor(uid, theme, address, time, info, conferee, topic, roomId, orgId, open) {
        this.uid = uid;
        this.theme = theme;
        this.address = address;
        this.time = time;
        this.info = info;
        this.conferee = conferee;
        this.topic = topic;
        this.roomId = roomId;
        this.orgId = orgId;
        this.open = open;
    }

    dataCheck() {
        if (!this.uid) {
            InterAction.fnShowToast('未获取到用户，请重启小程序', InteractionEnum.DD_SHOW_TOAST_TYPE_EXCEPTION, InteractionEnum.DD_SHOW_TOAST_DURATION);
            return false;
        }
        if (!this.theme) {
            InterAction.fnShowToast('主题不能为空', InteractionEnum.DD_SHOW_TOAST_TYPE_EXCEPTION, InteractionEnum.DD_SHOW_TOAST_DURATION);
            return false;
        }
        if (!this.address) {
            InterAction.fnShowToast('地址不能为空', InteractionEnum.DD_SHOW_TOAST_TYPE_EXCEPTION, InteractionEnum.DD_SHOW_TOAST_DURATION);
            return false;
        }
        if (!this.time) {
            InterAction.fnShowToast('时间不能为空', InteractionEnum.DD_SHOW_TOAST_TYPE_EXCEPTION, InteractionEnum.DD_SHOW_TOAST_DURATION);
            return false;
        }
        if (!this.info) {
            InterAction.fnShowToast('内容不能为空', InteractionEnum.DD_SHOW_TOAST_TYPE_EXCEPTION, InteractionEnum.DD_SHOW_TOAST_DURATION);
            return false;
        }
        if (!this.conferee) {
            InterAction.fnShowToast('参加人员不能为空', InteractionEnum.DD_SHOW_TOAST_TYPE_EXCEPTION, InteractionEnum.DD_SHOW_TOAST_DURATION);
            return false;
        }
        if (!this.topic) {
            InterAction.fnShowToast('议题不能为空', InteractionEnum.DD_SHOW_TOAST_TYPE_EXCEPTION, InteractionEnum.DD_SHOW_TOAST_DURATION);
            return false;
        }
        if (!this.roomId) {
            InterAction.fnShowToast('地点不能为空', InteractionEnum.DD_SHOW_TOAST_TYPE_EXCEPTION, InteractionEnum.DD_SHOW_TOAST_DURATION);
            return false;
        }
        if (!this.orgId) {
            InterAction.fnShowToast('部门不能为空', InteractionEnum.DD_SHOW_TOAST_TYPE_EXCEPTION, InteractionEnum.DD_SHOW_TOAST_DURATION);
            return false;
        }
        if (!this.open) {
            InterAction.fnShowToast('是否公开不能为空', InteractionEnum.DD_SHOW_TOAST_TYPE_EXCEPTION, InteractionEnum.DD_SHOW_TOAST_DURATION);
            return false;
        }
        return true;
    }
}

export {
    AddConferenceInfo
}