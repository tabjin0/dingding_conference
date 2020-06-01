import {Navigate} from "../../utils/native-api/interface/navigate";

Page({
    data: {
        tabBarList: [
            {
                icon_name: "home",
                icon: "",
                activeIcon: "",
                text: '签到',
                pagePath: "/page/conference/checkIn/checkIn",
            },
            {
                icon_name: "home",
                icon: "",
                activeIcon: "",
                text: '请假',
                pagePath: "/page/conference/takeOff/takeOff",
            },
            {
                icon_name: "home",
                activeIcon: "",
                icon: "",
                text: '笔记',
                pagePath: "/page/conference/noteEdit/noteEdit",
            },
            {
                icon_name: "home",
                activeIcon: "",
                icon: "",
                text: '测试',
                pagePath: "/page/conference/noteEdit/noteEdit",
            }
        ]
    },
    onLoad() {
    },
    /**
     * 处理tabbar相关
     * @param e
     */
    detailTabBar(e) {
        const currentIndex = e;
        Navigate.navigateTo(this.data.tabBarList[currentIndex].pagePath);
    }
});
