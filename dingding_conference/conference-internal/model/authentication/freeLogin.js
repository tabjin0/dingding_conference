/**
 * 小程序登录 模块
 */
import {promisic} from "../../utils/util";
import {ApiUrlConstant} from "../../config/ApiUrlConstant";
import {Http} from "../../utils/http";
import {Storage} from "../../utils/storage";
import {InterAction} from "../interaction/interaction";

class FreeLogin {

    /**
     * 调用微信接口获取登录凭证（code）
     */
    static async _getCode() {
        const res = await promisic(wx.login)({});
        console.log(res);
        if (!res.code) {
            return;
        }
        return res.code;
    }

    /**
     * 拿到登录凭证请求登录态
     * @returns {Promise<void>}
     */
    static async login() {
        const code = await this._getCode();
        const res = await Http.request({
            url: ApiUrlConstant.login,
            data: {
                code
            }
        });
        if (res.code === 1) {
            return res.data;
        } else {
            InterAction.fnShowToast('抱歉，获取登录凭证失败', 'none', 2000);
            return null;
        }
    }

    /**
     * 保存用户openid到缓存
     * @returns {Promise<void>}
     */
    static async setStorage() {
        const openId = await this.login();
        if (openId) {
            Storage.setStorageSyncByKeyAndValue('user', openId);
        } else {
            return;
        }
    }
}

export {
    FreeLogin
}