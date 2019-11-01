//input.js
Page({
    data: {
        isSearch: false,
        focus: true,
        inputValue: '',
        searchValue: '',
    },

    cancelSearch() {
        // dd.navigateTo({
        //     url: '/page/meetingAgenda/agendaManagement/agendaManagement?conferenceId=' + conferenceId,
        //     success: (res) => {
        //         console.log(res);
        //     },
        //     fail: (res) => {
        //         console.log(res);
        //     }
        // });
        dd.navigateBack({
            delta: 1
        });
    },

    search(e) {
        console.log(e);
        console.log('搜索文本是');
        console.log(e.detail.value);
    }

})