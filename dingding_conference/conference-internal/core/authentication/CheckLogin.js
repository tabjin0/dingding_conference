import {Caching} from "../../utils/native-api/caching/caching";
import {FreeLogin} from "./FreeLogin";

/**
 * 用户校验登录
 */
const app = getApp();

class CheckLogin {
    static async fnRecheck() {
        let currentUserOnline;
        console.log('78', app.globalData.checkLogin);
        if (!app.globalData.checkLogin || !Caching.getStorageSync('currentUser')) {
            currentUserOnline = await FreeLogin.currentUser();
            app.globalData.checkLogin = true;
        }
    }
}

export {
    CheckLogin
}