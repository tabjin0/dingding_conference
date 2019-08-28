package com.service.Impl.msg;

import com.config.Constant;
import com.config.URLConstant;

import com.dingtalk.api.DefaultDingTalkClient;
import com.dingtalk.api.DingTalkClient;
import com.dingtalk.api.request.*;
import com.dingtalk.api.response.*;
import com.entity.DTO.WorkNoticeDTO;
import com.entity.WorkNotice;
import com.service.msg.MessageService;

import com.service.msg.WorkNoticeService;
import com.taobao.api.ApiException;
import com.util.AccessTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;


/**
 * @ClassName MessageServiceImpl
 * @Description TODO
 * @Author tabjin
 */
@Service
public class MessageServiceImpl implements MessageService {

    @Autowired
    private WorkNoticeService workNoticeService;

    /**
     * 发送工作通知消息
     */
    @Override
    public OapiMessageCorpconversationAsyncsendV2Response sendWorkConversation(String accessToken,
                                                                               WorkNoticeDTO workNoticeDTO) {
        // TODO 前端数据传入 text msg etc.

        DingTalkClient client = new DefaultDingTalkClient("https://oapi.dingtalk.com/topapi/message/corpconversation/asyncsend_v2");

        OapiMessageCorpconversationAsyncsendV2Request request = new OapiMessageCorpconversationAsyncsendV2Request();
        request.setAgentId(Constant.AGENT_ID);
        request.setToAllUser(true);

        OapiMessageCorpconversationAsyncsendV2Request.Msg msg = new OapiMessageCorpconversationAsyncsendV2Request.Msg();

        switch (workNoticeDTO.getMsgType()) {
            case "text":
                // 发送文本消息 ok
                msg.setMsgtype("text");
                msg.setMsgtype(workNoticeDTO.getMsgType());
                msg.setText(new OapiMessageCorpconversationAsyncsendV2Request.Text());
                msg.getText().setContent(workNoticeDTO.getText());
                request.setMsg(msg);
                break;
            case "image":
                // 发送图片消息 ok
                // TODO 前端暂时未编写image相关
                msg.setMsgtype("image");
                msg.setImage(new OapiMessageCorpconversationAsyncsendV2Request.Image());
                msg.getImage().setMediaId(workNoticeDTO.getImage());
                request.setMsg(msg);
                break;
            case "file":
                // 发送文件
                // TODO 前端暂时未编写file相关
                msg.setMsgtype("file");
                msg.setFile(new OapiMessageCorpconversationAsyncsendV2Request.File());
                // TODO 实体类添加 语音字段
//                msg.getFile().setMediaId(workNoticeDTO.get);
                request.setMsg(msg);
                break;
            case "link":
                // TODO 前端暂时未编写link相关
                msg.setMsgtype("link");
                msg.setLink(new OapiMessageCorpconversationAsyncsendV2Request.Link());
                msg.getLink().setTitle(workNoticeDTO.getTitle());
                msg.getLink().setText(workNoticeDTO.getText());
                msg.getLink().setMessageUrl(workNoticeDTO.getSingleUrl());
                msg.getLink().setPicUrl(workNoticeDTO.getImage());
                request.setMsg(msg);
                break;
            case "markdown":
                msg.setMsgtype("markdown");
                msg.setMarkdown(new OapiMessageCorpconversationAsyncsendV2Request.Markdown());
                msg.getMarkdown().setText("##### " + workNoticeDTO.getMarkdown());
                msg.getMarkdown().setTitle("### " + workNoticeDTO.getTitle());
                request.setMsg(msg);
                break;
            case "oa":
                // // TODO 前端暂时未编写oa相关
                msg.setMsgtype("oa");

                msg.setOa(new OapiMessageCorpconversationAsyncsendV2Request.OA());

                // 1. 设置 OA Head 消息头部内容
                msg.getOa().setHead(new OapiMessageCorpconversationAsyncsendV2Request.Head());
                msg.getOa().getHead().setText(workNoticeDTO.getTitle());// 消息的头部标题 (向普通会话发送时有效，向企业会话发送时会被替换为微应用的名字)，长度限制为最多10个字符
//                msg.getOa().getHead().setBgcolor(workNoticeDTO.get);// 消息头部的背景颜色。长度限制为8个英文字符，其中前2为表示透明度，后6位表示颜色值。不要添加0x

                // 2. 设置 OA Body 消息体
                msg.getOa().setBody(new OapiMessageCorpconversationAsyncsendV2Request.Body());
//                msg.getOa().getBody().setAuthor(workNoticeDTO.get);// 自定义的作者名字
                msg.getOa().getBody().setContent(workNoticeDTO.getText());// 消息体的内容，最多显示3行
//                msg.getOa().getBody().setFileCount(workNoticeDTO.get);// 定义的附件数目。此数字仅供显示，钉钉不作验证
//                msg.getOa().getBody().setForm();// 消息体的表单，最多显示6个，超过会被隐藏
                msg.getOa().getBody().setImage(workNoticeDTO.getImage());// 消息体中的图片，支持图片资源@mediaId
//                msg.getOa().getBody().setRich(workNoticeDTO.get);// 单行富文本信息
                msg.getOa().getBody().setTitle(workNoticeDTO.getTitle());// 消息体的标题

                // 3. 设置 OA 消息点击链接地址
                msg.getOa().setMessageUrl(workNoticeDTO.getSingleUrl());// 消息点击链接地址，当发送消息为E应用时支持E应用跳转链接

                // 4. 设置 OA PC端点击消息时跳转到的地址
//                msg.getOa().setPcMessageUrl(workNoticeDTO.get);// pc端点击消息时跳转的地址
                request.setMsg(msg);
                break;
            case "action_card":
                msg.setMsgtype("action_card");
                msg.setActionCard(new OapiMessageCorpconversationAsyncsendV2Request.ActionCard());
                msg.getActionCard().setTitle(String.valueOf(workNoticeDTO.getTitle()));
                msg.getActionCard().setMarkdown("### " + workNoticeDTO.getMarkdown());
                msg.getActionCard().setSingleTitle(String.valueOf(workNoticeDTO.getSingleTitle()));
                msg.getActionCard().setSingleUrl(String.valueOf(workNoticeDTO.getSingleUrl()));
                request.setMsg(msg);
                break;
        }

        OapiMessageCorpconversationAsyncsendV2Response response = null;
        try {
            response = client.execute(request, accessToken);
        } catch (ApiException e) {
            e.printStackTrace();
        }

        return response;
    }

