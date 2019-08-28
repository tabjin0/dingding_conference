package com.service.Impl.contact;

import com.dingtalk.api.DefaultDingTalkClient;
import com.dingtalk.api.DingTalkClient;
import com.dingtalk.api.request.*;
import com.dingtalk.api.response.*;
import com.entity.User;
import com.repository.UserRepository;
import com.service.contact.UserService;
import com.taobao.api.ApiException;
import com.util.AccessTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * @ClassName UserServiceImpl
 * @Description TODO
 * @Author tabjin
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;


    @Override
    public User findOne(String userId) {
        return userRepository.findOne(userId);
    }

    @Override
    public User save(User user, String userId) {
        User result = null;
        try {
            result = userRepository.save(user);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }


    /**
     * 获取用户详情
     *
     * @param accessToken
     * @param userId
     * @param lang
     * @return
     */
    @Override
    public OapiUserGetResponse queryUserDetail(String accessToken, String userId, String lang) {

        DingTalkClient client = new DefaultDingTalkClient("https://oapi.dingtalk.com/user/get");
        OapiUserGetRequest request = new OapiUserGetRequest();
        request.setUserid(userId);
        request.setHttpMethod("GET");

        OapiUserGetResponse response = null;
        try {
            response = client.execute(request, accessToken);
        } catch (ApiException e) {
            e.printStackTrace();
        }

        return response;
    }

    /**
     * 根据userid获取用户列表
     *
     * @param userIdList
     * @return
     */
    @Override
    public List<OapiUserGetResponse> queryUserList(List<String> userIdList) {
        String accessToken = AccessTokenUtil.getToken();

        DingTalkClient client = new DefaultDingTalkClient("https://oapi.dingtalk.com/user/get");
        OapiUserGetResponse response = null;
        List<OapiUserGetResponse> responseList = new ArrayList<>();
        for (String userId : userIdList) {
            OapiUserGetRequest request = new OapiUserGetRequest();
            request.setUserid(userId);
            request.setHttpMethod("GET");

            try {
                response = client.execute(request, accessToken);
                responseList.add(response);
            } catch (ApiException e) {
                e.printStackTrace();
            }
        }

        return responseList;
    }

    /**
     * 获取部门用户
     *
     * @param accessToken
     * @param lang
     * @param departmentId
     * @param offset
     * @param size
     * @param order
     * @return
     */
    @Override
    public OapiUserSimplelistResponse queryDepartmentUsers(String accessToken,
                                                           String lang,
                                                           Long departmentId,
                                                           Long offset,
                                                           Long size,
                                                           String order) {

        DingTalkClient client = new DefaultDingTalkClient("https://oapi.dingtalk.com/user/simplelist");
        OapiUserSimplelistRequest request = new OapiUserSimplelistRequest();
        request.setDepartmentId(departmentId);// 100L
        request.setOffset(offset);// 0L
        request.setSize(size);// 10L
        request.setHttpMethod("GET");

        OapiUserSimplelistResponse response = null;
        try {
            response = client.execute(request, accessToken);
        } catch (ApiException e) {
            e.printStackTrace();
        }
        return response;

    }

    /**
     * 获取管理员列表
     *
     * @param accessToken
     * @return
     */
    @Override
    public OapiUserGetAdminResponse queryAdmin(String accessToken) {

        DingTalkClient client = new DefaultDingTalkClient("https://oapi.dingtalk.com/user/get_admin");
        OapiUserGetAdminRequest request = new OapiUserGetAdminRequest();
        request.setHttpMethod("GET");

        OapiUserGetAdminResponse response = null;
        try {
            response = client.execute(request, accessToken);
        } catch (ApiException e) {
            e.printStackTrace();
        }
        return response;
    }

    /**
     * 根据unionid获取userid
     *
     * @param accessToken
     * @param unionId
     * @return
     */
    @Override
    public OapiUserGetUseridByUnionidResponse queryByUnionid(String accessToken, String unionId) {
        DingTalkClient client = new DefaultDingTalkClient("https://oapi.dingtalk.com/user/getUseridByUnionid");
        OapiUserGetUseridByUnionidRequest request = new OapiUserGetUseridByUnionidRequest();
        request.setUnionid(unionId);// "M9Ar4MVQA4vk4iPRwIJdTXAiEiE"
        request.setHttpMethod("GET");

        OapiUserGetUseridByUnionidResponse response = null;
        try {
            response = client.execute(request, accessToken);

        } catch (ApiException e) {
            e.printStackTrace();
        }
        return response;
    }

    /**
     * 创建用户
     *
     * @param accessToken
     * @param user
     * @return
     */
    @Override
    public OapiUserCreateResponse createUser(String accessToken, User user) {
        DingTalkClient client = new DefaultDingTalkClient("https://oapi.dingtalk.com/user/create");
        OapiUserCreateRequest request = new OapiUserCreateRequest();
        request.setUserid(user.getUserId());// "zhangsan"
        request.setMobile(user.getMobile());// "17700000010"
        request.setName(user.getName());// "name_test"

// 需要用字符串， "[59869009,60345027]" 这种格式
//        List<Long> departments = new ArrayList<Long>();
//        departments.add(100L);
//        departments.add(200L);
//        request.setDepartment(JSON.toJSONString(departments));
        request.setDepartment(user.getDepartment());

        OapiUserCreateResponse response = null;
        try {
            response = client.execute(request, accessToken);
        } catch (ApiException e) {
            e.printStackTrace();
        }

        return response;
    }

    /**
     * 更新用户
     *
     * @param accessToken
     * @param user
     * @return
     */
    @Override
    public OapiUserUpdateResponse updateUser(String accessToken, User user) {
        DingTalkClient client = new DefaultDingTalkClient("https://oapi.dingtalk.com/user/update");
        OapiUserUpdateRequest request = new OapiUserUpdateRequest();
        request.setUserid(user.getUserId());// "zhangsan"
        request.setName(user.getName());// "name_test"

        OapiUserUpdateResponse response = null;
        try {
            response = client.execute(request, accessToken);
        } catch (ApiException e) {
            e.printStackTrace();
        }

        return response;
    }

    /**
     * 删除用户
     *
     * @param accessToken
     * @param userId
     * @return
     */
    @Override
    public OapiUserDeleteResponse deleteUser(String accessToken, String userId) {
        DingTalkClient client = new DefaultDingTalkClient("https://oapi.dingtalk.com/user/delete");
        OapiUserDeleteRequest request = new OapiUserDeleteRequest();
        request.setUserid(userId);// "zhangsan"
        request.setHttpMethod("GET");

        OapiUserDeleteResponse response = null;
        try {
            response = client.execute(request, accessToken);
        } catch (ApiException e) {
            e.printStackTrace();
        }

        return response;
    }
}
