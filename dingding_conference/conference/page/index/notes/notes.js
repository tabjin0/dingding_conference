import { Notes } from '../../../model/notes';

Page({
    data: {
        conference: null,
        filePaths: null,
        imgArr: [],
        chooseViewShow: true,
    },
    onLoad(params) {
        console.log(params);
        this.setData({
            conference: params.conference
        });
    },

    /** 选择图片 */
    chooseImage() {
        var that = this;
        dd.chooseImage({
            count: 4 - that.data.imgArr.length,//最多选择4张图片
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function(res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                console.log(res);
                console.log(res.apFilePaths);
                if (res.apFilePaths.count == 0) {
                    return;
                }
                //上传图片
                //显示图片
                var imgArrNow = that.data.imgArr;
                imgArrNow = imgArrNow.concat(res.apFilePaths);
                console.log(imgArrNow);
                that.setData({
                    imgArr: imgArrNow
                })
                that.chooseViewShow();
            }
        })
    },

    /** 删除图片 */
    deleteImv(e) {
        var imgArr = this.data.imgArr;
        var itemIndex = e.currentTarget.dataset.id;
        imgArr.splice(itemIndex, 1);
        console.log(imgArr);
        this.setData({
            imgArr: imgArr
        })
        //判断是否隐藏选择图片
        this.chooseViewShow();
    },


    /** 是否隐藏图片选择 */
    chooseViewShow() {
        if (this.data.imgArr.length >= 4) {
            this.setData({
                chooseViewShow: false
            })
        } else {
            this.setData({
                chooseViewShow: true
            })
        }
    },

    /** 显示图片 */
    showImage(e) {
        var imgArr = this.data.imgArr;
        var itemIndex = e.currentTarget.dataset.id;

        dd.previewImage({
            current: imgArr[itemIndex], // 当前显示图片的http链接
            urls: imgArr // 需要预览的图片http链接列表
        })
    },

    async formSubmit(e) {
        console.log(e);
        console.log('e.detail.value');
        console.log(e.detail.value);
        var conference = JSON.parse(this.data.conference);
        var mid = conference.id;
        var uid = '11111111111';
        var text = e.detail.value.text;
        // var img = this.data.imgArr.join(',');
        var img = 'https://www.baidu.com/img/bd_logo1.png?qua=high&where=super';
        console.log(mid);
        console.log(uid);
        console.log(text);
        console.log(img);
        var res = await Notes.submitNotes(mid, uid, text, img);
        console.log(res);
    }
});
