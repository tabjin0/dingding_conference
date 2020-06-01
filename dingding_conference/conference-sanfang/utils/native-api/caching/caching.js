import {promisic} from "../../utils";

class Caching {
    /**
     * 将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的数据。
     * @param key {string} 缓存数据的key
     * @param data {Object/string} 要缓存的数据
     * @returns {Promise<*>}
     */
    static async setStorage(key, data) {
        return await promisic(dd.setStorage)({
            key: key,
            data: data,
        });
    }

    /**
     * 同步将数据存储在本地缓存中指定的 key 中。同步数据IO操作可能会影响小程序流畅度，建议使用异步接口，或谨慎处理调用异常。
     * @param key {string} 缓存数据的key
     * @param data {Object/string} 要缓存的数据
     * @returns {Promise<*>}
     */
    static setStorageSync(key, data) {
        return dd.setStorageSync({
            key: key,
            data: data,
        });
    }

    /**
     * 获取缓存数据.
     * @param key {string} 缓存数据的key
     * @returns {Promise<*>}
     */
    static async getStorage(key) {
        const res = await promisic(dd.getStorage)({
            key: key,
        });
        return res.data;
    }

    /**
     * 同步获取缓存数据.
     * 同步数据IO操作可能会影响小程序流畅度，建议使用异步接口，或谨慎处理调用异常.
     * @param key {string} 缓存数据的key
     * @returns {Promise<*>}
     */
    static getStorageSync(key) {
        const res = dd.getStorageSync({
            key: key,
        });
        return res.data;
    }

    /**
     * 删除缓存数据
     * @param key {string} 缓存数据的key
     * @returns {Promise<*>}
     */
    static async removeStorage(key) {
        return await promisic(dd.removeStorage)({
            key: key
        });
    }

    /**
     * 删除缓存数据
     * @param key {string} 缓存数据的key
     * @returns {Promise<*>}
     */
    static async removeStorageSync(key) {
        return await promisic(dd.removeStorageSync)({
            key: key
        });
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
    Caching
}