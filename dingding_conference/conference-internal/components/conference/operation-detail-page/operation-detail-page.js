import {Navigate} from "../../../utils/native-api/interface/navigate";
import {PageUrlConstant} from "../../../config/pageUrlConstant";
import {PositioningCheckIn} from "../models/PositioningCheckIn";
import {OperationGroup} from "../models/operation/operation-group";
import {OperationGroupJudger} from "../models/operation/operationGroupJudger";
import {Conference} from "../../../model/conference/conference";
import {Caching} from "../../../utils/native-api/caching/caching";

Component({
    mixins: [],
    data: {
        conference: Object,
        operationGroup: Object,
        imgObjArr: Array,
    },

    props: {
        data: Object,
        isLeaderInDepts: Boolean,// 是否是主管
        onPackageConfereeInfo: (currentConference) => {
            console.log('currentConference', currentConference);
        },
        onPackageReadInfo: (currentConference) => {
            console.log('currentConference', currentConference);
        },
        onChange: (d) => {
            console.log(d)
        }
    },

    didMount() {
        let operationGroup = new OperationGroup();
        this.setData({
            operationGroup: operationGroup
        });
    },

    async didUpdate(prevProps, prevData) {
        this.data.conference = this.props.data;// 拿到父级传来的conference
        if (this.data.operationGroupLocated) {
            // 已经定位签到
            this.setData({
                operationGroup: this.data.operationGroupLocated
            });
        } else {
            // 没有定位签到默认为加载到详情页时，直接根据用户数据判断是否签到
            let operationJudger = new OperationGroupJudger(this.data.conference.sign_type);// 页面渲染时初始化按钮状态
            this.setData({
                operationGroup: operationJudger.operationGroup
            });
        }
    },

    didUnmount() {
        //    嘻嘻嘻嘻
    },

    methods: {
        /**
         * 签到当前会议
         * @returns {Promise<void>}
         */
        async locationCheckCurrentConference() {
            let positioning = new PositioningCheckIn(this.data.conference);
            await positioning.checkIn();

            const currentConference = await Conference.getConferenceDetail(this.props.data.id, Caching.getStorageSync('user'));
            this.props.onPackageConfereeInfo(currentConference);
            this.props.onPackageReadInfo(currentConference);

            this.setData({
                operationGroupLocated: positioning.operationGroup.operationGroup
            });
            // console.log('operationGroupLocated', this.data.operationGroupLocated);

        },

        /**
         * 请假
         */
        takeOff() {
            const conference = this.data.conference;
            Navigate.navigateTo(`${PageUrlConstant.takeOff}?conference=` + JSON.stringify(conference));
        },

        /**
         * 照片
         */
        toPhoto() {
            let imgArr = this.data.conference.imgs;
            console.log(`this.data.conference.imgs: `, this.data.conference.imgs)
            let mid = this.data.conference.id;
            Navigate.navigateTo(`${PageUrlConstant.photo}?imgArr=` + JSON.stringify(imgArr) + '&mid=' + mid);
        },

        /**
         * 纪要
         */
        summary() {
            Navigate.navigateTo(`${PageUrlConstant.conferenceSummary}?conference=` + JSON.stringify(this.data.conference));
        },

        /**
         * 笔记
         */
        note() {
            Navigate.navigateTo(`${PageUrlConstant.conferenceNote}?mid=` + this.data.conference.id);
        },

        /**
         * 发送钉
         */
        notice() {
            let useridArr = [];
            this.data.readInfo[1].forEach(user => {
                useridArr.push(user.userid);
            });
            Ding.createNoticeDing({
                users: useridArr,
                corpId: app.globalData.corpId,
                text: this.data.conference.theme,
            })
        },
    },
});
