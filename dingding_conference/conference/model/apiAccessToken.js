/**
 * 接口accessToken模型
 */
class apiAccessToken {

    checkAccessToken = (cb) => {
    var dev_id = dd.getStorageSync('dev_id') ? dd.getStorageSync('dev_id') : Math.random().toString(36).substr(2);
    dd.setStorageSync('dev_id', dev_id)

    var time = Date.parse(new Date()) / 1000;

    if (dd.getStorageSync('AccessTokenTime') > time && dd.getStorageSync('AccessToken')) {
        typeof cb == "function" && cb(dd.getStorageSync('AccessToken'))
    } else {
        var sign = md5.hexMD5('app_id=' + app_id + '&app_secret=' + app_secret + '&device_id=' + dev_id)
        dd.httpRequest({
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
                    dd.setStorageSync('AccessToken', res.data.data.access_token)
                    dd.setStorageSync('AccessTokenTime', Date.parse(new Date()) / 1000 + res.data.data.expires_in - 600)
                } else {
                    var msg = res.data.msg;
                    if (res.statusCode != 200) msg = '网络异常，请稍后！';
                    dd.showToast({
                        title: msg,
                        icon: 'none',
                        duration: 2000
                    })
                }
                typeof cb == "function" && cb(dd.getStorageSync('AccessToken'))
            },
            fail: (res) => {
                dd.showToast({
                    title: '连接服务器失败',
                    icon: 'loading',
                    duration: 2000
                })
            }
        })
    }
}