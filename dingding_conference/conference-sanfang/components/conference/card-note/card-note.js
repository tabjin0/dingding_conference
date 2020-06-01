import { Navigate } from "../../../utils/native-api/interface/navigate";
import { PageUrlConstant } from "../../../config/pageUrlConstant";

Component({
  mixins: [],
  data: {},
  props: {
    dataList: Object,
  },
  didMount() { },
  didUpdate() { },
  didUnmount() { },
  methods: {

    toNoteEdit(e) {
      // Navigate.navigateTo(`${PageUrlConstant.conferenceNoteEdit}?note=` + JSON.stringify(e.currentTarget.dataset.note));
    }
  },
});
