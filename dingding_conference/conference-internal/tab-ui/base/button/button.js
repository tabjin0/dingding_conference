Component({
    mixins: [],
    data: {},
    props: {
        name: 'tab',
        type: 'default',// 按钮类型
        plain: false,// 按钮是否镂空
        size: 'medium',// 按钮尺寸
        shape: 'circle',// 按钮形状
        disabled: false,// 按钮是否禁用
        special: false,// 特殊按钮
        loading: false,// 是否为加载中按钮
        width: Number,// 按钮宽度
        height: Number,// 按钮高度
        icon: String,// 按钮内icon图标
        image: String,
        bgColor: String,// 按钮背景颜色
        iconColor: '#fff',// 按钮内icon颜色
        iconSize: String,// 按钮内icon大小
        openType: String,
        appParameter: String,
        lang: String,
        hoverStopPropagation: Boolean,
        hoverStartTime: 20,
        hoverStayTime: 70,
        sendMessageTitle: String,
        sendMessagePath: String,
        sendMessageImg: String,
        sendMessageCard: Boolean,
        formType: String
    },
    didMount() {
    },
    didUpdate() {
    },
    didUnmount() {
    },
    methods: {
        // button点击事件
        handleTap() {
            if (this.data.disabled || this.data.loading) return false;

        },
    }
});
