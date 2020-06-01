import {CheckLogin} from "../../../core/authentication/CheckLogin";
import {PartyMember} from "../../../model/organization/partyMember";
import {Caching} from "../../../utils/native-api/caching/caching";

Page({
    data: {
        memberSummary: [],
    },
    async onLoad() {
        await CheckLogin.fnRecheck();
        await this.initData();
        console.log(`this.data`, this.data);
    },

    /**
     * 初始化党员基本信息
     */
    async initPartyMenberInfo() {
        const partyMemberInfoRes = await PartyMember.getPartyMemberInfo(Caching.getStorageSync('orgId'));
        console.log(`partyMemberInfoRes`, partyMemberInfoRes);
        let partyMemberInfo = partyMemberInfoRes.data;
        return partyMemberInfo;
    },

    /**
     * 初始化页面数据
     */
    async initData() {
        const partyMemberInfo = await this.initPartyMenberInfo();
        console.log(`partyMemberInfo`, partyMemberInfo)
        this.setData({
            organizationPartyMember: partyMemberInfo,
            partyBranchName: Caching.getStorageSync('orgName'),
            memberSummary: [{
                num: partyMemberInfo.length,
                name: "党员总数"
            }, {
                num: 0,
                name: "女党员"
            }, {
                num: 0,
                name: "预备党员"
            }, {
                num: 0,
                name: "少数民族"
            }]
        });
        console.log(`e`, this.data.memberSummary)
    },

    onInitChart(F2, config) {
        // console.log(`onInitChart`, config);
        // const chart = new F2.Chart(Object.assign(config,{padding: [20, 'auto']}));
        const chart = new F2.Chart(config);

        // 数据
        const data = [
            {value: 0, age: '25岁以下'},
            {value: 0, age: '26-35岁'},
            {value: 7, age: '36-45岁'},
            {value: 1, age: '46-50岁'},
            {value: 1, age: '51-55岁'},
            {value: 0, age: '56-60岁'},
            {value: 0, age: '61-70岁'},
            {value: 0, age: '71岁以上'},
        ];
        // 度量.度量 Scale，是数据空间到图形空间的转换桥梁，负责原始数据到 [0, 1] 区间数值的相互转换工作。针对不同的数据类型对应不同类型的度量。
        const defs = {
            age: {
                range: [0, 1],// 输出数据的范围，数值类型的默认值为 [0, 1]，格式为 [min, max]，min 和 max 均为 0 至 1 范围的数据。
                type: 'cat',// 分类类型
                // mask: 'MM-DD'// 数据的格式化格式
            },
            value: {
                // ticks: [0, 2, 4, 6, 8, 10],
                min: 0,// 手动指定最小值
                max: 10,// 手动指定最大值
                tickCount: 6,
                alias: '人数',
            }
        };
        // 装载数据，当 chart 实例创建完毕之后，通过调用以下接口装载数据
        chart.source(data, defs);
        // 填充线图跟坐标系之间构成区域图，也可以指定上下范围。
        // chart.area().position('age*value').shape('smooth').color('#E23F3F').adjust('stack');
        // 线，点按照 x 轴连接成一条线，构成线图。
        chart.line().position('age*value').shape('smooth').color('#E23F3F').adjust('stack');
        chart.render();
        // 注意：需要把chart return 出来
        return chart;
    },

    onInitPieChart(F2, config) {
        // console.log(`onInitPieChart`, config);
        const chart = new F2.Chart(config);

        const data = [
            {name: '研究生', num: 1, percent: 10},
            {name: '本科', num: 7, percent: 70},
            {name: '大专', num: 1, percent: 10},
            {name: '高中', num: 1, percent: 10},
            {name: '中专', num: 0, percent: 0},
            {name: '初中', num: 0, percent: 0},
            {name: '小学', num: 0, percent: 0},
            {name: '文盲', num: 0, percent: 0},
        ];


        let totalNum = 0;
        data.forEach((obj) => {
            totalNum += obj.num;
        })

        const map = {};
        data.forEach((obj) => {
            map[obj.name] = (obj.num / totalNum).toFixed(2) + '%';
        });

        const defs = {
            percent: {
                formatter: function formatter(val) {
                    return val + '%';
                }
            }
        }
        chart.source(data, defs);
        chart.legend({
            position: 'right',
            itemFormatter: function itemFormatter(val) {
                return val + '    ' + map[val];
            }
        });
        chart.coord('polar', {
            transposed: true,
            innerRadius: 0.7,
            radius: 0.85
        });
        chart.axis(false);
        chart.interval()
            .position('a*percent')
            .color('name', ['#D40229', '#E9B018', '#E97018'])
            .adjust('stack');
        chart.render();

    },

    onInitBarChart(F2, config) {
        // console.log(`onInitBarChart`, config);
        const chart = new F2.Chart(config);

        const data = [{
            year: '1945.9.2以前',
            sales: 0
        }, {
            year: '1945.9.3-1949.9.30',
            sales: 0
        }, {
            year: '1949.10.1-1966.4.30',
            sales: 1
        }, {
            year: '1966.5.1-1976.10.31',
            sales: 7
        }, {
            year: '1976.11.1-1978.12.31',
            sales: 1
        }, {
            year: '1979.1.1-2002.10.31',
            sales: 0
        }, {
            year: '2012.11.1以后',
            sales: 0
        }];

        const defs = {
            sales: {
                tickCount: 5
            }
        }
        chart.source(data, defs);

        chart.coord({
            transposed: true
        });
        chart.tooltip({
            showItemMarker: false,
            onShow: function onShow(ev) {
                const items = ev.items;
                items[0].name = null;
                items[0].name = items[0].title;
                items[0].value = '¥ ' + items[0].value;
            }
        });
        chart.interval().position('year*sales').color('#E9B018');
        chart.render();

    }
});
