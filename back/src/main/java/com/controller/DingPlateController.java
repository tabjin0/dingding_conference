package com.controller;

import com.config.Constant;
import com.dingtalk.api.DefaultDingTalkClient;
import com.dingtalk.api.DingTalkClient;
import com.dingtalk.api.request.OapiCspaceGetCustomSpaceRequest;
import com.dingtalk.api.request.OapiCspaceGrantCustomSpaceRequest;
import com.dingtalk.api.response.OapiCspaceGetCustomSpaceResponse;
import com.dingtalk.api.response.OapiCspaceGrantCustomSpaceResponse;
import com.taobao.api.ApiException;
import com.util.AccessTokenUtil;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dingPlate")
public class DingPlateController {

    /**
     * 获取企业下的自定义空间
     * @return
     */
    @RequestMapping(value = "/getCustomSpace", method = RequestMethod.GET)
    public OapiCspaceGetCustomSpaceResponse getCustomSpace() throws ApiException {
        String accessToken = AccessTokenUtil.getToken();
        DingTalkClient client = new DefaultDingTalkClient("https://oapi.dingtalk.com/cspace/get_custom_space");
        OapiCspaceGetCustomSpaceRequest request = new OapiCspaceGetCustomSpaceRequest();
        request.setAgentId("284263775");
        request.setDomain("test");
        request.setHttpMethod("GET");
        OapiCspaceGetCustomSpaceResponse response = client.execute(request,accessToken);
        return response;
    }

    /**
     * 授权用户访问企业自定义空间
     * @return
     * @throws ApiException
     */
    @RequestMapping(value = "/grantCustomSpace", method = RequestMethod.GET)
    public OapiCspaceGrantCustomSpaceResponse grantCustomSpace() throws ApiException {
        String accessToken = AccessTokenUtil.getToken();
        DingTalkClient client = new DefaultDingTalkClient("https://oapi.dingtalk.com/cspace/grant_custom_space");
        OapiCspaceGrantCustomSpaceRequest request = new OapiCspaceGrantCustomSpaceRequest();
        request.setAgentId(Constant.AGENT_ID);
        request.setDomain("test");
        request.setType("add");// 权限类型，目前支持上传和下载，上传请传add，下载请传download
        request.setUserid("1219441916791739");// 进进id
        request.setPath("/");// 授权访问的路径，如授权访问所有文件传"/"，授权访问/doc文件夹传"/doc/"，需要utf-8 urlEncode, type=add时必须传递
        request.setDuration(10000L);
        request.setHttpMethod("GET");
        OapiCspaceGrantCustomSpaceResponse response = client.execute(request,accessToken);
        return response;
    }


}
