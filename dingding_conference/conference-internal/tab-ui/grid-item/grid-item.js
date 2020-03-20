Component({
    mixins: [],
    data: {
        index: 0
    },
    props: {
        key: String,// grid-item显示所需，必填
        cell: {// 用于存放gridItem数据
            type: Object,
            value: {}
        },
        onTabItemTap: (e) => console.log(e),

    },
    didMount() {
    },
    didUpdate() {
    },
    didUnmount() {
    },
    methods: {
        tapGridItem() {
            // 将数据抛出
            // 微信端通过this.triggerEvent传递
            // 钉钉端通过props使用on开头函数传递
            this._setDataChange();
        },

        //
        _setDataChange() {
            this.props.onTabItemTap();
        }
    },
});
