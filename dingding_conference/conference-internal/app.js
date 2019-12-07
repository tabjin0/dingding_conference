import {VersionController} from "./model/version/VersionController";
import {config} from "./config/config";
import {Navigate} from "./utils/native-api/interface/navigate";
import {InitPartyBranchInfo} from "./page/organization/InitPartyBranchInfo";
import {System} from "./model/authentication/system";
import {FreeLogin} from "./model/authentication/FreeLogin";
import {Caching} from "./utils/native-api/caching/caching";

App({
    async onLaunch(options) {
        // console.log('App Launch', options);
        // console.log('getSystemInfoSync', dd.getSystemInfoSync());
        // console.log('SDKVersion', dd.SDKVersion);
        this.globalData.corpId = options.query.corpId;

        const currentUser = await FreeLogin.currentUser();
        if(currentUser){
            Caching.setStorageSync('currentUser',);// 用户登录并进入缓存
            this.globalData.checkLogin = true;
        }else {
            this.globalData.checkLogin = false;
        }

        // console.log('app currentUser', currentUser);
        // this.globalData.currentUser = currentUser;

        const version = await VersionController.isAppNewVersion(`${config.currentVersion}`);

    },
    async onShow() {
    },

    onHide() {
        console.log('App Hide');
    },
    globalData: {
        corpId: '',
        checkLogin: false,
    },


    // 构建全局议题对象对象(ID，议题名称)
    agenda(itemId, agendaName) {
        var agendaItem = new Object;
        agendaItem.itemId = itemId;
        agendaItem.agendaName = agendaName;
        return agendaItem;
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