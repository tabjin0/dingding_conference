import { config } from "../config/config";
import { promisic } from "../utils/utils";

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
}

export {
    Storage
}