    @Override
    public void lalala() {
        System.out.println("quartz  啦啦啦啦啦啦阿拉啦");
    }

    /**
     * 查询工作通知消息的发送进度
     * 任务执行状态，0=未开始，1=处理中，2=处理完毕
     */
    @Override
    public OapiMessageCorpconversationGetsendprogressResponse getSendProgress(Long taskId) {
        String accessToken = AccessTokenUtil.getToken();

        DingTalkClient client = new DefaultDingTalkClient(URLConstant.URL_GET_SEND_PROGRESS);
        OapiMessageCorpconversationGetsendprogressRequest request = new OapiMessageCorpconversationGetsendprogressRequest();
        request.setAgentId(Constant.AGENT_ID);
        request.setTaskId(taskId);

        OapiMessageCorpconversationGetsendprogressResponse response = null;
        try {
            response = client.execute(request, accessToken);
        } catch (ApiException e) {
            e.printStackTrace();
            return null;
        }

        return response;
    }


    /**
     * 查询工作通知消息的发送结果
     */
    @Override
    public OapiMessageCorpconversationGetsendresultResponse getSendResult(Long taskId) {
        String accessToken = AccessTokenUtil.getToken();
//        WorkNotice result = workNoticeService.findByTaskId(taskId);

        DingTalkClient client = new DefaultDingTalkClient(URLConstant.URL_GET_SEND_RESULT);
        OapiMessageCorpconversationGetsendresultRequest request = new OapiMessageCorpconversationGetsendresultRequest();
        request.setAgentId(Constant.AGENT_ID);
        request.setTaskId(taskId);

        OapiMessageCorpconversationGetsendresultResponse response = null;
        try {
            response = client.execute(request, accessToken);
        } catch (ApiException e) {
            e.printStackTrace();
            return null;
        }

        return response;
    }


