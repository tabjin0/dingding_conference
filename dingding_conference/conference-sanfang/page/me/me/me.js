import {PartyMember} from "../../../model/organization/partyMember";
import {Navigate} from "../../../utils/native-api/interface/navigate";
import {PageUrlConstant} from "../../../config/pageUrlConstant";
import {Caching} from "../../../utils/native-api/caching/caching";
import {CheckLogin} from "../../../core/authentication/CheckLogin";

Page({
    data: {
        partyToolsList: [
            {
                img: "/resources/me/dangfei.jpg",
                name: "党费缴纳"
            }
        ],
        userInfo: {}
    },
    async onLoad() {
        this.initData();
    },

    async initData() {
        await CheckLogin.fnRecheck();
        const userId = Caching.getStorageSync('user');
        const currentPartyMember = await PartyMember.getPartyMemberDetail(userId);
        this.setData({
            userInfo: currentPartyMember
        });
    },

    onTapGrid(e) {
        let singleMember = e.cell;
        Navigate.navigateTo(PageUrlConstant.statisticalReport);
    }
    ,
});
