Page({
    data: {},
    onLoad(params) {
        console.log(`webView url`, params);
        if (params) {
            this.setData({
                url: params.url
            });
        }
    },
});
