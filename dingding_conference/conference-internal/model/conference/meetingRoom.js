/**
 * 会议室模型
 */

import {Http} from "../../utils/http";

class MeetingRoom {
    /**
     * 新增、修改会议室
     * @param name 会议室名称
     * @param location 经纬度字符串
     * @returns {Promise<*>}
     */
    static async addOrUpdateMeetingRoom(name, location) {
        return await Http.request({
            url: `5db14749b1854`,
            data: {
                name: name,
                location: location,
                orgId: 1,
                // id:
            }
        });
    }

    /**
     * 会议室删除
     * @param roomId 会议室id
     * @returns {Promise<*>}
     */
    static async deleteMeetingRoom(roomId) {
        return await Http.request({
            url: `5db147f53eb0f`,
            data: {
                orgId: 1,
                roomId: roomId
            }
        })
    }

    /**
     * 获取会议室列表
     * @returns {Promise<*>}
     */
    static async getMeetingRoom() {
        return await Http.request({
            url: `5d8b19b1744c7`,
            data: {
                orgId: 1
            }
        });
    }
}

export {
    MeetingRoom
}