import {Http} from "../../utils/http";

class PartyMemberDues {
    /**
     * 党费
     * @param uid {string} 用户userid
     * @param date {string} 日期：2019-01
     * @param money {number} 实际缴费金额
     * @param base {number} 月交纳党费基数
     * @param payable {number} 月应交党费金额
     * @returns {Promise<*>}
     */
    static async getDuesInfo(uid, date, money, base, payable) {
        const res = await Http.request({
            url: `5e5ccf13f0670`,
            data: {
                userid: uid,
                date: date,
                money: money,
                base: base,
                payable: payable
            }
        });
        if (res.code == 1) {
            return res.data;
        }
    }
}

export {
    PartyMemberDues
}
