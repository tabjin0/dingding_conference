/**
 * 部门业务模型
 */
import {Http} from "../../utils/http";
import {InterAction} from "../../utils/native-api/interface/interaction";

class Department {
    static async getDepartmentUserid(departmentId) {
        const useridListRes = await Http.request({
            url: `5d902668cce53`,
            data: {
                deptId: departmentId
            }
        });
        if (useridListRes.code === 1) {
            return useridListRes.data;
        } else {
            InterAction.fnShowToast('exception', `${useridListRes.msg}`, 2000);
        }
    }
}

export {
    Department
}