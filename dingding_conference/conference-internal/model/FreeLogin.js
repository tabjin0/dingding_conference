/**
 * 用户免登模块
 */
import {User} from "./authentication/users";
import {Caching} from "../utils/native-api/caching/caching";

class FreeLogin {
    /**
     * 用户登录并进入缓存
     * @param authCode
     * @param corpId
     * @returns {Promise<void>}
     */
    static async freeLogin(authCode, corpId) {
        const currentUser = await User.getCurrentUser(authCode, corpId); // 网络获取钉钉返回的当前用户信息 ok
        console.log('currentUser', currentUser);

        // 总管理员
        Caching.setStorageSync('isAdmin', currentUser.isAdmin);

        // 部门
        let department = currentUser.department[0];
        let isLeaderInDeptsStr = currentUser.isLeaderInDepts.replace(/(\d+):/g, "\"$1\":");
        let isLeaderInDepts = JSON.parse(isLeaderInDeptsStr);

        Caching.setStorageSync('currentUser', currentUser);
        Caching.setStorageSync('department', currentUser.department[0])
        Caching.setStorageSync('isLeaderInDepts', isLeaderInDepts[department]);
        Caching.setStorageSync('user', currentUser.userid);// ok
        if (isLeaderInDepts[department]) {
            // 部门主管
            Caching.setStorageSync('administrator', currentUser.userid);// ok
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