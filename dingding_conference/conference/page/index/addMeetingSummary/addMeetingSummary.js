import {Summary} from "../../../model/summary";

const app = getApp();

Page({
    data: {},
    onLoad(params) {
        this.setData({
            mid: params.mid,
        });
    },

    async formSubmit(e) {
        let mid = this.data.mid;
        let summary = e.detail.value.summary;
        let imgs = 'https://www.baidu.com/img/bd_logo1.png?qua=high&where=super';
        dd.showLoading({
            content: '加载中...'
        })
        if (app.isNull(mid)) {
            dd.alert({title: '未获取到当前会议信息'});
        } else if (app.isNull(summary)) {
            dd.alert({title: '请输入纪要内容'})
        } else {
            const res = await Summary.submitSummary(mid, summary, imgs);
            dd.hideLoading();
            if (res.code == 1) {
                dd.alert({title: '你已成功提交会议纪要'});
                dd.navigateBack({
                    delta: 1
                });
            } else {
                dd.alert({title: '提交会议纪要失败'});
            }
        }
    }
});
