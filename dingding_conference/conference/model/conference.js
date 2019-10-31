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
        const conferenceList = await Http.request({
            url: '5d8b1a1a7820d',
            data: {
                uid: uid
            }
        });
        if (conferenceList.code === 1) {
            return conferenceList.data;
        } else {
            dd.alert({content: '会议列表加载失败'});
        }
    }

    /**
     * 获取会议详情
     * @param mid
     * @param uid
     * @returns {Promise<*>}
     */
    static async getConferenceDetail(mid, uid) {
        dd.showLoading({content: '加载会议详情中...'});
        const currentConference = await Http.request({
            url: `5d8d73e29c22c`,
            data: {
                mid: mid,
                uid: uid
            }
        });
        if (currentConference.code === 1) {
            dd.hideLoading();
            return currentConference.data
        } else {
            dd.alert({content: '获取会议详情失败！'});
        }
    }

    /**
     * 取消会议
     * @param mid 会议id
     * @returns {Promise<*>}
     */
    static async cancelConference(mid) {
        return await Http.request({
            url: `5d8ed2e38a05d`,
            data: {
                mid: mid
            }
        })
    }

    /**
     * 提取用户id
     * @param conferee 用户列表
     * @returns {Array}
     */
    static extractUserId(conferee) {
        let userIdArr = [];
        for (let i = 0; i < conferee.length; i++) {
            userIdArr.push(conferee[i].userid);
        }
        return userIdArr;
    }
}

export {
    Conference
}