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

    static async setAdministratorIntoStorage(data) {
        return await Storage.setStorage({
            key: `administrator`,
            data,
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
        return await Http.request({
            url: '5d9ffdf120fb5',
            data: {
                code: authCode,
                orgId: corpId
            }
        })
    }

    static async currentUser() {
        const userFromStorage = await User.getUserFromStorage();
        if (app.isNull(userFromStorage) || app.isNull(userFromStorage.user)) {
            // 如果缓存中没有用户,则从网络获取当前用户
            const currentUser = await FreeLogin.login(authCode.authCode, app.globalData.corpId); // 网络获取钉钉返回的用户信息 ok
            console.log('user');
            console.log(user);
            console.log('user');
            dd.hideLoading();
            let userId = user.data.userid;
            /** 将当前用户放入缓存 */
            let userData = {};
            userData.user = userId;
            const userIntoStorage = await User.setUserIntoStorage(userData);
            dd.hideLoading();
            /** 将当前用户放入缓存 */
            that.setData({
                userId: userId,
                'checkInInfo.uid': userId,
                userName: user.data.name,
            });
        } else {
            that.setData({
                userId: userFromStorage.user
            });
        }
    }

    /**
     * 管理员相关
     * @returns {Promise<void>}
     */
    static async admin() {
        // 管理员相关
        // 1.管理员；是，ok；否则重新获取管理员并加入缓存
        const adminRes = await User.getAdministratorFromStorage();// 先从缓存中获取管理员
        if (app.isNull(adminRes) || app.isNull(adminRes.administrator)) {// 缓存中没有管理员，从网络获取管理员信息
            const administrator = await User.getAdministratorFromOnline();// 从网络获取管理员
            let administratorId = administrator.data[0].userid;
            let data = {};
            data.administrator = administratorId;
            that.setData({
                administrator: administratorId
            });
            const setStorageRes = await User.setAdministratorIntoStorage(data);// 将管理员放入缓存
            dd.hideLoading();
        } else {// 缓存中有管理员，与当前人员比对
            that.setData({
                administrator: adminRes.administrator
            });
            // 当前人员与管理员进行比对
            if (that.data.administrator != that.data.userId) {// 不是管理员
                that.setData({
                    isAdmin: false,// 不是管理员
                });
                // 将isAdmin写入缓存
                const isAdminIntoStorage = await User.setIsAdmin({isAdmin: false});
            } else {// 是管理员
                // dd.alert({ content: '是当前管理员' });
                that.setData({
                    isAdmin: true,// 是管理员
                });
                // 将isAdmin写入缓存
                const isAdminIntoStorage = await User.setIsAdmin({isAdmin: true});
            }
        }
    }
}

export {
    User
}