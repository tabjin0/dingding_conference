/**
 * 用户免登模块
 */
import {User} from "../../model/user/users";
import {Caching} from "../../utils/native-api/caching/caching";
import {System} from "./system";

class FreeLogin {

    /**
     * 获取当前用户
     */
    static async currentUser() {
        const authCode = await System.loginSystem();// 获取钉钉免登授权码
        return await this._initCurrentUser(authCode);
    }

    /**
     * 用户登录并进入缓存
     * @param authCode 钉钉给的授权码
     * @param corpId 钉钉给的组织id
     * @returns {Promise<{isLeaderInDepts: any, basicCurrentUserInfo: *}>}
     */
    static async _initCurrentUser(authCode) {
        const currentUser = await User.getCurrentUser(authCode); // 网络获取钉钉返回的当前用户信息 ok
        // console.log(`currentUser`, currentUser);
        let department = currentUser.department[0];
        let isLeaderInDeptsStr = currentUser.isLeaderInDepts.replace(/(\d+):/g, "\"$1\":");
        let isLeaderInDepts = JSON.parse(isLeaderInDeptsStr);

        // 设置缓存
        await Caching.setStorageSync('currentUser', {
            basicCurrentUserInfo: currentUser,
            isLeaderInDepts: isLeaderInDepts
        });
        await Caching.setStorageSync('department', currentUser.department[0])
        await Caching.setStorageSync('isLeaderInDepts', isLeaderInDepts[department]);
        await Caching.setStorageSync('user', currentUser.userid);// ok
        await Caching.setStorageSync('orgId', currentUser.orgId);
        await Caching.setStorageSync('orgName', currentUser.orgName);
        if (isLeaderInDepts[department]) {
            // 部门主管
            await Caching.setStorageSync('administrator', currentUser.userid);// ok
        } else {
            // 非部门主管
        }
        return {
            basicCurrentUserInfo: currentUser,
            isLeaderInDepts: isLeaderInDepts
        };

    }
}

export {
    FreeLogin
}
