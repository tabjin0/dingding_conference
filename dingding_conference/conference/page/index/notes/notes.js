import {Notes} from '../../../model/notes';
import {User} from "../../../model/users";
import {Storage} from "../../../utils/storage";

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
            dd.alert({content: '未获取到当前会议，请重新进入该页面'});
        } else if (app.isNull(uid)) {
            dd.alert({content: '未获取到当前用户，请退出并重新打开'});
        } else if (app.isNull(text)) {
            dd.alert({content: '请输入笔记内容'});
        } else if (app.isNull(img)) {
            dd.alert({content: '请选择图片'});
        } else {
            let res = await Notes.submitNotes(mid, uid, text, img);
            console.log('点击提交按钮，提交的内容');
            console.log(res);
            console.log('点击提交按钮，提交的内容');
            if (res.code == 1) {
                // dd.alert({title: '你已成功提交会议笔记'});
                dd.navigateBack({
                    delta: 1
                });
                dd.alert({title: '你已成功提交会议笔记'});
            } else {
                dd.alert({title: '提交失败'});
            }
        }

    }
});
