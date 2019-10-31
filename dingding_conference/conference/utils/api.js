/**
 * 小程序接口文件
 */

const host = "http://www.yzcommunity.cn",
    ghost = 'https://api.yzcommunity.cn/api/'

var md5 = require("MD5.js")

// 获取access_token
const getAccessTokenUrl = ghost + '5c1b4228a7cd8'

// 用code换取openId
const getOpenidUrl = (params) => wxRequest(params, ghost + 'User/get_party_openid')

// 用code换取openId
const getActivityInfo = (params) => wxRequest(params, ghost + '5ce278614d4dc')

const app_id = '88500965';
const app_secret = 'nanqugMcXEwUIbyiTyslhcDsjlUmxrpz';

module.exports = {
    getOpenidUrl,
    getActivityInfo
}

const wxRequest = (params, url) => {
    wx.showLoading({
        title: '加载中',
    })
    checkAccessToken(function () {
        wx.request({
            url: url,
            method: params.method || 'get',
            data: params.query || {},
            header: {
                'Content-Type': 'application/json',
                'version': 'v3.0',
                'access-token': wx.getStorageSync('AccessToken')
            },
            success: (res) => {
                wx.hideLoading();
                if (res.data.code == 1) {
                    params.success && params.success(res)
                } else {
                    var msg = res.data.msg;
                    if (res.statusCode != 200) msg = '网络异常，请稍后！';
                    wx.showToast({
                        title: msg,
                        icon: 'none',
                        duration: 2000
                    })
                }
            },
            fail: (res) => {
                wx.showToast({
                    title: '连接失败',
                    icon: 'loading',
                    duration: 2000
                })
                request.error();
                params.fail && params.fail(res)
            },
            complete: (res) => {
                params.complete && params.complete(res)
            }
        })
    })

}

const wxRequestNotoast = (params, url) => {
    checkAccessToken(function () {
        wx.request({
            url: url,
            method: params.method || 'get',
            data: params.query || {},
            header: {
                'Content-Type': 'application/json',
                'version': 'v3.0',
                'access-token': wx.getStorageSync('AccessToken')
            },
            success: (res) => {
                params.success && params.success(res)
                if (res.data.code == 1) {
                    params.success && params.success(res)
                } else {
                    var msg = res.data.msg;
                    if (res.statusCode != 200) msg = '网络异常，请稍后！';
                    wx.showToast({
                        title: msg,
                        icon: 'none',
                        duration: 2000
                    })
                }
            },
            fail: (res) => {
                wx.showToast({
                    title: '连接服务器失败',
                    icon: 'loading',
                    duration: 2000
                })
                params.fail && params.fail(res)
            },
            complete: (res) => {
                params.complete && params.complete(res)
            }
        })
    })

}

const checkAccessToken = (cb) => {
    var dev_id = wx.getStorageSync('dev_id') ? wx.getStorageSync('dev_id') : Math.random().toString(36).substr(2);
    wx.setStorageSync('dev_id', dev_id)

    var time = Date.parse(new Date()) / 1000;

    if (wx.getStorageSync('AccessTokenTime') > time && wx.getStorageSync('AccessToken')) {
        typeof cb == "function" && cb(wx.getStorageSync('AccessToken'))
    } else {
        var sign = md5.hexMD5('app_id=' + app_id + '&app_secret=' + app_secret + '&device_id=' + dev_id)
        wx.request({
            url: getAccessTokenUrl,
            method: 'post',
            data: {
                app_id: app_id,
                app_secret: app_secret,
                device_id: dev_id,
                signature: sign
            },
            header: {
                'Content-Type': 'application/json',
                'version': 'v3.0'
            },
            success: (res) => {
                if (res.data.code == 1) {
                    wx.setStorageSync('AccessToken', res.data.data.access_token)
                    wx.setStorageSync('AccessTokenTime', Date.parse(new Date()) / 1000 + res.data.data.expires_in - 600)
                } else {
                    var msg = res.data.msg;
                    if (res.statusCode != 200) msg = '网络异常，请稍后！';
                    wx.showToast({
                        title: msg,
                        icon: 'none',
                        duration: 2000
                    })
                }
                typeof cb == "function" && cb(wx.getStorageSync('AccessToken'))
            },
            fail: (res) => {
                wx.showToast({
                    title: '连接服务器失败',
                    icon: 'loading',
                    duration: 2000
                })
            }
        })
    }

}
