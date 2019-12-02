import {promisic} from "../../utils";


class LocationUtils {
    /**
     * 获取用户当前的地理位置信息
     * @param cacheTimeout {Number} 钉钉客户端经纬度定位缓存过期时间，单位秒。默认 30s。使用缓存会加快定位速度，缓存过期会重新定位。
     * @param type {Number} 0：获取经纬度； 1：默认，获取经纬度和详细到区县级别的逆地理编码数据
     * @returns {Promise<*>}
     */
    // static async fnGetLocation(cacheTimeout, type) {
    static async fnGetLocation(cacheTimeout, type) {
        return await promisic(dd.getLocation)({
            // cacheTimeout: cacheTimeout,
            // type: type
        });
    }

    /**
     *
     * @param longitude {String} 经度
     * @param latitude {String} 纬度
     * @param address {String} 地址的详细说明
     * @returns {Promise<*>}
     */
    static async fnOpenLocation(longitude, latitude, address) {
        return await promisic(dd.openLocation)({
            longitude,
            latitude,
            address
        })
    }
}

export {
    LocationUtils
}