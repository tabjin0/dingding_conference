// components/conference/card/index.js
import { Navigate } from "../../../utils/native-api/interface/navigate";
import { PageUrlConstant } from "../../../config/pageUrlConstant";

Component({
    /**
     * 组件的属性列表
     */
    props: {
        dataList: Array,
        infoOmitted: Boolean,
        hideInfo: Boolean,
        hideStatus: Boolean,
    },

    /**
     * 组件的初始数据
     */
    data: {
        infoOmitted: Boolean
    },

    observers: {
        'infoOmitted': function (infoOmitted) {
            if (infoOmitted) {// 省略
                this.data.infoOmitted = true;
            } else {
                this.data.infoOmitted = false;
            }
            console.log(infoOmitted);
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        /**
         * 跳转到会议详情
         * @param e
         */
        toConferenceDetail(e) {
            let mid = e.currentTarget.dataset.conference.id;
            Navigate.navigateTo(`${PageUrlConstant.conferenceDetail}?mid=` + mid);
        },
    }
})