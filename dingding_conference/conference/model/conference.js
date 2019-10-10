import { Http } from '../utils/http';

class Conference {
    static async getConferenceList(uid) {
        return await Http.request({
            url: '5d8b1a1a7820d',
            data: {
                uid: uid
            }
        })
    }
}

export {
    Conference
}