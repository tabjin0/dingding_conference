import {User} from "./users";
import {System} from "./system";

/**
 * 用户免登模块
 */

class FreeLogin {
    // static async login(authCode, corpId) {
    //     const currentUser = await User.getCurrentUser(authCode, corpId);// 从网络获取当前用户
    //     // console.log('user');
    //     // console.log(user);
    //     // console.log('user');
    //     return currentUser.data;
    // }

    /**
     * 用户登录并进入缓存
     * @param authCode
     * @param corpId
     * @returns {Promise<void>}
     */
    static async freeLogin(authCode, corpId) {

        // {authCode: "46f4d5f8748b3c31a1b5ae2ebc5e2775"}
        const currentUserRes = await User.getCurrentUser(authCode, corpId); // 网络获取钉钉返回的当前用户信息 ok
        const currentUser = currentUserRes.data;
        // {deviceId: "18a83a3fbf135055e4a4a3deae3433d2", errcode: 0, errmsg: "ok", is_sys: true, name: "张进", sys_level : 1, userid : "1219441916791739"}
        let isAdmin = currentUser.is_sys;
        let isAdministrator = {};
        isAdministrator.isAdministrator = isAdmin;
        const userIntoStorage = await User.setIsAdmin(isAdministrator);
        if (isAdmin) {
            // 管理员
            // dd.alert({title: '管理员'});
            let administrator = {};
            administrator.administrator = currentUser.userid;
            const adminIntoStorage = await User.setAdministratorIntoStorage(administrator);// ok
            let user = {};
            user.user = currentUser.userid;
            const userIntoStorage = await User.setUserIntoStorage(user);
        } else {
            // 非管理员
            // dd.alert({title: '普通用户'});
            let user = {};
            user.user = currentUser.userid;
            const userIntoStorage = await User.setUserIntoStorage(user);
        }
        return currentUser;
    }
}

export {
    FreeLogin
}