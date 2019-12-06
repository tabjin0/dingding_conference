import { InterAction as Interaction } from "../../../utils/native-api/interface/interaction";
import { InteractionEnum } from "../../../utils/native-api/interface/InteractionEnum";
import { Summary } from "../../../model/conference/summary";
import { SummaryInfo } from "../../../model/conference/SummaryInfo";
import { Navigate } from "../../../utils/native-api/interface/navigate";

Page({
    data: {
        mid: null,
        summary: '',
    },
    onLoad(params) {
        const conference = JSON.parse(params.conference);
        console.log('con', conference)
        this.setData({
            mid: conference.id,
            summary: conference.summary == null ? '' : conference.summary
        });
    },

    async formSubmit(e) {
        let mid = this.data.mid;
        let summary = e.detail.value.summary;
        let imgs = '';

        const summaryInfo = new SummaryInfo(mid, summary, imgs);
        if (summaryInfo.dateCheck()) {
            const res = await Summary.submitSummary(summaryInfo);
            Interaction.fnShowToast('您已成功提交会议纪要', InteractionEnum.DD_SHOW_TOAST_TYPE_SUCCESS, InteractionEnum.DD_SHOW_TOAST_DURATION);
            setTimeout(function () {
                Navigate.navigateBack(1);
            }, 2000);
        }
    }
});
