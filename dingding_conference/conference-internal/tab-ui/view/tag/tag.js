Component({
    mixins: [],
    data: {},
    props: {
        // 标签标识
        name: String,
        cell: Object,
        // 标签颜色
        // 标签类型,reading/touch,touch主要便于点击，同时具有最小宽度，例如电商小程序sku的场景;reading主要用于展示阅读，宽度由文本长度所决定，例如展示商品的标签
        type: 'touch',
        // 实心标签背景颜色
        bgColor: String,
        // 镂空标签字体颜色
        fontColor: String,
        // 镂空标签字体大小
        fontSize: String,
        fontWeight: String,
        // 标签是否禁用
        disabled: false,
        // 标签形状,square/circle
        shape: 'square',
        // 是否选中状态
        select: false,
        // 标签是否镂空
        plain: false,
        // 标签尺寸
        size: 'medium',// large/medium/mini/super-mini
        // 图标位置,left/right
        location: 'left',
        // icon名称
        icon: String,
        // icon大小
        iconSize: '20',
        // icon颜色
        iconColor: '#3683D6',
        // 图片路径
        image: String,
        iconStyle: 'size:20;color:#3683D6',
        height: Number,
        onTabChange: (e) => console.log(e),
    },
    didMount() {
        console.log(`this.props`, this.props.fontColor);
    },
    didUpdate() {
    },
    didUnmount() {
    },
    methods: {
        handleTap() {
            if (this.props.disabled) return false;
            let options = {
                name: this.props.name,
                cell: this.props.cell,
                select: this.props.select
            };
            this._popDataChange(options);
        },

        _popDataChange(e) {
            this.props.onTabChange(e);
        }
    },
});
