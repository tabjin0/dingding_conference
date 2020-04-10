import {Navigate} from "../../../utils/native-api/interface/navigate";

Component({
    mixins: [],
    data: {},
    props: {
        icon: String,// 列表组件中icon类型
        iconColor: '#3963BC',// 列表组件中icon的颜色
        iconSize: '28',// 列表组件中icon的大小
        image: '',// 列表组件中图片资源
        title: '',// 列表组件中左侧文本的内容
        titleColor: '#3963BC',// 列表组件中左侧文本颜色
        desc: String,// 列表组件中左侧描述文本的内容
        // 标签相关
        tagPosition: 'left',// 标签显示的位置,right/left
        tagContent: String,// 标签的内容
        tagShape: 'square',// 标签的形状,square/circle
        tagColor: String,// 标签的颜色
        tagPlain: false,// 标签是否镂空
        // 徽章相关
        badgePosition: 'left',// 徽标显示的位置
        dotBadge: false,// 显示圆点徽标
        badgeCount: 0,// 徽标的数值
        badgeMaxCount: 99,// 徽标数字最大值，超过最大值时显示${max-count}+
        badgeCountType: 'overflow',// 徽标数字的显示方式
        // 列表右侧相关
        rightDesc: String,// 列表组件中右侧描述文本的内容
        gap: Number,// 设置list内左右两侧内容距list两边的间距
        leftGap: Number,// 设置list内左侧内容距list左边的间距
        rightGap: Number,// 设置list内右侧内容距list右边的间距
        isLink: true,// 是否显示跳转的图标
        linkType: 'navigateTo',// 设置跳转类型
        url: '',// 设置跳转的路径
        onListDataChange: (e) => console.log('e', e),
    },
    didMount() {
        console.log(this.props.titleColor);
    },
    didUpdate() {
        console.log(this.props.titleColor);
    },
    didUnmount() {
    },
    methods: {
        /**
         * 点击cell
         * @param e
         */
        tapCell(e) {
            // console.log('list tabcell e', e.currentTarget.dataset);
            const url = e.currentTarget.dataset;
            this._popData(e);
        },

        _popData(e) {
            this.props.onListDataChange(e);
        }
    },
});
