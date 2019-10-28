/**
 * 日程模型
 */
import {Http} from "../utils/http";

class Calendar {
    static async createCalendar(
        {}
    ) {
        return await Http.request({
            url: ``,
            data: {
                create_vo_summary
            }
        });
    }
}

export {
    Calendar
}