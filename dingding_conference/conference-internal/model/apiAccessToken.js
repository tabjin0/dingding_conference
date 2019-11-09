/**
 * 接口accessToken模型
 */

import {Http} from "../utils/http";
import * as md5 from "../utils/MD5";
import {Storage} from "../utils/storage";

class ApiAccessToken {
    static appId = '20689176';
    static appSerect = 'OtaOZKxBWiYikCoDPhKdfSAzCsLsxHgo';

    /**
     * 获取accessToken
     * @param deviceId 设备id
     * @param signature 签名
     * @returns {Promise<*>}
     */
    static async getAccessToken(deviceId, signature) {
        return await Http.request2({
            url: `5c1b4228a7cd8`,
            data: {
                app_id: ApiAccessToken.appId,
                app_secret: ApiAccessToken.appSerect,
                // device_id: `18a83a3fbf135055e4a4a3deae3433d2`,
                device_id: deviceId,
                signature: signature

            }
        })
    }

    /**
     * 初始化accessToken
     * @returns {Promise<*>}
     */
    static async initAccessToken() {
        let dev_id = Storage.getStorageSyncByKey('dev_id') ? Storage.getStorageSyncByKey('dev_id') : Math.random().toString(36).substr(2);
        Storage.setStorageSyncByKeyAndValue('dev_id', dev_id);
        let sign = md5.hexMD5('app_id=' + ApiAccessToken.appId + '&app_secret=' + ApiAccessToken.appSerect + '&device_id=' + dev_id)

        let time = Date.parse(new Date()) / 1000;

        if (Storage.getStorageSyncByKey('AccessTokenTime') > time && Storage.getStorageSyncByKey('AccessToken')) {
            const res = Storage.getStorageSyncByKey('AccessToken');
            return res.access_token;
        } else {
            // 超时或没有accessToken，获取accesstoken
            const res = await ApiAccessToken.getAccessToken(dev_id, sign);
            if (res.code === 1) {
                Storage.setStorageSyncByKeyAndValue('AccessToken', res.data.access_token);
                Storage.setStorageSyncByKeyAndValue('AccessTokenTime', Date.parse(new Date()) / 1000 + res.data.expires_in - 600);
                return res.data.access_token;
            } else {
                dd.showToast({
                    title: '连接服务器失败',
                    icon: 'loading',
                    duration: 2000
                })
            }
        }
    }

}

export {
    ApiAccessToken
}

//
// checkAccessToken = (cb) => {
//     let dev_id = dd.getStorageSync('dev_id') ? dd.getStorageSync('dev_id') : Math.random().toString(36).substr(2);
//     dd.setStorageSync('dev_id', dev_id)
//
//     let time = Date.parse(new Date()) / 1000;
//
//     if (dd.getStorageSync('AccessTokenTime') > time && dd.getStorageSync('AccessToken')) {
//         typeof cb == "function" && cb(dd.getStorageSync('AccessToken'))
//     } else {
//         let sign = md5.hexMD5('app_id=' + app_id + '&app_secret=' + app_secret + '&device_id=' + dev_id)
//         dd.httpRequest({
//             url: getAccessTokenUrl,
//             method: 'post',
//             data: {
//                 app_id: app_id,
//                 app_secret: app_secret,
//                 device_id: dev_id,
//                 signature: sign
//             },
//             header: {
//                 'Content-Type': 'application/json',
//                 'version': 'v3.0'
//             },
//             success: (res) => {
//                 if (res.data.code == 1) {
//                     dd.setStorageSync('AccessToken', res.data.data.access_token)
//                     dd.setStorageSync('AccessTokenTime', Date.parse(new Date()) / 1000 + res.data.data.expires_in - 600)
//                 } else {
//                     let msg = res.data.msg;
//                     if (res.statusCode != 200) msg = '网络异常，请稍后！';
//                     dd.showToast({
//                         title: msg,
//                         icon: 'none',
//                         duration: 2000
//                     })
//                 }
//                 typeof cb == "function" && cb(dd.getStorageSync('AccessToken'))
//             },
//             fail: (res) => {
//                 dd.showToast({
//                     title: '连接服务器失败',
//                     icon: 'loading',
//                     duration: 2000
//                 })
//             }
//         })
//     }
// }

