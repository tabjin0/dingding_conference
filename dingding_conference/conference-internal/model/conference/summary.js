/**
 * 会议纪要模型
 */


import {Http} from "../../utils/http";
import {InterAction} from "../../utils/native-api/interface/interaction";
import {InteractionEnum} from "../../utils/native-api/interface/InteractionEnum";

class Summary {
    static async submitSummary(summaryInfo) {
        const res = await Http.request({
            url: '5d8ed0b962c65',
            data: {
                mid: summaryInfo.mid,
                summary: summaryInfo.summary,
                imgs: summaryInfo.imgs
            }
        });
        if (res.code === 1) {
            return res.data;
        } else {
            InterAction.fnShowToast('新增纪要失败', InteractionEnum.DD_SHOW_TOAST_TYPE_SUCCESS, InteractionEnum.DD_SHOW_TOAST_DURATION);
        }
    }

    static async submitImgs(mid, imgs) {
        return await Http.request({
            url: '5d8ed0b962c65',
            data: {
                mid: mid,
                imgs: imgs
            }
        })
    }
}

export {
    Summary
}