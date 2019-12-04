/**
 * 用户免登模块
 */
import {User} from "./users";
import {Caching} from "../../utils/native-api/caching/caching";
import {System} from "./system";
import {Common} from "../../utils/tabjin-utils/common";

class FreeLogin {

    /**
     * 获取当前用户
     */
    static async currentUser() {
        const authCode = await System.loginSystem();// 获取钉钉免登授权码
        return await this._initCurrentUser(authCode)
    }

    /**
     * 用户登录并进入缓存
     * @param authCode 钉钉给的授权码
     * @param corpId 钉钉给的组织id
     * @returns {Promise<void>}
     */
    static async _initCurrentUser(authCode) {
        // 031554171329564922
        if (!Common.isObjectNull(Caching.getStorageSync('current'))) {
            const currentUser = await User.getCurrentUser(authCode); // 网络获取钉钉返回的当前用户信息 ok
            // 部门
            let department = currentUser.department[0];
            let isLeaderInDeptsStr = currentUser.isLeaderInDepts.replace(/(\d+):/g, "\"$1\":");
            let isLeaderInDepts = JSON.parse(isLeaderInDeptsStr);

            // 设置缓存
            Caching.setStorageSync('currentUser', currentUser);
            Caching.setStorageSync('department', currentUser.department[0])
            Caching.setStorageSync('isLeaderInDepts', isLeaderInDepts[department]);
            Caching.setStorageSync('user', currentUser.userid);// ok
            Caching.setStorageSync('orgId', currentUser.orgId);
            Caching.setStorageSync('orgName', currentUser.orgName);
            if (isLeaderInDepts[department]) {
                // 部门主管
                Caching.setStorageSync('administrator', currentUser.userid);// ok
            } else {
                // 非部门主管
            }
            return {
                basicCurrentUserInfo: currentUser,
                isLeaderInDepts: isLeaderInDepts
            };
        }

    }
}

export {
    FreeLogin
}