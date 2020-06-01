Component({
    mixins: [],
    data: {},
    props: {
        label: '',// 表单标题
        hideLabel: false,// 是否隐藏label
        labelCustom: false,// 是否自定义label部分
        showRow: true,// 是否显示下划线
        required: false,// 是否必选
        placeholder: '',// 占位文本
        type: 'text',// 输入框文本
        colon: false,// 是否需要冒号
        focus: false,// 获取焦点
        clear: false,// 是否清除按钮
        maxLength: 140,// 最大输入长度
        width: 750,// 表单项的宽度
        labelWidth: 200,// 表单项标题部分的宽度
        labelLayout: 'left',// label标题的显示位置
        disabled: false,// 是否禁用
        placeholderStyle: '',// 占位文字样式
        onInputChange: (e) => console.log(e),
        onInputFocus: (e) => console.log(e),
        onInputBlur: (e) => console.log(e),
        onInputClear: (e) => console.log(e),
    },
    didMount() {
    },
    didUpdate() {
    },
    didUnmount() {
    },
    methods: {
        handleInputChange(e) {
            const {
                detail = {}
            } = e;
            const {
                value = ''
            } = detail;
            this.setData({
                value
            });

            this._popDataInput(e.detail);
        },
        handleInputConfirm() {

        },

        handleInputFocus() {
        },

        handleInputBlur(e) {
            console.log(`handleInputBlur`, e.detail.value);
        },

        onClearTap(event) {
            this.setData({
                value: ''
            });
            // this.triggerEvent('linclear', event.detail);
            this._popDataClear(event.detail);
        },

        _popDataInput(e) {
            this.props.onInputChange(e);
        },

        _popDataFocus(e) {
            this.props.onInputChange(e);
        },

        _popDataClear(e) {
            this.props.onInputClear(e);
        },

        _popData() {

        }
    },
});
