/**
 * dingding_conference  NoteInfo
 * Created by Tabjin
 * date 2019-12-02
 * time 20-50
 */

import {Common} from "../../utils/tabjin-utils/common";
import {InterAction} from "../../utils/native-api/interface/interaction";
import {InteractionEnum} from "../../utils/native-api/interface/InteractionEnum";

class NoteInfo {
    mid;
    uid;
    text;
    img;

    constructor(mid, uid, text, img) {
        this.mid = mid;
        this.uid = uid;
        this.text = text;
        this.img = img;
    }

    dateCheck() {
        if (Common.isNull(this.mid)) {
            InterAction.fnShowToast('未获取到当前会议，请重新进入该页面', InteractionEnum.DD_SHOW_TOAST_TYPE_EXCEPTION, InteractionEnum.DD_SHOW_TOAST_DURATION);
            return false;
        }
        if (Common.isNull(this.uid)) {
            InterAction.fnShowToast('未获取到当前用户，请退出并重新打开', InteractionEnum.DD_SHOW_TOAST_TYPE_EXCEPTION, InteractionEnum.DD_SHOW_TOAST_DURATION);
            return false;
        }
        if (Common.isNull(this.text)) {
            InterAction.fnShowToast('请输入笔记内容', InteractionEnum.DD_SHOW_TOAST_TYPE_EXCEPTION, InteractionEnum.DD_SHOW_TOAST_DURATION);
            return false;
        }
        if (Common.isNull(this.img)) {
            InterAction.fnShowToast('请选择图片', InteractionEnum.DD_SHOW_TOAST_TYPE_EXCEPTION, InteractionEnum.DD_SHOW_TOAST_DURATION);
            return false;
        }
        return true;
    }
}

export {
    NoteInfo
}