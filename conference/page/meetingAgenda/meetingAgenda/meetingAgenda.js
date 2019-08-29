Page({
    data: {},
    onLoad() { },

    toXinZengHuiYi() {
        dd.navigateTo({
            url: '/page/meetingAgenda/addConference/addConference',
            success: (res) => {
                console.log(res);
            },
            fail: (res) => {
                console.log(res);
            }
        });
    },

    toConferenceDetail() {
        dd.navigateTo({
            url: '/page/meetingAgenda/conferenceDetail/conferenceDetail',
            success: (res) => {
                console.log(res);
            },
            fail: (res) => {
                console.log(res);
            }
        });
    },

    toConferenceList() {
        dd.navigateTo({
            url: '/page/meetingAgenda/conferenceList/conferenceList',
            success: (res) => {
                console.log(res);
            },
            fail: (res) => {
                console.log(res);
            }
        });
    },

    toAgendaManagement() {
        dd.navigateTo({
            url: '/page/meetingAgenda/agendaManagement/agendaManagement',
            success: (res) => {
                console.log(res);
            },
            fail: (res) => {
                console.log(res);
            }
        });
    },

});
