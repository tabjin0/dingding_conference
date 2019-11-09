import {PartyMember} from "../../../model/partyMember";

const app = getApp();

Page({
    data: {
        organizationPartyMember: [
            // {
            //     index: 0,
            //     name: "申丽娜",
            //     avatar: "https://static.dingtalk.com/media/lADPDgQ9q8RWBaXNA4XNA4U_901_901.jpg",
            //     // avatar: '/resources/wodezhibu/何凤鸣.png',
            //     position: '正式党员',
            //     userId: "062764493629476850"
            // },
            // {
            //     index: 1,
            //     name: "王芳芳",
            //     avatar: "https://static.dingtalk.com/media/lADOATikS80E2s0E1w_1239_1242.jpg",
            //     // avatar: '/resources/wodezhibu/王芳芳.png',
            //     position: '预备党员',
            //     userId: "012452322629496107"
            // },
            // {
            //     index: 2,
            //     name: "申丽娜",
            //     avatar: "https://static.dingtalk.com/media/lADPDgQ9q8RWBaXNA4XNA4U_901_901.jpg",
            //     // avatar: '/resources/wodezhibu/何凤鸣.png',
            //     position: '正式党员',
            //     userId: "062764493629476850"
            // },
            // {
            //     index: 3,
            //     name: "王芳芳",
            //     avatar: "https://static.dingtalk.com/media/lADOATikS80E2s0E1w_1239_1242.jpg",
            //     // avatar: '/resources/wodezhibu/王芳芳.png',
            //     position: '预备党员',
            //     userId: "012452322629496107"
            // },
            // {
            //     index: 4,
            //     name: "申丽娜",
            //     avatar: "https://static.dingtalk.com/media/lADPDgQ9q8RWBaXNA4XNA4U_901_901.jpg",
            //     // avatar: '/resources/wodezhibu/何凤鸣.png',
            //     position: '正式党员',
            //     userId: "062764493629476850"
            // },
            // {
            //     index: 5,
            //     name: "王芳芳",
            //     avatar: "https://static.dingtalk.com/media/lADOATikS80E2s0E1w_1239_1242.jpg",
            //     // avatar: '/resources/wodezhibu/王芳芳.png',
            //     position: '预备党员',
            //     userId: "012452322629496107"
            // },
            // {
            //     index: 6,
            //     name: "申丽娜",
            //     avatar: "https://static.dingtalk.com/media/lADPDgQ9q8RWBaXNA4XNA4U_901_901.jpg",
            //     // avatar: '/resources/wodezhibu/何凤鸣.png',
            //     position: '正式党员',
            //     userId: "062764493629476850"
            // },
            // {
            //     index: 7,
            //     name: "王芳芳",
            //     avatar: "https://static.dingtalk.com/media/lADOATikS80E2s0E1w_1239_1242.jpg",
            //     // avatar: '/resources/wodezhibu/王芳芳.png',
            //     position: '预备党员',
            //     userId: "012452322629496107"
            // },
            // {
            //     index: 8,
            //     name: "申丽娜",
            //     avatar: "https://static.dingtalk.com/media/lADPDgQ9q8RWBaXNA4XNA4U_901_901.jpg",
            //     // avatar: '/resources/wodezhibu/何凤鸣.png',
            //     position: '正式党员',
            //     userId: "062764493629476850"
            // },
            // {
            //     index: 9,
            //     name: "王芳芳",
            //     avatar: "https://static.dingtalk.com/media/lADOATikS80E2s0E1w_1239_1242.jpg",
            //     // avatar: '/resources/wodezhibu/王芳芳.png',
            //     position: '预备党员',
            //     userId: "012452322629496107"
            // },
            // {
            //     index: 10,
            //     name: "申丽娜",
            //     avatar: "https://static.dingtalk.com/media/lADPDgQ9q8RWBaXNA4XNA4U_901_901.jpg",
            //     // avatar: '/resources/wodezhibu/何凤鸣.png',
            //     position: '正式党员',
            //     userId: "062764493629476850"
            // },
            // {
            //     index: 11,
            //     name: "王芳芳",
            //     avatar: "https://static.dingtalk.com/media/lADOATikS80E2s0E1w_1239_1242.jpg",
            //     // avatar: '/resources/wodezhibu/王芳芳.png',
            //     position: '预备党员',
            //     userId: "012452322629496107"
            // },
        ],

        defaultAvatar: [
            '/resources/icon/common/male.png',
            '/resources/icon/common/female.png',
            // 'https://static.dingtalk.com/media/lADPDgQ9q8RWBaXNA4XNA4U_901_901.jpg',// 男生
            // 'https://static.dingtalk.com/media/lADOATikS80E2s0E1w_1239_1242.jpg'// 女生
        ]
    },

    async onLoad() {
        // dd.showLoading({
        //     content: '加载中...'
        // })
        // await this.initData();
        // dd.hideLoading();
    },

    async onShow() {
        dd.showLoading({
            content: '加载中...'
        })
        await this.initData();
        dd.hideLoading();
    },

    /**
     * 下拉刷新
     */
    async onPullDownRefresh() {
        await this.initData();
        dd.stopPullDownRefresh();
    },

    /**
     * 初始化页面数据
     */
    async initData() {
        const partyMemberInfo = await this.initPartyMenberInfo();
        this.setData({
            organizationPartyMember: partyMemberInfo
        })
    },

    /**
     * 初始化党员基本信息
     */
    async initPartyMenberInfo() {
        const partyMemberInfoRes = await PartyMember.getPartyMemberInfo(1);
        console.log(partyMemberInfoRes);
        let partyMemberInfo = partyMemberInfoRes.data;
        for (let i = 0; i < partyMemberInfo.length; i++) {
            if (app.isNull(partyMemberInfo[i].headImg)) {
                switch (partyMemberInfo[i].gender) {
                    case '男':
                        partyMemberInfo[i].headImg = this.data.defaultAvatar[0];
                        break;
                    case '女':
                        partyMemberInfo[i].headImg = this.data.defaultAvatar[1];
                        break;
                }
            }
        }
        return partyMemberInfo;
    },

    toSingleMember(e) {
        console.log(e)
        let singleMember = e.target.dataset.singleMember;
        console.log(singleMember)
        dd.navigateTo({
            url: '/page/organization/singleMember/singleMember?single=' + JSON.stringify(singleMember)
        })
    }
});
