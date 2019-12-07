import {System} from "../../../model/authentication/system";
import {FreeLogin} from "../../../model/authentication/FreeLogin";
import {Statistic} from "../../../model/statistical/statistic";
import {Caching} from "../../../utils/native-api/caching/caching";
import {PartyMember} from "../../../model/organization/partyMember";

const app = getApp();

Page({
    data: {
        conferenceStatistic: []
    },
    async onLoad() {

    },

    async onShow() {
        if (app.globalData.checkLogin) {
            return;
        } else {
            const currentUser = await FreeLogin.currentUser();
            Caching.setStorageSync('currentUser', currentUser);// 用户登录并进入缓存
            await this.initData();
        }
    },

    async onPullDownRefresh() {
        await this.initData();
        dd.stopPullDownRefresh();
    },

    async initUser() {
        const authCode = await System.loginSystem();// 获取钉钉免登授权码
        const currentUser = await FreeLogin.freeLogin(authCode.authCode, app.globalData.corpId);// 用户登录并进入缓存
        this.setData({
            // isAdmin: currentUser.currentUser.isAdmin,
            // isLeaderInDepts: currentUser.currentUser.isLeaderInDepts
            isAdmin: Caching.getStorageSync('isAdmin'),
            isLeaderInDepts: Caching.getStorageSync('isLeaderInDepts')
        });
        return currentUser;
    },

    /**
     * 初始化数据
     * @returns {Promise<void>}
     */
    async initData() {
        const userId = Caching.getStorageSync('user');
        const departmentId = Caching.getStorageSync('department');

        const conferenceStatistic = await Statistic.conferenceStatistic(userId);
        const partyMemberList = await PartyMember.getPartyMemberInfo();
        console.log('conferenceStatistic', conferenceStatistic);
        console.log('partyMemberList', partyMemberList);

        this.setData({
            conferenceStatistic: conferenceStatistic,
            partyBranchMemberNum: partyMemberList.total // 党员数量
        });
    },

    /**
     * 初始化党支部党员数量
     * @private
     */
    async _initPartyMemberNum() {
        const partyMemberList = await PartyMember.getPartyMemberInfo(1);
    },

    onReady() {

        // demo
        // this.point = {
        //     x: Math.random() * 295,
        //     y: Math.random() * 295,
        //     dx: Math.random() * 5,
        //     dy: Math.random() * 5,
        //     r: Math.round(Math.random() * 255 | 0),
        //     g: Math.round(Math.random() * 255 | 0),
        //     b: Math.round(Math.random() * 255 | 0),
        // };
        //
        // this.interval = setInterval(() => {
        //     this.draw()
        // }, 17);

        this.drawCtx();
    },

    /**
     * 画饼图
     */
    drawCtx() {
        var context = dd.createCanvasContext('Canvas2');
        context.setFillStyle('#000');
        var array = [10, 10, 10];
        var colors = ["#228B22", "#008B8B", "#ADFF2F"];
        var total = 0;
        for (var val = 0; val < array.length; val++) {
            total += array[val];
        }
        var point = {x: 160, y: 120};
        var radius = 100;
        for (var i = 0; i < array.length; i++) {
            context.beginPath();
            var start = 0;
            if (i > 0) {
                for (var j = 0; j < i; j++) {
                    start += array[j] / total * 2 * Math.PI;
                }
            }
            context.arc(point.x, point.y, radius, start, start + array[i] / total * 2 * Math.PI, false);
            context.setLineWidth(2)
            context.lineTo(point.x, point.y);
            context.setStrokeStyle('#F5F5F5');
            context.setFillStyle(colors[i]);
            context.fill();
            context.closePath();
            context.stroke();
        }
        context.draw();
    },

    draw() {
        var ctx = dd.createCanvasContext('canvas');
        ctx.setFillStyle('#FFF');
        ctx.fillRect(0, 0, 305, 305);

        ctx.beginPath();
        ctx.arc(this.point.x, this.point.y, 10, 0, 2 * Math.PI);
        ctx.setFillStyle("rgb(" + this.point.r + ", " + this.point.g + ", " + this.point.b + ")");
        ctx.fill();
        ctx.draw();

        this.point.x += this.point.dx;
        this.point.y += this.point.dy;
        if (this.point.x <= 5 || this.point.x >= 295) {
            this.point.dx = -this.point.dx;
            this.point.r = Math.round(Math.random() * 255 | 0);
            this.point.g = Math.round(Math.random() * 255 | 0);
            this.point.b = Math.round(Math.random() * 255 | 0);
        }

        if (this.point.y <= 5 || this.point.y >= 295) {
            this.point.dy = -this.point.dy;
            this.point.r = Math.round(Math.random() * 255 | 0);
            this.point.g = Math.round(Math.random() * 255 | 0);
            this.point.b = Math.round(Math.random() * 255 | 0);
        }
    },

    drawBall() {

    },
    log(e) {
        if (e.touches && e.touches[0]) {
            console.log(e.type, e.touches[0].x, e.touches[0].y);
        } else {
            console.log(e.type);
        }
    },
    onUnload() {
        clearInterval(this.interval)
    }
})