import {promisic} from "../utils/utils";

class Storage {
    static async setStorage(
        {
            key,
            data
        }
    ) {
        const res = await promisic(dd.setStorage)({
            key,
            data,
        });
        return res;
    }

    static async getStorage({key}) {
        const res = await promisic(dd.getStorage)({
            key,
        });
        return res.data;
    }

    static setStorageSyncByKeyAndValue(key, data) {
        dd.setStorageSync({
            key: key,
            data: data
        });
    }

    static getStorageSyncByKey(key) {
        const value = dd.getStorageSync({key: key});
        return value.data;
    }
}

export {
    Storage
}