package com.service.contact;

import com.dingtalk.api.response.*;

public interface RoleService {

    /**
     * 获取角色列表
     *
     * @param size   分页大小，默认值：20，最大值200
     * @param offset 分页偏移，默认值：0
     * @return
     */
    OapiRoleListResponse queryRoleList(Long size, Long offset);

    /**
     * 获取角色下的员工列表
     *
     * @param roleId 角色ID
     * @param size   分页大小，默认值：20，最大值200
     * @param offset 分页偏移，默认值：0
     * @return
     */
    OapiRoleSimplelistResponse querySimpleList(Long roleId, Long size, Long offset);

    /**
     * 获取角色组
     *
     * @param groupId 角色组的Id
     * @return
     */
    OapiRoleGetrolegroupResponse queryRolegroup(Long groupId);

    /**
     * 获取角色详情
     * @param roleId 角色Id
     * @return
     */
    OapiRoleGetroleResponse queryRoleDetail(Long roleId);

    /***
     * 创建角色
     * @param roleName 角色名称
     * @param groupId 角色组的Id
     * @return
     */
    OapiRoleAddroleResponse addRole(String roleName, Long groupId);

    /**
     * 更新角色
     *
     * @param roleName 角色名称
     * @param groupId 角色组的Id
     * @return
     */
    OapiRoleUpdateroleResponse updateRole(String roleName, Long groupId);

    /**
     * 删除角色
     *
     * @param roleId 角色Id
     * @return
     */
    OapiRoleDeleteroleResponse deleteRole(Long roleId);

    /**
     * 创建角色组
     *
     * @param name 角色组名称
     * @return
     */
    OapiRoleAddrolegroupResponse addRoleGroup(String name);

    /**
     * 批量增加员工角色
     *
     * @param roleIds 角色id list，最大列表长度：20
     * @param userIds 员工id list，最大列表长度：100
     * @return
     */
    OapiRoleAddrolesforempsResponse addRolesForemps(String roleIds, String userIds);

    /**
     * 批量删除员工角色
     *
     * @param roleIds 角色id list，最大列表长度：20
     * @param userIds 员工id list，最大列表长度：100
     * @return
     */
    OapiRoleRemoverolesforempsResponse removeRolesForemps(String roleIds, String userIds);
}
