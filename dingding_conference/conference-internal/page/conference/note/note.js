import {InterAction} from "../../../utils/native-api/interface/interaction";
import {Notes} from "../../../model/conference/notes";
import {Navigate} from "../../../utils/native-api/interface/navigate";
import {Caching} from "../../../utils/native-api/caching/caching";
import {NoteInfo} from "../../../model/conference/NoteInfo";
import {InteractionEnum} from "../../../utils/native-api/interface/InteractionEnum";
import {FreeLogin} from "../../../core/authentication/FreeLogin";
import {CheckLogin} from "../../../core/authentication/CheckLogin";
import {PageUrlConstant} from "../../../config/pageUrlConstant";

const app = getApp();
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
        await CheckLogin.fnRecheck();
        this._initCurrentConferenceUserNote();
    },

    // async onShow() {
    //     await this.initUser();
    //     this._initCurrentConferenceUserNote();
    // },

    // async initUser() {
    //     if (!app.globalData.checkLogin || !Caching.getStorageSync('currentUser')) {
    //         const currentUser = await FreeLogin.currentUser();
    //         Caching.setStorageSync('currentUser', currentUser);// 用户登录并进入缓存
    //         app.globalData.checkLogin = true;
    //     }
    // },

    /**
     * 初始化当前会议的用户笔记列表
     * @returns {Promise<void>}
     */
    async _initCurrentConferenceUserNote() {
        const userId = Caching.getStorageSync('currentUser').basicCurrentUserInfo.userid;
        const noteList = await Notes.getUserNoteList(this.data.mid, userId);
        this.setData({
            noteList: noteList.data,
        });
    },

    async formSubmit(e) {
        const mid = this.data.mid;
        console.log('uid', Caching.getStorageSync('currentUser'));
        const uid = Caching.getStorageSync('currentUser').basicCurrentUserInfo.userid;
        const text = e.detail.value.text;
        const img = ' ';

        const noteInfo = new NoteInfo(mid, uid, text, img);
        console.log('noteInfo', noteInfo);
        if (noteInfo.dateCheck()) {
            const addNoteRes = await Notes.submitNotes(noteInfo);
            InterAction.fnShowToast('提交成功', InteractionEnum.DD_SHOW_TOAST_TYPE_SUCCESS, InteractionEnum.DD_SHOW_TOAST_DURATION);
            setTimeout(function () {
                // Navigate.navigateBack(1);
                Navigate.navigateTo(`${PageUrlConstant.conferenceDetail}?mid=` + mid);
            }, 2000);
        }
    }
})