    // TODO 官方api问题，没有Msg
    /** 发送普通消息 */
//    @Override
//    public OapiMessageSendToConversationResponse sendMsg2NormalUser() throws ApiException {
//        String accessToken = AccessTokenUtil.getToken();
//
//        DingTalkClient client = new DefaultDingTalkClient("https://oapi.dingtalk.com/message/send_to_conversation");
//
//        OapiMessageSendToConversationRequest req = new OapiMessageSendToConversationRequest();
//        req.setSender("01376814877479");// 消息发送者userId
//        req.setCid("14ac70d94e79377b88aa5fc75759fe84");
//        OapiMessageSendToConversationRequest.Msg msg = new OapiMessageSendToConversationRequest.Msg();
//
//        // 文本消息
//        OapiMessageSendToConversationRequest.Text text = new OapiMessageSendToConversationRequest.Text();
//        text.setContent("测试测试");
//        msg.setText(text);
//        msg.setMsgtype("text");
//        req.setMsg(msg);
//
//        // 图片
//        OapiMessageSendToConversationRequest.Image image = new OapiMessageSendToConversationRequest.Image();
//        image.setMediaId("@lADOdvRYes0CbM0CbA");
//        msg.setImage(image);
//        msg.setMsgtype("image");
//        req.setMsg(msg);
//
//        // 文件
//        OapiMessageSendToConversationRequest.File file = new OapiMessageSendToConversationRequest.File();
//        file.setMediaId("@lADOdvRYes0CbM0CbA");
//        msg.setFile(file);
//        msg.setMsgtype("file");
//        req.setMsg(msg);
//
//        OapiMessageSendToConversationRequest.Markdown markdown = new OapiMessageSendToConversationRequest.Markdown();
//        markdown.setText("# 这是支持markdown的文本 \\n## 标题2  \\n* 列表1 \\n![alt 啊](https://gw.alipayobjects.com/zos/skylark-tools/public/files/b424a1af2f0766f39d4a7df52ebe0083.png)");
//        markdown.setTitle("首屏会话透出的展示内容");
//        msg.setMarkdown(markdown);
//        msg.setMsgtype("markdown");
//        req.setMsg(msg);
//
//
//        OapiMessageSendToConversationRequest.ActionCard actionCard = new OapiMessageSendToConversationRequest.ActionCard();
//        actionCard.setTitle("是透出到会话列表和通知的文案");
//        actionCard.setMarkdown("持markdown格式的正文内");
//        actionCard.setSingleTitle("查看详情");
//        actionCard.setSingleUrl("https://open.dingtalk.com");
//        msg.setActionCard(actionCard);
//        msg.setMsgtype("action_card");
//        req.setMsg(msg);
//
//        // link消息
//        OapiMessageSendToConversationRequest.Link link = new OapiMessageSendToConversationRequest.Link();
//        link.setMessageUrl("https://www.baidu.com/");
//        link.setPicUrl("@lADOdvRYes0CbM0CbA");
//        link.setText("步扬测试");
//        link.setTitle("oapi");
//        msg.setLink(link);
//        msg.setMsgtype("link");
//        req.setMsg(msg);
//
//        OapiMessageSendToConversationResponse response = client.execute(req, accessToken);
//        return response;
//    }

    // TODO 官方api问题，没有Msg

    // TODO 官方api问题，没有Msg
    /** 发送群消息 */
//    @Override
//    public OapiChatSendResponse sendMsg2AllUsers() throws ApiException {
//        DingTalkClient client = new DefaultDingTalkClient("https://oapi.dingtalk.com/chat/send");
//        OapiChatSendRequest request = new OapiChatSendRequest();
//        request.setChatid("chat8dcf59a051e048cd791fccb5b030c1e9");
//
//        OapiChatSendRequest.Msg msg = new OapiChatSendRequest.Msg();
//        msg.setMsgtype("text");
//        OapiChatSendRequest.Text text = new OapiChatSendRequest.Text();
//        text.setContent("文本消息");
//        msg.setText(text);
//
//        request.setMsg(msg);
//        OapiChatSendResponse response = client.execute(request, AccessTokenUtil.getToken());
//        return null;
//    }

    /**
     * 查询群消息是否已读
     *
     * @param accessToken
     * @param messageId
     * @param cursor
     * @param size
     * @return
     */
    @Override
    public OapiChatGetReadListResponse queryIsRead(String accessToken, String messageId, Long cursor, Long size) {

        DingTalkClient client = new DefaultDingTalkClient("https://oapi.dingtalk.com/chat/getReadList");
        OapiChatGetReadListRequest request = new OapiChatGetReadListRequest();
        request.setHttpMethod("GET");
        request.setMessageId(messageId);
        request.setCursor(cursor);
        request.setSize(size);

        OapiChatGetReadListResponse response = null;
        try {
            response = client.execute(request, accessToken);
        } catch (ApiException e) {
            e.printStackTrace();
        }

        return response;
    }

