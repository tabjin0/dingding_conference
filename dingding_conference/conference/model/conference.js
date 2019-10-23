import {Http} from '../utils/http';

class Conference {

    /**
     * 新增会议
     * @returns {Promise<*>}
     */
    static async addConference() {
        return await Http.request({
            url: `5d8b1812a0cda`,
            data: null
        });
    }

    /**
     * 获取会议列表
     * @param uid
     * @returns {Promise<*>}
     */
    static async getConferenceList(uid) {
        return await Http.request({
            url: '5d8b1a1a7820d',
            data: {
                uid: uid
            }
        });
    }

    /**
     * 获取会议详情
     * @param mid
     * @param uid
     * @returns {Promise<*>}
     */
    static async getConferenceDetail(mid, uid) {
        const currentConference = await Http.request({
            url: `5d8d73e29c22c`,
            data: {
                mid: mid,
                uid: uid
            }
        });
        return currentConference.data;
    }
}

export {
    Conference
}