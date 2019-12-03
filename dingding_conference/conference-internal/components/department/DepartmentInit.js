/**
 * 部门信息加载模型
 */
class DepartmentInit {
    departmentList;// 党委下党支部（部门）列表
    currentDepartmentId;// 当前用户的部门Id

    constructor(departmentList, currentDepartmentId) {
        this.departmentList = departmentList;
        this.currentDepartmentId = currentDepartmentId;
    }

    /**
     *
     * @returns {string|*}
     */
    init() {
        return this._findDepartment(this.currentDepartmentId);
    }

    /**
     * 在departmentList中查找是否存在部门，若存在，返回部门名称
     * @param departmentId 当前部门Id
     * @returns {string|*} 与当前用户相同部门的部门名称
     * @private
     */
    _findDepartment(departmentId) {
        // this.departmentList.forEach(department => {})
        const existed = this.departmentList.some(department => {
            return department.id === departmentId;
        });
        if (existed) {
            return this.departmentList.find(department => department.id === departmentId);
        }
    }
}

export {
    DepartmentInit
}