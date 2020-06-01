/**
 * 部门业务模型
 */
import { Http } from "../../utils/http";
import { InterAction } from "../../utils/native-api/interface/interaction";
import { PageUrlConstant } from "../../config/pageUrlConstant";
import { ApiUrlConstant } from "../../config/ApiUrlConstant";

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

    /**
     * 获取部门列表
     * @returns {Promise<*>}
     */
    static async getDepartmentList(orgId) {
        const res = await Http.request({
            url: `${ApiUrlConstant.DEPARTMENT}`,
            data: {
                orgId: orgId
            }
        });
        if (res.code === 1) {
            return res.data;
        } else {
            console.log('获取部门列表失败');
        }
    }
}

export {
    Department
}