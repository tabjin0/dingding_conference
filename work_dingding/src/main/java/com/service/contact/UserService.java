package com.service.contact;

import com.dingtalk.api.response.*;
import com.entity.User;

import java.util.List;

/**
 * @ClassName UserService
 * @Description TODO
 * @Author tabjin
 */
public interface UserService {

    User findOne(String userId);

    User save(User user, String userId);

    /**
     * 获取用户详情
     *
     * @return
     */
    OapiUserGetResponse queryUserDetail(String accessToken,
                                        String userId,
                                        String lang);

    /**
     * 根据userid获取用户列表
     *
     * @param userIdList
     * @return
     */
    List<OapiUserGetResponse> queryUserList(List<String> userIdList);

    /**
     * TODO 获取部门用户userid列表 接口有问题
     * @param accessToken
     * @param deptId
     * @return
     */
//    OapiUserGetDeptMemberResponse getDeptMember(String accessToken, String deptId);

    /**
     * 获取部门用户
     *
     * @return
     */
    OapiUserSimplelistResponse queryDepartmentUsers(String accessToken,
                                                    String lang,
                                                    Long departmentId,
                                                    Long offset,
                                                    Long size,
                                                    String order);

    /**
     * TODO 获取部门用户详情 接口有问题
     */
//    OapiUserListbypageResponse queryDepartmentUsersDetail();

    /**
     * 获取管理员列表
     *
     * @return
     */
    OapiUserGetAdminResponse queryAdmin(String accessToken);

    /**
     * TODO 获取管理员通讯录权限范围 接口有问题
     */
//    OapiUserGetAdminScopeResponse queryAdminScope(String accessToken, String userId);

    /**
     * 根据unionid获取userid
     *
     * @return
     */
    OapiUserGetUseridByUnionidResponse queryByUnionid(String accessToken, String unionId);

    /**
     * 创建用户
     *
     * @return
     */
    OapiUserCreateResponse createUser(String accessToken, User user);

    /**
     * 更新用户
     *
     * @return
     */
    OapiUserUpdateResponse updateUser(String accessToken, User user);

    /**
     * 删除用户
     *
     * @return
     */
    OapiUserDeleteResponse deleteUser(String accessToken, String userId);
}
