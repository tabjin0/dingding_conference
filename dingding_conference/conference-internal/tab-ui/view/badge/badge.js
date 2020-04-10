Component({
    mixins: [],
    data: {
        finalCount: 0,
    },
    props: {
        // 红点
        dot: false,// 是否为红点徽标
        shape: 'circle',// 徽标形状,circle/horn
        value: '0',// 徽标显示的内容
        mode: 'number',// 徽标显示的内容类型,number/text
        maxCount: 99,// 数字最大值，超过最大值时显示${max-count}+
        numberType: 'overflow',// 数字的显示方式,overflow/limit/ellipsis
        show: true,// 是否显示徽标
    },
    didMount() {
        this.finalCount();
        // console.log('didMount this:', this, 'this.props:', this.props);
    },
    didUpdate() {
        // TODO value更新导致badge更新
        this.finalCount();
        // console.log('didUpdate this:', this, 'this.props:', this.props);
    },
    didUnmount() {
    },
    methods: {
        /**
         * 最终数字
         */
        finalCount() {
            // console.log('this:', this, 'this.props:', this.props);
            if (isNaN(Number(this.props.value)) || (this.props.mode === 'text')) {
                this.setData({
                    finalCount: this.props.value
                });
            } else {
                this.switchType();
            }
        },

        /**
         * 切换状态
         */
        switchType() {
            switch (this.props.numberType) {
                case 'overflow':
                    this.setData({
                        finalCount: Number(this.props.value) > Number(this.props.maxCount) ? `${this.props.maxCount}+` : this.props.value
                    });
                    break;
                case 'ellipsis':
                    this.setData({
                        finalCount: Number(this.props.value) > Number(this.props.maxCount) ? `...` : this.props.value
                    });
                    break;
                case 'limit':
                    this.setData({
                        finalCount: Number(this.props.value) > 999 ? (Number(this.props.value) >= 9999 ? Math.floor(this.props.value / 10000 * 100) / 100 + `w` : Math.floor(this.props.value / 1000 * 100) / 100 + `k`) : this.props.value
                    });
                    break;
                default:
                    this.setData({
                        finalCount: Number(this.props.value)
                    });
                    break;
            }
        },

        /**
         * 点击事件
         */
        handleTap() {
            // TODO 抛出数据
        }
    },
});
