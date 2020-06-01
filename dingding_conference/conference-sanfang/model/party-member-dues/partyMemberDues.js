import {Http} from "../../utils/http";

class PartyMemberDues {
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
