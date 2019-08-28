package com.controller;

import com.config.Constant;
import com.dingtalk.api.DefaultDingTalkClient;
import com.dingtalk.api.DingTalkClient;
import com.dingtalk.api.request.OapiCspaceAddRequest;
import com.dingtalk.api.request.OapiCspaceGetCustomSpaceRequest;
import com.dingtalk.api.request.OapiCspaceGrantCustomSpaceRequest;
import com.dingtalk.api.request.OapiFileUploadSingleRequest;
import com.dingtalk.api.response.OapiCspaceAddResponse;
import com.dingtalk.api.response.OapiCspaceGetCustomSpaceResponse;
import com.dingtalk.api.response.OapiCspaceGrantCustomSpaceResponse;
import com.dingtalk.api.response.OapiFileUploadSingleResponse;
import com.taobao.api.ApiException;
import com.taobao.api.FileItem;
import com.taobao.api.internal.util.WebUtils;
import com.util.AccessTokenUtil;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/dingPlate")
public class DingPlateController {

    /**
     * 获取企业下的自定义空间
     *
     * @return
     */
    @RequestMapping(value = "/getCustomSpace", method = RequestMethod.POST)
    @ResponseBody
    public OapiCspaceGetCustomSpaceResponse getCustomSpace(String domain) throws ApiException {
        String accessToken = AccessTokenUtil.getToken();
        DingTalkClient client = new DefaultDingTalkClient("https://oapi.dingtalk.com/cspace/get_custom_space");
        OapiCspaceGetCustomSpaceRequest request = new OapiCspaceGetCustomSpaceRequest();
        request.setAgentId("284263775");
//        request.setDomain("test");
        request.setDomain(domain);
        request.setHttpMethod("GET");
        OapiCspaceGetCustomSpaceResponse response = client.execute(request, accessToken);
        return response;
    }

    /**
     * 授权用户访问企业自定义空间
     *
     * @return
     * @throws ApiException
     */
    @RequestMapping(value = "/grantCustomSpace", method = RequestMethod.GET)
    @ResponseBody
    public OapiCspaceGrantCustomSpaceResponse grantCustomSpace(@RequestParam(value = "agent_id", required = false) String agentId,
                                                               @RequestParam(value = "domain", required = false) String domain,
                                                               @RequestParam(value = "type", required = true) String type,
                                                               @RequestParam(value = "userid", required = false) String userId,
                                                               @RequestParam(value = "path", required = false) String path,
                                                               @RequestParam(value = "fileids", required = false) String fileids,
                                                               @RequestParam(value = "duration", required = false) String duration) throws ApiException {
        String accessToken = AccessTokenUtil.getToken();
        DingTalkClient client = new DefaultDingTalkClient("https://oapi.dingtalk.com/cspace/grant_custom_space");
        OapiCspaceGrantCustomSpaceRequest request = new OapiCspaceGrantCustomSpaceRequest();
        request.setAgentId(Constant.AGENT_ID);
        request.setDomain(domain);
        request.setType(type);// 权限类型，目前支持上传和下载，上传请传add，下载请传download
        request.setUserid("1219441916791739");// 进进id
        request.setPath("/");// 授权访问的路径，如授权访问所有文件传"/"，授权访问/doc文件夹传"/doc/"，需要utf-8 urlEncode, type=add时必须传递
        request.setDuration(10000L);
        request.setHttpMethod("GET");
        OapiCspaceGrantCustomSpaceResponse response = client.execute(request, accessToken);
        return response;
    }


    @RequestMapping(value = "/singleUpload", method = RequestMethod.POST)
    public OapiFileUploadSingleResponse singleUpload() throws IOException {
        String accessToken = AccessTokenUtil.getToken();

        OapiFileUploadSingleRequest request = new OapiFileUploadSingleRequest();
        request.setFileSize(1000L);
        request.setAgentId(Constant.AGENT_ID);
        DingTalkClient client = new DefaultDingTalkClient("https://oapi.dingtalk.com/file/upload/single?" + WebUtils.buildQuery(request.getTextParams(), "utf-8"));
        // 必须重新new一个请求
        request = new OapiFileUploadSingleRequest();
        request.setFile(new FileItem("C:\\Users\\tabjin\\Desktop\\82695F691C5D0E00.png"));


        OapiFileUploadSingleResponse response = null;
        try {
            response = client.execute(request, accessToken);
        } catch (ApiException e) {
            e.printStackTrace();
        }
        return response;
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public OapiCspaceAddResponse add() {
        String accessToken = AccessTokenUtil.getToken();
        DingTalkClient client = new DefaultDingTalkClient("https://oapi.dingtalk.com/cspace/add");
        OapiCspaceAddRequest request = new OapiCspaceAddRequest();
        request.setAgentId(Constant.AGENT_ID);
        request.setCode("bbaf549201bd3c54ac4f4af1b13e0a1b");
        request.setMediaId("#iAEHAqRmaWxlA6h5dW5kaXNrMATOCw_SkgXNB74GzNYHzl1mPG8IzgAB3Wo");
        request.setSpaceId("1837002072");
        request.setFolderId("0");
        request.setName("test");
        request.setOverwrite(true);
        request.setHttpMethod("GET");
        OapiCspaceAddResponse response = null;
        try {
            response = client.execute(request,accessToken);
        } catch (ApiException e) {
            e.printStackTrace();
        }
        return response;
    }
}