    /**
     * 创建会话
     *
     * @param name                群名称，长度限制为1~20个字符ß
     * @param owner               群主userId，员工唯一标识ID；必须为该会话useridlist的成员之一
     * @param userIdList          群成员列表，每次最多支持40人，群人数上限为1000
     * @param showHistoryType     新成员是否可查看聊天历史消息（新成员入群是否可查看最近100条聊天记录）， 0代表否， 1代表是， 不传默认为否
     * @param searchable          群可搜索，0-默认，不可搜索，1-可搜索
     * @param validationType      入群验证，0：不入群验证（默认） 1：入群验证
     * @param mentionAllAuthority @all 权限，0-默认，所有人，1-仅群主可@all
     * @param chatBannedType      群禁言，0-默认，不禁言，1-全员禁言
     * @param managementType      管理类型，0-默认，所有人可管理，1-仅群主可管理
     * @return
     */
    @Override
    public OapiChatCreateResponse createChat(String name,
                                             String owner,
                                             String[] userIdList,
                                             Long showHistoryType,
                                             Long searchable,
                                             Long validationType,
                                             Long mentionAllAuthority,
                                             Long chatBannedType,
                                             Long managementType) {
        String accessToken = AccessTokenUtil.getToken();

        DingTalkClient client = new DefaultDingTalkClient("https://oapi.dingtalk.com/chat/create");
        OapiChatCreateRequest request = new OapiChatCreateRequest();
        request.setName(name);
        request.setOwner(owner);
        request.setUseridlist(Arrays.asList(userIdList));
        request.setShowHistoryType(showHistoryType);
        // TODO 这边传入的参数用不掉

        OapiChatCreateResponse response = null;
        try {
            response = client.execute(request, accessToken);
        } catch (ApiException e) {
            e.printStackTrace();
        }

        return response;
    }


    /**
     * 修改会话
     *
     * @param chatId
     * @param name                群名称，长度限制为1~20个字符
     * @param owner               群主userId，员工唯一标识ID；必须为该会话useridlist的成员之一
     * @param addUserIdList       添加成员列表，每次最多支持40人，群人数上限为1000
     * @param deleteUserIdList    删除成员列表，每次最多支持40人，群人数上限为1000
     * @param icon                群头像mediaid
     * @param showHistoryType     管理类型，0-默认，所有人可管理，1-仅群主可管理
     * @param chatBannedType      群禁言，0-默认，不禁言，1-全员禁言
     * @param searchable          群可搜索，0-默认，不可搜索，1-可搜索
     * @param validationType      入群验证，0：不入群验证（默认） 1：入群验证
     * @param mentionAllAuthority @all 权限，0-默认，所有人，1-仅群主可@all
     * @param managementType      新成员可查看聊天历史 0否 1是
     * @return
     */
    @Override
    public OapiChatUpdateResponse updateChat(String chatId,
                                             String name,
                                             String owner,
                                             String[] addUserIdList,
                                             String[] deleteUserIdList,
                                             String icon,
                                             Long showHistoryType,
                                             Long chatBannedType,
                                             Long searchable,
                                             Long validationType,
                                             Long mentionAllAuthority,
                                             Long managementType) {

        String accessToken = AccessTokenUtil.getToken();

        DingTalkClient client = new DefaultDingTalkClient("https://oapi.dingtalk.com/chat/update");
        OapiChatUpdateRequest request = new OapiChatUpdateRequest();
        request.setChatid(chatId);
        request.setName(name);
        request.setOwner(owner);
        request.setAddUseridlist(Arrays.asList(addUserIdList));
        request.setDelUseridlist(Arrays.asList(deleteUserIdList));

        // TODO 这边传入的参数用不掉
        OapiChatUpdateResponse response = null;
        try {
            response = client.execute(request, accessToken);
        } catch (ApiException e) {
            e.printStackTrace();
        }

        return response;
    }

    @Override
    public OapiChatGetResponse getChat(String chatId) {

        String accessToken = AccessTokenUtil.getToken();

        DingTalkClient client = new DefaultDingTalkClient("https://oapi.dingtalk.com/chat/get");
        OapiChatGetRequest request = new OapiChatGetRequest();
        request.setHttpMethod("GET");
        request.setChatid(chatId);

        OapiChatGetResponse response = null;
        try {
            response = client.execute(request, accessToken);
        } catch (ApiException e) {
            e.printStackTrace();
        }
        return response;
    }
}
