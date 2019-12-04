/**
 * 会议室模型
 */

import { Http } from "../../utils/http";

class MeetingRoom {
    /**
     * 新增、修改会议室
     * @param name 会议室名称
     * @param location 经纬度字符串
     * @returns {Promise<*>}
     */
    static async addOrUpdateMeetingRoom(name, location, orgId) {
        return await Http.request({
            url: `5db14749b1854`,
            data: {
                name: name,
                location: location,
                orgId: orgId,
                // id:
            }
        });
    }

    /**
     * 会议室删除
     * @param roomId 会议室id
     * @returns {Promise<*>}
     */
    static async deleteMeetingRoom(roomId, orgId) {
        return await Http.request({
            url: `5db147f53eb0f`,
            data: {
                orgId: orgId,
                roomId: roomId
            }
        })
    }

    /**
     * 获取会议室列表
     * @returns {Promise<*>}
     */
    static async getMeetingRoom(orgId) {
        return await Http.request({
            url: `5d8b19b1744c7`,
            data: {
                orgId: orgId
            }
        });
    }
}

export {
    MeetingRoom
}