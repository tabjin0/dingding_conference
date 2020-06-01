import {promisic} from "./utils";

class LocationUtils {
    static async location() {
        const res = await promisic(dd.getLocation)({})
        return res;
    }
}

export {
    LocationUtils
}