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

    /**
     * 组件的初始数据
     */
    data: {
        title: String
    },

    /**
     * 属性监听器
     */
    observers: {
        'title': function (title) {
        }
    },


    /**
     * 组件的方法列表
     */
    methods: {

    }
})
