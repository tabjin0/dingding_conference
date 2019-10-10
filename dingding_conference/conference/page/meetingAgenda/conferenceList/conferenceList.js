Page({
    data: {
        focus: false,
        inputValue: '',

        conferenceList: [
            {
                conferenceId: 1,
                conferenceTheme: '嘉兴市第九届全国人民代表大会',
                conferenceDate: '2019-1-14',
                conferenceUpdateDate: '2019-1-14',
                address: '扬州电视台',
                conferenceOperation: 0,// 0：会议通知已下发；1：两个按钮：议题整理、通知下发
            },
            {
                conferenceId: 2,
                conferenceTheme: '嘉兴市第九届政治协商会议',
                conferenceDate: '2019-1-14',
                conferenceUpdateDate: '2019-8-14',
                address: '扬州电视台',
                conferenceOperation: 1,// 0：会议通知已下发；1：两个按钮：议题整理、通知下发
            },
            {
                conferenceId: 1,
                conferenceTheme: '嘉兴市第九届全国人民代表大会',
                conferenceDate: '2019-8-14',
                conferenceUpdateDate: '2019-8-14',
                address: '扬州电视台',
                conferenceOperation: 0,// 0：会议通知已下发；1：两个按钮：议题整理、通知下发
            },
            {
                conferenceId: 2,
                conferenceTheme: '嘉兴市第九届政治协商会议',
                conferenceDate: '2019-7-14',
                conferenceUpdateDate: '2019-7-15',
                address: '扬州电视台',
                conferenceOperation: 1,// 0：会议通知已下发；1：两个按钮：议题整理、通知下发
            },
            {
                conferenceId: 1,
                conferenceTheme: '嘉兴市第九届全国人民代表大会',
                conferenceDate: '2019-6-14',
                conferenceUpdateDate: '2019-6-15',
                address: '扬州电视台',
                conferenceOperation: 0,// 0：会议通知已下发；1：两个按钮：议题整理、通知下发
            },
            {
                conferenceId: 2,
                conferenceTheme: '嘉兴市第九届政治协商会议',
                conferenceDate: '2019-12-14',
                conferenceUpdateDate: '2019-12-15',
                address: '扬州电视台',
                conferenceOperation: 1,// 0：会议通知已下发；1：两个按钮：议题整理、通知下发
            },
            {
                conferenceId: 1,
                conferenceTheme: '嘉兴市第九届全国人民代表大会',
                conferenceDate: '2019-4-14',
                conferenceUpdateDate: '2019-4-15',
                address: '扬州电视台',
                conferenceOperation: 0,// 0：会议通知已下发；1：两个按钮：议题整理、通知下发
            },
            {
                conferenceId: 2,
                conferenceTheme: '嘉兴市第九届政治协商会议',
                conferenceDate: '2019-9-14',
                conferenceUpdateDate: '2019-9-14',
                address: '扬州电视台',
                conferenceOperation: 1,// 0：会议通知已下发；1：两个按钮：议题整理、通知下发
            }
        ],

        conferenceListOrderByDate: {},
    },
    onLoad() {
        var that = this;
        console.log(that.getDateArr(that.data.conferenceList));
        that.setData({
            conferenceListOrderByDate: that.getDateArr(that.data.conferenceList),
        });
        console.log("测试");
        console.log(that.data.conferenceListOrderByDate);
    },

    bindButtonTap: function() {
        this.setData({
            focus: true
        })
    },

    search() {
        dd.alert({
            content: '查询'
        });
    },

    agendaManager(e) {
        var conferenceId = e.currentTarget.dataset.conferenceId;
        dd.navigateTo({
            url: '/page/meetingAgenda/agendaManagement/agendaManagement?conferenceId=' + conferenceId,
            success: (res) => {
                console.log(res);
            },
            fail: (res) => {
                console.log(res);
            }
        });
    },

    issueNotice() {
        dd.alert({
            content: '通知下发'
        })
    },

    toConferenceDetail(e) {
        console.log(e);
        var conferenceId = e.currentTarget.dataset.conferenceId;
        console.log(conferenceId);
        dd.navigateTo({
            url: '/page/meetingAgenda/conferenceDetail/conferenceDetail?conferenceId=' + conferenceId,
            success: (res) => {
                console.log(res);
            },
            fail: (res) => {
                console.log(res);
            }
        });
    },

    operation(e) {
        console.log(e);
        var conferenceId = e.currentTarget.dataset.conferenceId;
        console.log(conferenceId);
        // console.log(agendaStateOfTheMeeting);
        // if (agendaStateOfTheMeeting == '待上会' || agendaStateOfTheMeeting == '拒绝上会') {
        // 	dd.showActionSheet({
        // 		title: '操作议题',
        // 		items: ['编辑', '申请上会'],
        // 		cancelButtonText: '取消好了',
        // 		success: (res) => {
        // 			const btn = res.index === -1 ? '取消' : '第' + res.index + '个';
        // 			dd.alert({
        // 				title: `你点了${btn}按钮`
        // 			});
        // 		},
        // 	});
        // }else if(agendaStateOfTheMeeting == '已上会') {
        // 	dd.showActionSheet({
        // 		title: '操作议题',
        // 		items: ['查看详情'],
        // 		cancelButtonText: '取消好了',
        // 		success: (res) => {
        // 			const btn = res.index === -1 ? '取消' : '第' + res.index + '个';
        // 			dd.alert({
        // 				title: `你点了${btn}按钮`
        // 			});
        // 		},
        // 	});
        // }
    },

    dateOrder() {
        var that = this;
        console.log(that.getDateArr(that.data.conferenceList));
        var dateStr = '2017-1-2';
        var reg = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
        console.log(dateStr.match(reg));
        console.log(RegExp.$1);
        console.log(RegExp.$2);
        console.log(RegExp.$3);
    },

    getDateArr(arr) {
        var new_arr = {};
        for (var i = 0, len = arr.length; i < len; i++) {
            var Month_index = arr[i].conferenceDate.lastIndexOf('-');// 从右向左查某个指定的字符串在字符串中最后一次出现的位置（也就是从后往前查）
            console.log(Month_index);// 月份索引 7
            var conferenceDate = arr[i].conferenceDate.substr(0, Month_index);
            console.log(conferenceDate);// 2019-1
            if (!new_arr[conferenceDate]) {
                new_arr[conferenceDate] = [];
                new_arr[conferenceDate].push(arr[i])
            } else {
                new_arr[conferenceDate].push(arr[i])
            }

        }
        return new_arr;
    }
});
