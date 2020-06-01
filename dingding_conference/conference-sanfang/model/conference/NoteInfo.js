/**
 * dingding_conference  NoteInfo
 * Created by Tabjin
 * date 2019-12-02
 * time 20-50
 */

import {InterAction} from "../../utils/native-api/interface/interaction";
import {InteractionEnum} from "../../utils/native-api/interface/InteractionEnum";

class NoteInfo {
    mid;
    uid;
    text;
    img;

    constructor(mid, uid, text, img, orgId) {
        this.mid = mid;
        this.userid = uid;
        this.text = text;
        this.img = img;
        this.orgId = orgId;
    }

    dateCheck() {
        if (!this.mid) {
            InterAction.fnShowToast('未获取到当前会议，请重新进入该页面', InteractionEnum.DD_SHOW_TOAST_TYPE_EXCEPTION, InteractionEnum.DD_SHOW_TOAST_DURATION);
            return false;
        }
        if (!this.userid) {
            InterAction.fnShowToast('未获取到当前用户，请退出并重新打开', InteractionEnum.DD_SHOW_TOAST_TYPE_EXCEPTION, InteractionEnum.DD_SHOW_TOAST_DURATION);
            return false;
        }
        if (!this.text) {
            InterAction.fnShowToast('请输入笔记内容', InteractionEnum.DD_SHOW_TOAST_TYPE_EXCEPTION, InteractionEnum.DD_SHOW_TOAST_DURATION);
            return false;
        }
        if (!this.img) {
            InterAction.fnShowToast('请选择图片', InteractionEnum.DD_SHOW_TOAST_TYPE_EXCEPTION, InteractionEnum.DD_SHOW_TOAST_DURATION);
            return false;
        }
        return true;
    }
}

export {
    NoteInfo
}
