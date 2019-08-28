package com.service.Impl.contact;

import com.dingtalk.api.DefaultDingTalkClient;
import com.dingtalk.api.DingTalkClient;
import com.dingtalk.api.request.*;
import com.dingtalk.api.response.*;
import com.entity.Department;
import com.service.contact.DepartmentService;
import com.taobao.api.ApiException;
import com.util.AccessTokenUtil;
import org.springframework.stereotype.Service;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    @Override
    public OapiDepartmentListIdsResponse querySubDepartmentListIds(String id) {

        String accessToken = AccessTokenUtil.getToken();

        DingTalkClient client = new DefaultDingTalkClient("https://oapi.dingtalk.com/department/list_ids");
        OapiDepartmentListIdsRequest request = new OapiDepartmentListIdsRequest();
        request.setId(id);
        request.setHttpMethod("GET");

        OapiDepartmentListIdsResponse response = null;
        try {
            response = client.execute(request, accessToken);
        } catch (ApiException e) {
            e.printStackTrace();
        }

        return response;
    }

    @Override
    public OapiDepartmentListResponse queryDepartmentList(String lang, Boolean fetchChild, String id) {

        String accessToken = AccessTokenUtil.getToken();

        DingTalkClient client = new DefaultDingTalkClient("https://oapi.dingtalk.com/department/list");
        OapiDepartmentListRequest request = new OapiDepartmentListRequest();
        request.setId(id);
        request.setHttpMethod("GET");

        OapiDepartmentListResponse response = null;
        try {
            response = client.execute(request, accessToken);
        } catch (ApiException e) {
            e.printStackTrace();
        }
        return response;
    }

    @Override
    public OapiDepartmentGetResponse queryDepartmentDetail(String id, String lang) {

        String accessToken = AccessTokenUtil.getToken();

        DingTalkClient client = new DefaultDingTalkClient("https://oapi.dingtalk.com/department/get");
        OapiDepartmentGetRequest request = new OapiDepartmentGetRequest();
        request.setId(id);
        request.setHttpMethod("GET");
        OapiDepartmentGetResponse response = null;
        try {
            response = client.execute(request, accessToken);
        } catch (ApiException e) {
            e.printStackTrace();
        }
        return response;

    }

    @Override
    public OapiDepartmentListParentDeptsByDeptResponse queryDepartmentParentPath(String id) {

        String accessToken = AccessTokenUtil.getToken();

        DingTalkClient client = new DefaultDingTalkClient("https://oapi.dingtalk.com/department/list_parent_depts_by_dept");
        OapiDepartmentListParentDeptsByDeptRequest request = new OapiDepartmentListParentDeptsByDeptRequest();
        request.setId(id);
        request.setHttpMethod("GET");

        OapiDepartmentListParentDeptsByDeptResponse response = null;
        try {
            response = client.execute(request, accessToken);
        } catch (ApiException e) {
            e.printStackTrace();
        }
        return response;
    }

    @Override
    public OapiDepartmentListParentDeptsResponse queryUserParentPath(String userId) {

        String accessToken = AccessTokenUtil.getToken();

        DingTalkClient client = new DefaultDingTalkClient("https://oapi.dingtalk.com/department/list_parent_depts");
        OapiDepartmentListParentDeptsRequest request = new OapiDepartmentListParentDeptsRequest();
        request.setUserId(userId);
        request.setHttpMethod("GET");

        OapiDepartmentListParentDeptsResponse response = null;
        try {
            response = client.execute(request, accessToken);
        } catch (ApiException e) {
            e.printStackTrace();
        }
        return response;
    }

    @Override
    public OapiUserGetOrgUserCountResponse queryOrgUserCount(Long onlyActive) {

        String accessToken = AccessTokenUtil.getToken();

        DingTalkClient client = new DefaultDingTalkClient("https://oapi.dingtalk.com/user/get_org_user_count");
        OapiUserGetOrgUserCountRequest request = new OapiUserGetOrgUserCountRequest();
        request.setOnlyActive(onlyActive);
        request.setHttpMethod("GET");

        OapiUserGetOrgUserCountResponse response = null;
        try {
            response = client.execute(request, accessToken);
        } catch (ApiException e) {
            e.printStackTrace();
        }

        return response;
    }

    @Override
    public OapiDepartmentCreateResponse createDepartment(Department department) {

        String accessToken = AccessTokenUtil.getToken();

        DingTalkClient client = new DefaultDingTalkClient("https://oapi.dingtalk.com/department/create");
        OapiDepartmentCreateRequest request = new OapiDepartmentCreateRequest();
        request.setParentid(department.getParentId());
        request.setCreateDeptGroup(true);
        request.setOrder(department.getOrder());
        request.setName(department.getName());
        OapiDepartmentCreateResponse response = null;
        try {
            response = client.execute(request, accessToken);
        } catch (ApiException e) {
            e.printStackTrace();
        }
        return response;
    }

    @Override
    public OapiDepartmentUpdateResponse updateDepartment(Department department) {

        String accessToken = AccessTokenUtil.getToken();

        DingTalkClient client = new DefaultDingTalkClient("https://oapi.dingtalk.com/department/update");
        OapiDepartmentUpdateRequest request = new OapiDepartmentUpdateRequest();
        request.setId(Long.valueOf(department.getId()));
        request.setParentid(department.getParentId());
        request.setOrder(department.getOrder());
        request.setName(department.getName());

        OapiDepartmentUpdateResponse response = null;
        try {
            response = client.execute(request, accessToken);
        } catch (ApiException e) {
            e.printStackTrace();
        }
        return response;
    }


    @Override
    public OapiDepartmentDeleteResponse deleteDepartment(String id) {

        String accessToken = AccessTokenUtil.getToken();

        DingTalkClient client = new DefaultDingTalkClient("https://oapi.dingtalk.com/department/delete");
        OapiDepartmentDeleteRequest request = new OapiDepartmentDeleteRequest();
        request.setId(id);
        request.setHttpMethod("GET");

        OapiDepartmentDeleteResponse response = null;
        try {
            response = client.execute(request, accessToken);
        } catch (ApiException e) {
            e.printStackTrace();
        }
        return response;
    }
}
