Page({
    data: {
        singleMember: null,
        gender: '男',
        headImg: [
            '/resources/icon/organiztion/male.png',
            '/resources/icon/organiztion/female.png',
        ]
    },
    onLoad(param) {
        let singleMember = JSON.parse(param.single);
        this.data.singleMember = singleMember;
        this.data.gender = singleMember.gender;
    },


});
