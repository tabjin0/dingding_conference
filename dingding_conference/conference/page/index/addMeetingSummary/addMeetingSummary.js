import {Summary} from "../../../model/summary";
import {InterAction} from "../../../model/interaction";

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
            InterAction.fnAlert('抱歉', '未获取到当前会议信息', '好的');
        } else if (app.isNull(summary)) {
            InterAction.fnAlert('抱歉', '请输入纪要内容', '好的');
        } else {
            const res = await Summary.submitSummary(mid, summary, imgs);
            dd.hideLoading();
            if (res.code == 1) {
                dd.navigateBack({
                    delta: 1
                });
                InterAction.fnShowToast('success', '您已成功提交会议纪要', 2000);
            } else {
                InterAction.fnAlert('抱歉', '提交会议纪要失败！', '好的');

            }
        }
    }
});
