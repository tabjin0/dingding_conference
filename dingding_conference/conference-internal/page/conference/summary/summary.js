import {InterAction as Interaction} from "../../../utils/native-api/interface/interaction";
import {InteractionEnum} from "../../../utils/native-api/interface/InteractionEnum";
import {Summary} from "../../../model/conference/summary";


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
            Interaction.fnShowToast('未获取到当前会议信息', `${InteractionEnum.DD_SHOW_TOAST_TYPE_NONE}`, InteractionEnum.DD_SHOW_TOAST_DURATION);
        } else if (app.isNull(summary)) {
            Interaction.fnShowToast('请输入纪要内容', `${InteractionEnum.DD_SHOW_TOAST_TYPE_NONE}`, InteractionEnum.DD_SHOW_TOAST_DURATION);

        } else {
            const res = await Summary.submitSummary(mid, summary, imgs);
            dd.hideLoading();
            if (res.code === 1) {
                Interaction.fnShowToast('您已成功提交会议纪要', `${InteractionEnum.DD_SHOW_TOAST_TYPE_SUCCESS}`, InteractionEnum.DD_SHOW_TOAST_DURATION);
                setTimeout(function () {
                    dd.navigateBack({
                        delta: 1
                    });
                }, 2000);
            } else {
                Interaction.fnShowToast('提交会议纪要失败！', `${InteractionEnum.DD_SHOW_TOAST_TYPE_NONE}`, InteractionEnum.DD_SHOW_TOAST_DURATION);
            }
        }
    }
});
