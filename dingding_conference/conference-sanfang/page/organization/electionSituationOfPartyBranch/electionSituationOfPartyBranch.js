Page({
    data: {
        infos: [
            {name: "改选日期", info: "2020年4月1日"},
            {name: "会议地址", info: "党支部第一会议室"},
            {name: "参加支部大会人数", info: "12"},
            {name: "有选举权正式党员人数", info: "11"},
            {name: "缺席党员", info: "--"},
            {name: "上级党（工）委参加会议人员名单", info: "张某某 李某某 程某某 于某某"},
            {name: "主持人", info: "名字一"},
            {name: "监票人", info: "名字二"},
            {name: "计票人", info: "名字三"},
        ],
        last: {
            titles: ['姓名', '原任职务', '变动原因'],
            info: [
                {index: 0, name: '王芳芳', position: '职务名称', reason: '变动原因'},
                {index: 1, name: '董子衍', position: '职务名称', reason: '变动原因'},
                {index: 2, name: '张进', position: '职务名称', reason: '变动原因'},
            ]
        },

        new: {
            titles: ['姓名', '年龄', '学历', '党内职务', '支委分工'],
            info: [
                {index: 0, name: '王芳芳', age: 30, degree: '研究生', position: '职务名称', division: '支委分工'},
                {index: 1, name: '董子衍', age: 28, degree: '本科', position: '职务名称', division: '支委分工'},
                {index: 2, name: '张进', age: 25, degree: '本科', position: '职务名称', division: '支委分工'},
            ]
        }
    },
    onLoad() {
    },
});
