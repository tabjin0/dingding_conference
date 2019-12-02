import {User} from "./authentication/users";
import {Storage} from "../utils/storage";

/**
 * 用户免登模块
 */

class FreeLogin {
    /**
     * 用户登录并进入缓存
     * @param authCode
     * @param corpId
     * @returns {Promise<void>}
     */
    static async freeLogin(authCode, corpId) {
        const currentUser = await User.getCurrentUser(authCode, corpId); // 网络获取钉钉返回的当前用户信息 ok

        // 总管理员
        Storage.setStorageSyncByKeyAndValue('isAdmin', currentUser.isAdmin);

        // 部门
        let department = currentUser.department[0];
        let isLeaderInDeptsStr = currentUser.isLeaderInDepts.replace(/(\d+):/g, "\"$1\":");
        let isLeaderInDepts = JSON.parse(isLeaderInDeptsStr);
        Storage.setStorageSyncByKeyAndValue('currentUser', currentUser);
        Storage.setStorageSyncByKeyAndValue('isLeaderInDepts', isLeaderInDepts[department]);
        Storage.setStorageSyncByKeyAndValue('user', currentUser.userid);// ok
        if (isLeaderInDepts[department]) {
            // 部门主管
            Storage.setStorageSyncByKeyAndValue('administrator', currentUser.userid);// ok
        } else {
            // 非部门主管
        }
        return {
            currentUser: currentUser,
            isLeaderInDepts: isLeaderInDepts
        };
    }
}

export {
    FreeLogin
}