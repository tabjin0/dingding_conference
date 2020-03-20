import hover from "../mixins/hover";

Component({
    mixins: [hover],
    data: {
        gridItems: [],// 局部包装后的数据数组
        childNum: 0,
        currentIndex: -1,
        currentCell: -1,
    },
    props: {
        gridList: Array,
        rowNum: 3,// 每行显示的宫格数目
        showBorder: Boolean,// 控制是否显示所有的边框
        showColBorder: Boolean,// 控制是否显示横向边框
        showRowBorder: Boolean,// 控制是否显示纵向边框

        index: Number,
        key: String,// // grid-item显示所需，必填
        cell: {},// 用于存放gridItem数据
        onTabTap: (e) => console.log('Grid onTabTap e:', e),
    },
    didMount() {
        this.initGrids(this.props.gridList);
        console.log('grid didMount this.props:', this.props);
        console.log('grid didMount this.data:', this.data);
    },
    didUpdate() {
        this.initGrids(this.props.gridList);
        console.log('grid didUpdate this.data:', this.data);
    },
    didUnmount() {
    },
    methods: {
        /***
         * 初始化宫格,主要想实现若干grid-item子组件插入到grid父组件中，这边涉及到数据迁移
         * @param gridList 实际上就是若干grid-item组成的数组
         */
        initGrids(gridList) {
            // 这边由于钉钉小程序的组件通信比较讨厌，直接将grid-item整合在grid组件中，不分离了，因为拿不到若干grid-item实例对象
            // let items = this.getRelationNodes('../grid-item/grid-item');// 微信直接获取分离的关系组件，钉钉不存在这种机制
            if (this.data.childNum === gridList.length) return;
            // 这边需要包装一下，防止有的数据没有索引
            const gridItems = gridList.map((item, index) => {
                return {
                    index: index,
                    key: item.key,
                    cell: item
                };
            });
            this.setData({
                gridItems: gridItems,
                childNum: gridItems.length
            });
        },

        tapGridItem(e) {
            const { gridIndex } = e.target.dataset;
            this.setData({
                currentIndex: gridIndex,
                currentCell: this.data.gridItems[gridIndex].cell
            });
        },

        tapGrid() {
            console.log('tapGrid');
            this._popData();
        },

        /**
         * 重置宫格选择
         * @private
         */
        _resetStatus() {
            this.setData({
                currentIndex: -1,
                currentCell: -1
            })
        },

        /**
         * 抛出数据，类似微信triggerEvent
         * @private
         */
        _popData() {
            this.props.onTabTap({
                index: this.data.currentIndex,
                cell: this.data.currentCell
            })
        }

    },
});
