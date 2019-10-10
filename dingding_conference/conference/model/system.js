import { Auth } from '../utils/auth';

class System {
    static async loginSystem() {
        return await Auth.authCode();
    }
}

export {
    System
}