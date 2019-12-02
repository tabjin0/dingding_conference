import {InterAction} from "../../../utils/native-api/interface/interaction";
import {Notes} from "../../../model/conference/notes";
import {Navigate} from "../../../utils/native-api/interface/navigate";
import {Caching} from "../../../utils/native-api/caching/caching";
import {NoteInfo} from "../../../model/conference/NoteInfo";
import {InteractionEnum} from "../../../utils/native-api/interface/InteractionEnum";

Page({
    data: {
        conference: null,
        currentUserId: null,
    },
    async onLoad(params) {
        console.log('params', params);
        this.setData({
            mid: params.mid
        });
    },

    async formSubmit(e) {
        const mid = this.data.mid;
        const uid = Caching.getStorageSyncByKey('user');
        const text = e.detail.value.text;
        const img = 'https://www.baidu.com/img/bd_logo1.png?qua=high&where=super';

        const noteInfo = new NoteInfo(mid, uid, text, img);
        if (noteInfo.dateCheck()) {
            const addNoteRes = await Notes.submitNotes(noteInfo);
            InterAction.fnShowToast('提交成功', InteractionEnum.DD_SHOW_TOAST_TYPE_SUCCESS, InteractionEnum.DD_SHOW_TOAST_DURATION);
            setTimeout(function () {
                Navigate.navigateBack(1);
            }, 2000);
        }
    }
})


