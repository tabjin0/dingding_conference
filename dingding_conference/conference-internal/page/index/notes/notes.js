import {Notes} from '../../../model/notes';
import {User} from "../../../model/users";
import {Storage} from "../../../utils/storage";
import {InterAction} from "../../../model/interaction";

const app = getApp();

Page({
    data: {
        conference: null,
        filePaths: null,
        imgArr: [],
        chooseViewShow: true,
        currentUserId: null,
    },
    async onLoad(params) {
        // console.log(params);
        const currentUser = await User.getUserFromStorage();
        console.log('会议笔记，缓存中当前用户');
        console.log(currentUser);
        console.log('会议笔记，缓存中当前用户');
        this.setData({
            conference: params.conference,
            currentUserId: currentUser.user,// 从缓存中获取的当前用户
        });
    },

    async formSubmit(e) {
        console.log(e);
        console.log('e.detail.value');
        console.log(e.detail.value);
        let conference = JSON.parse(this.data.conference);
        let mid = conference.id;
        let uid = Storage.getStorageSyncByKey('user');
        let text = e.detail.value.text;
        // let img = this.data.imgArr.join(',');
        let img = 'https://www.baidu.com/img/bd_logo1.png?qua=high&where=super';
        console.log(mid);
        console.log(uid);
        console.log(text);
        console.log(img);
        if (app.isNull(mid)) {
            InterAction.fnAlert('抱歉', '未获取到当前会议，请重新进入该页面', '好的');
        } else if (app.isNull(uid)) {
            InterAction.fnAlert('抱歉', '未获取到当前用户，请退出并重新打开', '好的');
        } else if (app.isNull(text)) {
            InterAction.fnAlert('抱歉', '请输入笔记内容', '好的');
        } else if (app.isNull(img)) {
            InterAction.fnAlert('抱歉', '请选择图片', '好的');
        } else {
            let res = await Notes.submitNotes(mid, uid, text, img);
            console.log('点击提交按钮，提交的内容');
            console.log(res);
            console.log('点击提交按钮，提交的内容');
            if (res.code == 1) {
                InterAction.fnShowToast('success', '您已成功提交会议笔记', 2000);
                setTimeout(function () {
                    dd.navigateBack({
                        delta: 1
                    });
                }, 2000);
            } else {
                InterAction.fnAlert('抱歉', '提交笔记失败！', '好的');
            }
        }

    }
});
