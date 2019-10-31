import {Http} from '../utils/http';
import {Storage} from '../utils/storage';
import {FreeLogin} from "./FreeLogin";

// import { config } from '../config/config';

class User {

    static async getAdministratorFromOnline() {
        return await Http.request({
            url: `5d8c8ad130eb2`,
        })
    }

    static async setAdministratorIntoStorage(admin) {
        return await Storage.setStorage({
            key: `administrator`,
            data: {
                administrator: admin
            }

        });
    }

    static async getAdministratorFromStorage() {
        return await Storage.getStorage({
            key: `administrator`,
        })
    }

    static async setUserIntoStorage(data) {
        return await Storage.setStorage({
            key: `user`,
            data,
        });
    }

    static async getUserFromStorage() {
        return await Storage.getStorage({
            key: `user`,
        })
    }

    /**
     * 异步保存管理员之缓存
     * @param data
     * @returns {Promise<*|void>}
     */
    static async setIsAdmin(data) {
        return await Storage.setStorage({
            key: `isAdmin`,
            data
        });
    }

    static async getIdAdmin() {
        return await Storage.getStorage({
            key: `isAdmin`,
        })
    }

    /**
     * 获取当前用户
     * @param authCode 免登授权码
     * @param corpId 组织id
     * @returns {Promise<*>}
     */
    static async getCurrentUser(authCode, corpId) {
        const currentUserRes = await Http.request({
            url: '5d9ffdf120fb5',
            data: {
                code: authCode,
                // corpId: corpId,
                orgId: 1,
            }
        });
        if (currentUserRes.code === 1) {
            return currentUserRes.data;
        } else {
            dd.alert({content: '用户登录失败'});
        }
    }
}

export {
    User
}