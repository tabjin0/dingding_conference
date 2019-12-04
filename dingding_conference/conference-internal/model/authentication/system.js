import {Auth} from "../../utils/auth";

class System {
    /**
     * 获取免登授权码
     * @returns {Promise<*>}
     */
    static async loginSystem() {
        const res = await Auth.authCode();
        return res.authCode;
    }
}

export {
    System
}