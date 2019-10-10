import {Http} from '../utils/http';
import {Storage} from '../utils/storage';

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

    static async getCurrentUser(authCode) {
        return await Http.request2({
            url: '/login',
            data: {
                authCode: authCode
            }
        })
    }
}

export {
    User
}