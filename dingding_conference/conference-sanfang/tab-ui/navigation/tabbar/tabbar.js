Component({
    mixins: [],
    data: {
        tabBar: [],
        childNum: 0,
        currentIndex: -1,
        currentCell: null,
        localList: []
    },
    props: {
        list: Array,// tabBar数组数组
        color: "#808080",// 默认颜色
        activeColor: "#49a9ee",// 选中颜色
        backgroundColor: "#F5F5F8",
        onTabChange: (e) => console.log(e),
    },
    didMount() {
        // if (!this.props.list) {
        //     console.log('tabbar组件数据异常');
        // }
        // console.log(`didMount:`, this.props.list)
        // this.initTabBar(this.props.list);
    },
    didUpdate() {
        if (!this.props.list) {
            console.log('tabbar组件数据异常');
        }
        // console.log(`disupdate:`, this.props.list)
        this.initTabBar(this.props.list);
    },
    didUnmount() {
    },
    methods: {
        initTabBar(list) {
            if (this.data.childNum == list.length) return;
            const tabBar = list.map((item, index) => {
                return {
                    index: index,
                    cell: item
                }
            });
            this.setData({
                tabBar: tabBar,
                childNum: tabBar.length
            });
        },

        tapTabBarItem(e) {
            const {tabBarIndex} = e.target.dataset;
            if (tabBarIndex === undefined) {
                console.log('点击单个item没有抓取到index');
            } else {
                this.setData({
                    currentIndex: tabBarIndex,
                    currentCell: this.data.tabBar[tabBarIndex].cell,
                });
            }
            // console.log('currentIndex', this.data.currentIndex);
            // TODO 处理操作相关，例如页面跳转，将具体逻辑操作抛给页面来做
            this._popData(tabBarIndex);
        },

        _resetStatus() {
            this.setData({
                currentIndex: -1,
                currentCell: -1
            })
        },

        _popData(e) {
            this.props.onTabChange(e);
        }
    }
});
