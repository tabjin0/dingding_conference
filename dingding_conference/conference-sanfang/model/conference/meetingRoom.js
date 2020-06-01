/**
 * 会议室模型
 */

import { Http } from "../../utils/http";
import { ApiUrlConstant } from "../../config/ApiUrlConstant";
import { InterAction } from "../../utils/native-api/interface/interaction";
import { InteractionEnum } from "../../utils/native-api/interface/InteractionEnum";

class MeetingRoom {
    /**
     * 新增、修改会议室
     * @param name 会议室名称
     * @param location 经纬度字符串
     * @returns {Promise<*>}
     */
    static async addOrUpdateMeetingRoom(name, location) {
        const res = await Http.request({
            url: `5db14749b1854`,
            data: {
                name: name,
                location: location,
            }
        });
        if (res.code === 1) {
            return res.data;
        } else {
            InterAction.fnShowToast('新增会议室失败', InteractionEnum.DD_SHOW_TOAST_TYPE_EXCEPTION, InteractionEnum.DD_SHOW_TOAST_DURATION);
        }
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
                roomId: roomId
            }
        })
    }

    /**
     * 获取会议室列表
     * @returns {Promise<*>}
     */
    static async getMeetingRoom() {
        const res = await Http.request({
            url: `${ApiUrlConstant.GET_MEETING_ROOM}`,
            data: {}
        });
        // console.log('res', res);
        if (res.code === 1) {
            return res.data;
        } else {
            InterAction.fnShowToast('获取会议室失败', InteractionEnum.DD_SHOW_TOAST_TYPE_EXCEPTION, InteractionEnum.DD_SHOW_TOAST_DURATION);
        }
    }
}

export {
    MeetingRoom
}
