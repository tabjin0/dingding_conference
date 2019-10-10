Page({
    data: {
        room: [
            {
                rid: 1,
                rName: '东边会议室',
            }
        ]
    },
    onLoad() { },

    chooseLocation() {
        var that = this;

        // 定位
        dd.getLocation({
            success(res) {
                console.log(res);
                that.setData({
                    'conference.address': res.address,// 地址
                    'conference.longitude': res.longitude,// 经度
                    'conference.latitude': res.latitude,// 纬度
                });
                console.log(that.data.conference);
            },
            fail() {

            },
        })

        // 选择会议室
        // var meetingRoom = [];
        // dd.httpRequest({
        //     url: 'http://api.yzcommunity.cn/api/5d8b19b1744c7',
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'version': 'v3.0',
        //         'access-token': ''
        //     },
        //     dataType: 'json',
        //     success: function(res) {
        //         console.log(res);
        //         console.log(res.data.data);
        //         console.log("1223");
        //         for (var i = 0; i < res.data.data.length; i++) {
        //             meetingRoom.push(res.data.data[i]);
        //         }
        //         that.setData({
        //             meetingRoom: meetingRoom
        //         })
        //     },
        //     fail: function(res) {
        //         console.log(res);
        //         dd.alert({ content: res.errorMessage });
        //     },
        // });
    },

    meetingRoom(e) {
        console.log(e);
        var that = this;
        var meetingRoom = e.target.dataset.meetingRoom;
        console.log(meetingRoom);
        that.setData({
            'conference.address': meetingRoom
        });

    },
});
