/**
 * 会议纪要模型
 */

import {Http} from "../utils/http";

class Summary {
    static async submitSummary(mid, summary, imgs) {
        return await Http.request({
            url: '5d8ed0b962c65',
            data: {
                mid: mid,
                summary: summary,
                imgs: imgs
            }
        })
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