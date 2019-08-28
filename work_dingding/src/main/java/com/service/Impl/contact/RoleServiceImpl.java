package com.service.Impl.contact;

import com.dingtalk.api.DefaultDingTalkClient;
import com.dingtalk.api.DingTalkClient;
import com.dingtalk.api.request.OapiRoleGetrolegroupRequest;
import com.dingtalk.api.request.OapiRoleListRequest;
import com.dingtalk.api.request.OapiRoleSimplelistRequest;
import com.dingtalk.api.response.*;
import com.service.contact.RoleService;
import com.util.AccessTokenUtil;
import org.springframework.stereotype.Service;

@Service
public class RoleServiceImpl implements RoleService {

    @Override
    public OapiRoleListResponse queryRoleList(Long size, Long offset) {
        String accessToken = AccessTokenUtil.getToken();

        DingTalkClient client = new DefaultDingTalkClient("https://oapi.dingtalk.com/topapi/role/list");
        OapiRoleListRequest request = new OapiRoleListRequest();
        request.setOffset(size);// 分页偏移，默认值：0
        request.setSize(offset);// 分页大小，默认值：20，最大值200

        OapiRoleListResponse response = null;
        try {
            response = client.execute(request, accessToken);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return response;
    }

    @Override
    public OapiRoleSimplelistResponse querySimpleList(Long roleId, Long size, Long offset) {
        String accessToken = AccessTokenUtil.getToken();

        DingTalkClient client = new DefaultDingTalkClient("https://oapi.dingtalk.com/topapi/role/simplelist");
        OapiRoleSimplelistRequest request = new OapiRoleSimplelistRequest();
        request.setRoleId(roleId);
        request.setOffset(offset);
        request.setSize(size);

        OapiRoleSimplelistResponse response = null;
        try {
            response = client.execute(request, accessToken);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return response;
    }

    @Override
    public OapiRoleGetrolegroupResponse queryRolegroup(Long groupId) {
        String accessToken = AccessTokenUtil.getToken();

        DingTalkClient client = new DefaultDingTalkClient("https://oapi.dingtalk.com/topapi/role/getrolegroup");
        OapiRoleGetrolegroupRequest request = new OapiRoleGetrolegroupRequest();
        request.setGroupId(149507737L);

        OapiRoleGetrolegroupResponse response = null;
        try {
            response = client.execute(request, accessToken);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return response;

    }

    @Override
    public OapiRoleGetroleResponse queryRoleDetail(Long roleId) {
        return null;
    }

    @Override
    public OapiRoleAddroleResponse addRole(String roleName, Long groupId) {
        return null;
    }

    @Override
    public OapiRoleUpdateroleResponse updateRole(String roleName, Long groupId) {
        return null;
    }

    @Override
    public OapiRoleDeleteroleResponse deleteRole(Long roleId) {
        return null;
    }

    @Override
    public OapiRoleAddrolegroupResponse addRoleGroup(String name) {
        return null;
    }

    @Override
    public OapiRoleAddrolesforempsResponse addRolesForemps(String roleIds, String userIds) {
        return null;
    }

    @Override
    public OapiRoleRemoverolesforempsResponse removeRolesForemps(String roleIds, String userIds) {
        return null;
    }
}
