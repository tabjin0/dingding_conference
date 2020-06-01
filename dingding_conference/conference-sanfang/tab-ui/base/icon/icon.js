Component({
    mixins: [],
    data: {
        default: {
            size: 40,
            color: '#45526B'
        }
    },
    props: {
        name: String,
        color: String,
        activeColor: String,
        isActive: false,
        size: String,
    },
    didMount() {
        if (!this.props.name) {
            console.error('请传入Icon组件的name属性');
        }
    },
    didUpdate() {
        if (!this.props.name) {
            console.error('请传入Icon组件的name属性');
        }
    },
    didUnmount() {
    },
    methods: {
        tapIcon() {

        }
    },
});
