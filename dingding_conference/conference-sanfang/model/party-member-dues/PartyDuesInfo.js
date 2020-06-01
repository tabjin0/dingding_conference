import {InterAction} from "../../utils/native-api/interface/interaction";
import {InteractionEnum} from "../../utils/native-api/interface/InteractionEnum";

/**
 * dingding_conference  PartyDuesInfo
 * Created by Tabjin 2020-04-21-12-25
 */
class PartyDuesInfo {
    userId;
    date;
    money;
    base;
    payable;

    /**
     *
     * @param userId {string} 用户userID
     * @param date {string} 日期
     * @param money {number} 实际缴费金额
     * @param base {number} 月交纳党费基数
     * @param payable {number} 月应交党费金额
     */
    constructor(userId, date, money, base, payable) {
        this.userId = userId;
        this.date = date;
        this.money = money;
        this.base = base;
        this.payable = payable;
    }

    dateCheck() {
        if (!this.userId) {
            InterAction.fnShowToast('未获取到当前用户，请重新进入该页面', InteractionEnum.DD_SHOW_TOAST_TYPE_EXCEPTION, InteractionEnum.DD_SHOW_TOAST_DURATION);
            return false;
        }
    }
}

export {
    PartyDuesInfo
}
