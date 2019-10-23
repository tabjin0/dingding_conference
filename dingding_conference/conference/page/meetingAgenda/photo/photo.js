import {config} from "../../../config/config";
import {UploadDownLoad} from "../../../utils/uploadDownLoad";
import {Upload} from "../../../model/upload";
import {Summary} from "../../../model/summary";

Page({
    data: {
        filePaths: null,
        imgArrEx: [],
        imgArrExLength: 0,
        imgArr: [
            // 'http://pic36.photophoto.cn/20150702/0025008195115642_b.jpg',
            // 'http://pic36.photophoto.cn/20150702/0025008195115642_b.jpg',
            // 'http://pic36.photophoto.cn/20150702/0025008195115642_b.jpg',
            // 'http://pic36.photophoto.cn/20150702/0025008195115642_b.jpg',
            // 'http://pic36.photophoto.cn/20150702/0025008195115642_b.jpg',
            // 'http://pic36.photophoto.cn/20150702/0025008195115642_b.jpg',
            // 'http://pic36.photophoto.cn/20150702/0025008195115642_b.jpg',
            // 'http://pic36.photophoto.cn/20150702/0025008195115642_b.jpg',
            // 'http://pic36.photophoto.cn/20150702/0025008195115642_b.jpg',
        ],
        chooseViewShow: true,
        uploadFlag: true,// 默认上传成功

        totalImgArr: [],
        totalImgIdArr: [],

    },
    onLoad(param) {
        console.log(param);
        let imgArrEx = JSON.parse(param.imgArr);
        console.log('imgArrEx');
        console.log(imgArrEx);

        let imgArr = [];
        let totalImgIdArr = [];
        for (let i = 0; i < imgArrEx.length; i++) {
            imgArr.push(imgArrEx[i].path);// 原有的图片
            // console.log(this.data.imgArrEx[i].id);
            totalImgIdArr.push(imgArrEx[i].id);
        }
        this.setData({
            imgArr: imgArr,
            imgArrEx: imgArrEx,
            imgArrExLength: imgArrEx.length,
            totalImgIdArr: totalImgIdArr,
            mid: param.mid
        });
        console.log(totalImgIdArr)

    },

    onShow() {
        // console.log(param);
    },

    /**
     * 选择图片
     */
    chooseImage() {
        let that = this;
        dd.chooseImage({
            count: 100 - that.data.imgArr.length,//最多选择4张图片
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: async function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                // console.log('返回选定照片的本地文件路径列表');
                // console.log(res);
                // console.log(res.apFilePaths);
                if (res.apFilePaths.count == 0) {
                    return;
                }
                //上传图片
                // dd.showLoading({
                //     content: '上传中...'
                // });
                let totalImgIdArr = that.data.totalImgIdArr;
                let flag = that.data.uploadFlag;
                console.log('totalImgIdArr开始')
                console.log(totalImgIdArr)
                for (let i = 0; i < res.filePaths.length; i++) {
                    console.log(res.filePaths[i]);
                    let img = await Upload.uploadImg(res.filePaths[i], 'img');
                    // uploadStatus.push(JSON.parse(img.data).code);
                    console.log(JSON.parse(img.data))
                    let imgObj = JSON.parse(img.data);
                    if (imgObj.code === 1) {
                        totalImgIdArr.push(parseInt(imgObj.data.id));
                        flag = true;
                    } else {
                        flag = false;
                        dd.alert({content: `图片${totalImgIdArr.length + i + 1}拉取失败，请删除并重新选择`})
                    }
                }
                ;
                // dd.hideLoading();
                that.setData({
                    cacheImg: res.filePaths[0],
                    totalImgIdArr: totalImgIdArr,
                    uploadFlag: flag
                })


                //显示图片
                let imgArrNow = that.data.imgArr;
                imgArrNow = imgArrNow.concat(res.apFilePaths);
                console.log(imgArrNow);
                that.setData({
                    imgArr: imgArrNow
                });

                console.log('totalImgIdArr')
                console.log(totalImgIdArr)
                that.chooseViewShow();
            }
        })
    },

    /**
     * 删除图片
     * @param e
     */
    deleteImv(e) {
        console.log(e)
        let imgArr = this.data.imgArr;
        let itemIndex = e.currentTarget.dataset.id;
        let totalImgIdArr = this.data.totalImgIdArr;
        console.log(itemIndex)
        imgArr.splice(itemIndex, 1);
        totalImgIdArr.splice(itemIndex, 1);
        console.log(imgArr);
        console.log(totalImgIdArr)
        this.setData({
            imgArr: imgArr,
            totalImgIdArr: totalImgIdArr
        })
        //判断是否隐藏选择图片
        this.chooseViewShow();
    },


    /**
     * 是否隐藏图片选择
     */
    chooseViewShow() {
        if (this.data.imgArr.length >= 100) {
            this.setData({
                chooseViewShow: false
            })
        } else {
            this.setData({
                chooseViewShow: true
            })
        }
    },


    /**
     * 显示图片
     * @param e
     */
    showImage(e) {
        console.log(e)
        let imgArr = this.data.imgArr;
        let itemIndex = e.currentTarget.dataset.id;

        dd.previewImage({
            current: itemIndex, // 当前显示图片的http链接
            urls: imgArr // 需要预览的图片http链接列表
        })
    },

    /**
     * 提交图片
     */
    async submitImg() {
        console.log(this.data);
        let mid = this.data.mid;
        let imgsStr = this.data.totalImgIdArr.join(',');
        console.log(imgsStr)
        const res = await Summary.submitImgs(mid, imgsStr);
        console.log(res);

        // if (this.data.uploadFlag) {
        //     dd.alert({title: `图片上传成功`});
        //     dd.navigateTo({
        //         url: '/page/meetingAgenda/conferenceDetail/conferenceDetail?mid=' + this.data.mid
        //     })
        // } else {
        //     dd.alert({title: `图片上传失败，请重新上传图`});
        // }
    },

});