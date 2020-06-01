/**
 * 笔记模型
 */


import {Http} from "../../utils/http";
import {InterAction} from "../../utils/native-api/interface/interaction";
import {InteractionEnum} from "../../utils/native-api/interface/InteractionEnum";
import {ApiUrlConstant} from "../../config/ApiUrlConstant";

class Notes {
    /**
     * 提交会议笔记
     * @param noteInfo
     * @returns {Promise<*>}
     */
    static async submitNotes(noteInfo) {// 接收一个回调
        const res = await Http.request({
            url: '5d8ed78cae8b4',
            data: {
                mid: noteInfo.mid,
                // uid: noteInfo.uid,
                userid: noteInfo.userid,
                text: noteInfo.text,
                imgs: noteInfo.img,
                orgId: noteInfo.orgId
            },
        });

        if (res.code === 1) {
            return res.data;
        } else {
            InterAction.fnShowToast('新增会议笔记失败', InteractionEnum.DD_SHOW_TOAST_TYPE_EXCEPTION, InteractionEnum.DD_SHOW_TOAST_DURATION)
        }
    }

    /**
     * 获取当前会议的用户笔记列表
     * @param mid
     * @param userId
     * @param page
     * @param num
     * @returns {Promise<*>}
     */
    static async getUserNoteList(mid, userId, page = 1, num = 20) {
        const res = await Http.request({
            url: `${ApiUrlConstant.GET_USER_NOTE_LIST}`,
            data: {
                mid: mid,
                userid: userId,
                page: page,
                num: num
            }
        });
        if (res.code === 1) {
            return res.data;
        } else {
            InterAction.fnAlert(`${res.msg}`, InteractionEnum.DD_SHOW_TOAST_TYPE_EXCEPTION, InteractionEnum.DD_SHOW_TOAST_DURATIONer);
        }
    }
}

export {
    Notes
}
