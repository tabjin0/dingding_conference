/**
 * 初始化当前用户党支部信息
 */

import {Department} from "../../model/department/department";
import {DepartmentInit} from "../../components/department/DepartmentInit";
import {Caching} from "../../utils/native-api/caching/caching";

class InitPartyBranchInfo {
    static async initPartyBranch() {
        const departmentList = await Department.getDepartmentList();
        const departmentInit = new DepartmentInit(departmentList, Caching.getStorageSync('department'));
        return departmentInit.init();
    }
}

export {
    InitPartyBranchInfo
}