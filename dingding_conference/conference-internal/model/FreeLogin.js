import {User} from "./users";
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
        dd.showLoading({content: '加载中...'});
        // {authCode: "46f4d5f8748b3c31a1b5ae2ebc5e2775"}
        const currentUser = await User.getCurrentUser(authCode, corpId); // 网络获取钉钉返回的当前用户信息 ok
        // {deviceId: "18a83a3fbf135055e4a4a3deae3433d2", errcode: 0, errmsg: "ok", is_sys: true, name: "张进", sys_level : 1, userid : "1219441916791739"}
        Storage.setStorageSyncByKeyAndValue('isAdmin', currentUser.isAdmin);
        if (currentUser.is_sys) {
            // 管理员
            Storage.setStorageSyncByKeyAndValue('administrator', currentUser.userid);// ok
            Storage.setStorageSyncByKeyAndValue('user', currentUser.userid);// ok
            dd.hideLoading();
        } else {
            // 非管理员
            Storage.setStorageSyncByKeyAndValue('user', currentUser.userid);// ok
            dd.hideLoading();
        }
        console.log('currentUser')
        console.log(currentUser)
        console.log('currentUser')
        return currentUser;
    }
}

export {
    FreeLogin
}