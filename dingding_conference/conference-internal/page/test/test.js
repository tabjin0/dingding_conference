let amapFile = require('/libs/amap-wx.js');//如：..­/..­/libs/amap-wx.js

Page({
    data: {},
    onLoad() {
        let that = this;
        let myAmapFun = new amapFile.AMapWX({key: '3e21968f4d4dc64a5e55a1243682a5be'});
        // myAmapFun.getPoiAround({
        //     success: function (data) {
        //         //成功回调
        //     },
        //     fail: function (info) {
        //         //失败回调
        //         console.log(info)
        //     }
        // })

        myAmapFun.getWxLocation({
            success: function (data) {
                console.log(data);
                //成功回调
            },
            fail: function (info) {
                //失败回调
                console.log(info)
            }
        })
    },
});
