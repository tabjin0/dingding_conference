import {VersionController} from "./model/version/VersionController";
import {config} from "./config/config";
import {Navigate} from "./utils/native-api/interface/navigate";
import {InitPartyBranchInfo} from "./page/organization/InitPartyBranchInfo";
import {System} from "./core/authentication/system";
import {FreeLogin} from "./core/authentication/FreeLogin";
import {Caching} from "./utils/native-api/caching/caching";

App({
    async onLaunch(options) {
        // console.log('App Launch', options);
        // console.log('getSystemInfoSync', dd.getSystemInfoSync());
        // console.log('SDKVersion', dd.SDKVersion);
        this.globalData.corpId = options.query.corpId;

        this.globalData.checkLogin = false;// 默认未登录
        if (!this.globalData.checkLogin) {
            const currentUser = await FreeLogin.currentUser();
            this.globalData.checkLogin = true;
        } else {
            this.globalData.checkLogin = false;
        }

        this.upLoadEApp();
    },

    onShow(options) {
        // 从后台被 scheme 重新打开
        // options.query == {number:1}
    },

    upLoadEApp() {
        console.log(`index canIUse`, dd.canIUse('getUpdateManager'));

        if (dd.canIUse('getUpdateManager')) {
            const updateManager = dd.getUpdateManager();
            console.log(`updateManager`, updateManager);

            updateManager.onCheckForUpdate(function (res) {
                // 请求完新版本信息的回调
                console.log(`res.hasUpdate`, res.hasUpdate) // 是否有更新
                dd.alert({
                    title: '亲',
                    content: `res.hasUpdate` + res.hasUpdate,
                    buttonText: '我知道了',
                    success: () => {
                        dd.alert({
                            title: '用户点击了「我知道了」',
                        });
                    },
                });
            })

            updateManager.onUpdateReady(function (ret) {
                console.log(`ret.version`, ret.version) // 更新版本号
                dd.confirm({
                    title: '更新提示',
                    content: '新版本已经准备好，是否重启应用？',
                    success: function (res) {
                        if (res.confirm) {
                            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                            updateManager.applyUpdate()
                        }
                    }
                })
            })

            updateManager.onUpdateFailed(function () {
                // 新版本下载失败
            })
        }
    },

    globalData: {
        corpId: '',
        checkLogin: false,
    },

    getDate() {
        var myDate = new Date();
        //获取当前年
        var year = myDate.getFullYear();
        //获取当前月
        var month = myDate.getMonth() + 1;
        //获取当前日
        var date = myDate.getDate();
        var h = myDate.getHours(); //获取当前小时数(0-23)
        var m = myDate.getMinutes(); //获取当前分钟数(0-59)
        var s = myDate.getSeconds();

        //获取当前时间

        var now = year + '-' + this.conver(month) + "-" + this.conver(date) + " " + this.conver(h) + ':' + this.conver(m) + ":" + this.conver(s);
        return now;

        // var myDate = new Date();
        // myDate.getYear();        //获取当前年份(2位)
        // myDate.getFullYear();    //获取完整的年份(4位,1970-????)
        // myDate.getMonth();       //获取当前月份(0-11,0代表1月)
        // myDate.getDate();        //获取当前日(1-31)
        // myDate.getDay();         //获取当前星期X(0-6,0代表星期天)
        // myDate.getTime();        //获取当前时间(从1970.1.1开始的毫秒数)
        // myDate.getHours();       //获取当前小时数(0-23)
        // myDate.getMinutes();     //获取当前分钟数(0-59)
        // myDate.getSeconds();     //获取当前秒数(0-59)
        // myDate.getMilliseconds();    //获取当前毫秒数(0-999)
        // myDate.toLocaleDateString();     //获取当前日期
        // var mytime = myDate.toLocaleTimeString();     //获取当前时间
        // myDate.toLocaleString();        //获取日期与时间
        // return myDate;
    },

    //日期时间处理
    conver(s) {
        return s < 10 ? '0' + s : s;
    },

    timeOffset(time1, time2) {
        // var d1 = new Date('2016-03-28 11:17:22');
        // var d2 = new Date('2016-03-28 11:17:28');
        console.log(new Date('2016-03-28 11:17:22'));
        var time1Date = new Date(time1);
        var time2Date = new Date(time2);
        console.log(time1Date);
        console.log(time2Date);

        if (time1Date > time2Date) {
            console.log("time1大");
        } else {
            console.log("time2大");
        }
        console.log(parseInt(time1Date - time2Date));//两个时间相差的毫秒数
        console.log(parseInt(time2Date - time1Date) / 1000);//两个时间相差的秒数
        console.log(parseInt(time2Date - time1Date) / 1000 / 60);//两个时间相差的分钟数
        console.log(parseInt(time2Date - time1Date) / 1000 / 60);//两个时间相差的小时数
        return parseInt(time2Date - time1Date) / 1000;
    },

    formatTime(date) {
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var day = date.getDate()

        var hour = date.getHours()
        var minute = date.getMinutes()
        var second = date.getSeconds()

        return [year, month, day].map(this.formatNumber).join('/') + ' ' + [hour, minute, second].map(this.formatNumber).join(':')
    },

    formatNumber(n) {
        n = n.toString()
        return n[1] ? n : '0' + n
    },

    /**
     * 判空
     * @param param
     * @returns {boolean}
     */
    isNull(param) {
        if (param == '') {
            return true;
        } else if (param == null) {
            return true;
        } else if (param == undefined) {
            return true;
        }
        return false;
    },

    /**
     * 判断item是否在数组中
     * @param arr 数组
     * @param item 待检测元素
     * @returns {boolean}
     */
    inArray(arr, item) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == item) {
                return true;
            }
        }
        return false;
    }
});
