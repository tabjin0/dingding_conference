import { config } from "../config/config";
import { promisic } from "../utils/utils";

class Auth {
    static async authCode() {
        const res = await promisic(dd.getAuthCode)();
        return res;
    }

}

export {
    Auth
}