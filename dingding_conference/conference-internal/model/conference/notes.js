/**
 * 笔记模型
 */


import { Http } from "../../utils/http";
import { InterAction } from "../../utils/native-api/interface/interaction";
import { InteractionEnum } from "../../utils/native-api/interface/InteractionEnum";

class Notes {
    static async submitNotes(noteInfo) {// 接收一个回调
        const res = await Http.request({
            url: '5d8ed78cae8b4',
            data: {
                mid: noteInfo.mid,
                uid: noteInfo.uid,
                text: noteInfo.text,
                img: noteInfo.img
            },
        });
        if (res.code === 1) {
            return res.data;
        } else {
            InterAction.fnShowToast('新增会议笔记失败', InteractionEnum.DD_SHOW_TOAST_TYPE_EXCEPTION, InteractionEnum.DD_SHOW_TOAST_DURATION)
        }
    }
}

export {
    Notes
}