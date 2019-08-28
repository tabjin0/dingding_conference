package com.service.contact;

import com.dingtalk.api.response.*;
import com.entity.Department;

public interface DepartmentService {

    /**
     * 获取子部门ID列表
     *
     * @param id
     * @return
     */
    OapiDepartmentListIdsResponse querySubDepartmentListIds(String id);

    /**
     * 获取部门列表
     *
     * @param lang
     * @param fetchChild
     * @param id
     * @return
     */
    OapiDepartmentListResponse queryDepartmentList(String lang, Boolean fetchChild, String id);

    /**
     * 获取部门详情
     *
     * @param id
     * @param lang
     * @return
     */
    OapiDepartmentGetResponse queryDepartmentDetail(String id, String lang);

    /**
     * 查询部门的所有上级父部门路径
     *
     * @param id
     * @return
     */
    OapiDepartmentListParentDeptsByDeptResponse queryDepartmentParentPath(String id);

    /**
     * 查询指定用户的所有上级父部门路径
     *
     * @param userId
     * @return
     */
    OapiDepartmentListParentDeptsResponse queryUserParentPath(String userId);

    /**
     * 获取企业员工人数
     *
     * @param onlyActive 0：包含未激活钉钉的人员数量,1：不包含未激活钉钉的人员数量
     * @return
     */
    OapiUserGetOrgUserCountResponse queryOrgUserCount(Long onlyActive);

    // TODO 创建部门
    OapiDepartmentCreateResponse createDepartment(Department department);


    // TODO 更新部门
    OapiDepartmentUpdateResponse updateDepartment(Department department);

    // TODO 删除部门
    OapiDepartmentDeleteResponse deleteDepartment(String id);


}
