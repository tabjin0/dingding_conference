// components/conference/card-detail-word/index.js
Component({
    /**
     * 组件的属性列表
     */
    props: {
        title: String,// 标题
        word: String,
        imgArr: Array
    },

    options: {
        multipleSlots: true // 允许组件中使用多个slot
    },

    didUpdate(prevProps, prevData) {
        this.data.imgArr = this.props.imgArr;
    },
    /**
     * 组件的初始数据
     */
    data: {},


    /**
     * 组件的方法列表
     */
    methods: {
        /**
         * 显示图片
         * @param e
         */
        showImage(e) {
            console.log('e', e);
            let imgArr = this.data.imgArr;
            console.log('imgArr', imgArr);
            let itemIndex = e.currentTarget.dataset.id;

            dd.previewImage({
                current: itemIndex, // 当前显示图片的http链接
                urls: imgArr // 需要预览的图片http链接列表
            })
        },
    }
})
