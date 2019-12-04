/**
 * 党员模型
 */
import { Http } from "../../utils/http";

class PartyMember {
    /**
     * 获取党员基本信息
     * @param corpId 组织id
     * @returns {Promise<*>}
     */
    static async getPartyMemberInfo(orgId) {
        const partyMemberInfo = await Http.request({
            url: `5da9611d462d8`,
            data: {
                orgId
                // userid: userid
            }
        });
        return partyMemberInfo.data;
    }
}

export {
    PartyMember
}