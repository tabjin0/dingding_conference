Component({
    mixins: [],
    data: {},
    props: {
        now: '',
        onTabRealmChange: (e) => console.log(e),
    },
    didMount() {
    },
    didUpdate() {
    },
    didUnmount() {
    },
    methods: {
        button() {
            console.log(`button`);
            this._popData({
                money: this.data.money ? this.data.money : 50,
                base: this.data.base ? this.data.base : 4,
                payable: this.data.payable ? this.data.payable : 30,
            });
        },

        _popData(e) {
            this.props.onTabRealmChange(e);
        },

        onInputBlur1(e) {
            console.log(`realm onInputBlur`, e);
            this.setData({
                money: e
            });
        },

        onInputBlur2(e) {
            this.setData({
                base: e
            });
        },

        onInputBlur3(e) {
            this.setData({
                payable: e
            });
        }
    },
});
