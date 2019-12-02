import {Common} from "../../utils/tabjin-utils/common";
import {InterAction} from "../../utils/native-api/interface/interaction";
import {InteractionEnum} from "../../utils/native-api/interface/InteractionEnum";

/**
 * dingding_conference  SummaryInfo
 * Created by Tabjin
 * date 2019-12-02
 * time 22-04
 */

class SummaryInfo {
    mid;
    summary;
    imgs;

    constructor(mid,summary,imgs){
        this.mid = mid;
        this.summary = summary;
        this.imgs = imgs;
    }

    dateCheck() {
        if (Common.isNull(this.mid)) {
            InterAction.fnShowToast('未获取到当前会议，请重新进入该页面', InteractionEnum.DD_SHOW_TOAST_TYPE_EXCEPTION, InteractionEnum.DD_SHOW_TOAST_DURATION);
            return false;
        }
        if (Common.isNull(this.summary)) {
            InterAction.fnShowToast('请输入纪要内容', InteractionEnum.DD_SHOW_TOAST_TYPE_EXCEPTION, InteractionEnum.DD_SHOW_TOAST_DURATION);
            return false;
        }
        if (Common.isNull(this.imgs)) {
            InterAction.fnShowToast('请选择图片', InteractionEnum.DD_SHOW_TOAST_TYPE_EXCEPTION, InteractionEnum.DD_SHOW_TOAST_DURATION);
            return false;
        }
        return true;
    }
}

export {
    SummaryInfo
}