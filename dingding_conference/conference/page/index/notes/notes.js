import {Notes} from '../../../model/notes';
import {User} from "../../../model/users";

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
    //
    // /** 选择图片 */
    // chooseImage() {
    //     let that = this;
    //     dd.chooseImage({
    //         count: 4 - that.data.imgArr.length,//最多选择4张图片
    //         sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    //         sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    //         success: function(res) {
    //             // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
    //             console.log(res);
    //             console.log(res.apFilePaths);
    //             if (res.apFilePaths.count == 0) {
    //                 return;
    //             }
    //             //上传图片
    //             //显示图片
    //             let imgArrNow = that.data.imgArr;
    //             imgArrNow = imgArrNow.concat(res.apFilePaths);
    //             console.log(imgArrNow);
    //             that.setData({
    //                 imgArr: imgArrNow
    //             })
    //             that.chooseViewShow();
    //         }
    //     })
    // },
    //
    // /** 删除图片 */
    // deleteImv(e) {
    //     let imgArr = this.data.imgArr;
    //     let itemIndex = e.currentTarget.dataset.id;
    //     imgArr.splice(itemIndex, 1);
    //     console.log(imgArr);
    //     this.setData({
    //         imgArr: imgArr
    //     })
    //     //判断是否隐藏选择图片
    //     this.chooseViewShow();
    // },
    //
    //
    // /** 是否隐藏图片选择 */
    // chooseViewShow() {
    //     if (this.data.imgArr.length >= 4) {
    //         this.setData({
    //             chooseViewShow: false
    //         })
    //     } else {
    //         this.setData({
    //             chooseViewShow: true
    //         })
    //     }
    // },
    //
    // /** 显示图片 */
    // showImage(e) {
    //     let imgArr = this.data.imgArr;
    //     let itemIndex = e.currentTarget.dataset.id;
    //
    //     dd.previewImage({
    //         current: imgArr[itemIndex], // 当前显示图片的http链接
    //         urls: imgArr // 需要预览的图片http链接列表
    //     })
    // },

    async formSubmit(e) {
        console.log(e);
        console.log('e.detail.value');
        console.log(e.detail.value);
        let conference = JSON.parse(this.data.conference);
        let mid = conference.id;
        let uid = this.data.currentUserId;
        let text = e.detail.value.text;
        // let img = this.data.imgArr.join(',');
        let img = 'https://www.baidu.com/img/bd_logo1.png?qua=high&where=super';
        console.log(mid);
        console.log(uid);
        console.log(text);
        console.log(img);
        if (app.isNull(uid)) {
            dd.alert({content: '未获取到当前会议，请重新进入该页面'});
        } else if (app.isNull(mid)) {
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
                dd.alert({title: '你已成功提交会议笔记'});
                dd.navigateBack({
                    delta: 1
                });
            } else {
                dd.alert({title: '提交失败'});
            }
        }

    }
});
