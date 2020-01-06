import { NoteInfo } from "../../../model/conference/NoteInfo";
import { Notes } from "../../../model/conference/notes";
import { InterAction } from "../../../utils/native-api/interface/interaction";
import { Navigate } from "../../../utils/native-api/interface/navigate";
import { InteractionEnum } from "../../../utils/native-api/interface/InteractionEnum";
import {CheckLogin} from "../../../core/authentication/CheckLogin";

Page({
  data: {},
  async onLoad(params) {
    await CheckLogin.fnRecheck();
    this.setData({
      note: JSON.parse(params.note)
    });
  },

  async formSubmit(e) {
    const mid = this.data.note.mid;
    const uid = this.data.note.userid;
    const text = e.detail.value.text;
    const img = ' ';

    const noteInfo = new NoteInfo(mid, uid, text, img);
    console.log('noteInfo', noteInfo);
    if (noteInfo.dateCheck()) {
      const addNoteRes = await Notes.submitNotes(noteInfo);
      InterAction.fnShowToast('提交成功', InteractionEnum.DD_SHOW_TOAST_TYPE_SUCCESS, InteractionEnum.DD_SHOW_TOAST_DURATION);
      setTimeout(function () {
        Navigate.navigateBack(1);
      }, 2000);
    }
  }
});
