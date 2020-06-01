import {config} from "../config/config";
import {promisic} from "../utils/utils";

class Auth {
    static async authCode() {
        const res = await promisic(dd.getAuthCode)();
        console.log(`authCode res`, res);
        console.log(`authCode corpId`, dd);
        return res;
    }
}

export {
    Auth
}
