import {Http} from "../../utils/http";
import {InterAction} from "../../utils/native-api/interface/interaction";
import {InteractionEnum} from "../../utils/native-api/interface/InteractionEnum";

class Conference {

    /**
     * 新增会议
     * @returns {Promise<*>}
     */
    static async addConference(addConferenceInfo) {
        const res = await Http.request({
            url: `5d8b1812a0cda`,
            data: {
                uid: addConferenceInfo.uid,
                theme: addConferenceInfo.theme,
                address: addConferenceInfo.address,
                time: addConferenceInfo.time,
                info: addConferenceInfo.info,
                conferee: addConferenceInfo.conferee,
                topic: addConferenceInfo.topic,
                roomId: addConferenceInfo.roomId,
                orgId: addConferenceInfo.orgId,
                open: addConferenceInfo.open
            }
        });
        if (res.code === 1) {
            return res.data;
        } else {
            InterAction.fnShowToast('新增失败', InteractionEnum.DD_SHOW_TOAST_TYPE_NONE, InteractionEnum.DD_SHOW_TOAST_DURATION);
        }
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
            InterAction.fnShowToast('会议列表加载失败！', 'none', 2000, false);
        }
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
        if (currentConference.code === 1) {
            return currentConference.data
        } else {
            InterAction.fnShowToast('获取会议详情失败！', 'none', 2000, false);
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