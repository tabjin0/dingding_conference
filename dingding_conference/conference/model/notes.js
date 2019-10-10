import { Http } from "../utils/http";

class Notes {
    static async submitNotes(mid, uid, text, img) {// 接收一个回调
        return await Http.request({
            url: '5d8ed78cae8b4',
            data: {
                mid: mid,
                uid: uid,
                text: text,
                img: img
            },
        });
    }
}

export {
    Notes
}