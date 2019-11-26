/**
 * 党支部业务模型
 */
import {Storage} from "../../utils/storage";
import {Http} from "../../utils/http";

class PartyBranch {
    // TODO
    // 1.   用户 -> 党支部 -> 缓存
    // 2.   缓存 -> 检查党支部
    // 3.   缓存 -> 当前党支部人员初始化

    setStorage(partyBranch) {
        Storage.setStorageSyncByKeyAndValue('party_branch', partyBranch);
    }

    getStorage() {
        return Storage.getStorageSyncByKey('party_branch');
    }

    /**
     * 判断缓存中是否有党支部
     * @returns {boolean}
     * @private
     */
    _isInStorage() {
        if (!this.getStorage()) {
            return false;
        }
        return true;
    }

    /**
     * 获取党员基本信息
     * @param corpId 组织id
     * @returns {Promise<*>}
     */
    static async getPartyMemberInfo(corpId) {
        const partyMemberInfo = await Http.request({
            url: `5da9611d462d8`,
            data: {
                orgId: corpId,
                // userid: userid
            }
        });
        return partyMemberInfo.data;
    }

}

export {
    PartyBranch
}