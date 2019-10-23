/**
 * 统计模型
 */

import {Http} from "../utils/http";

class Statistic {
    static async conferenceStatistic(uid) {
        const statistic = await Http.request({
            url: `5daa7c699f203`,
            data: {
                uid: uid,
                orgId: 1
            }
        });
        return statistic.data;
    }
}

export {
    Statistic
}