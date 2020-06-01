/**
 * 位置模型
 */
import {LocationUtils} from "../utils/location";

class GetLocation {
    static async getLocation() {
        return await LocationUtils.location();
    }
}

export {
    GetLocation
}