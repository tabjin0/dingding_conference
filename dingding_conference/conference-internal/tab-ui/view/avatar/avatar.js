Component({
    mixins: [],
    data: {
        _isHaveUserNickName: false,
        _isHaveUserAvatarUrl: false,
        _iconSize: '',
        _iconColor: '#ffffff'
    },
    props: {
        icon: String,// 设置头像的图标类型
        iconColor: '#3963BC',// 设置图标的颜色
        iconSize: '28',// 设置图标的大小
        text: String,// 设置显示文本的内容
        textNameSize: 24,
        desc: String,// 设置显示描述的内容
        textDescSize: 18,
        src: String,// 显示的头像地址，支持本地或网络图片
        openData: '_initOpenData',// 显示用户和头像，参考微信开放数据
        shape: 'circle',// 设置头像形状,square、circle
        mode: 'scaleToFill',// 图片缩放裁剪模式
        size: 120,// 设置头像大小
        placement: 'right',// 文本的显示位置
        onAvatarDataChange: (e) => console.log(e),
    },
    didMount() {
    },
    didUpdate() {
    },
    didUnmount() {
    },
    methods: {
        _initOpenData: function (openData) {
            this._isHaveUserAvatarUrl(openData);
            this._isHaveUserNickName(openData)
        },

        _isHaveUserAvatarUrl(avatarUrl) {
            this.setData({
                _isHaveUserAvatarUrl: avatarUrl ? true : false
            });
        },

        _isHaveUserNickName(nickName) {
            this.setData({
                _isHaveUserNickName: nickName ? true : false
            });
        },

        tapAvatar(e) {
            this._popData(e);
        },

        _popData(e) {
            this.props.onAvatarDataChange(e);
        }
    },
});
