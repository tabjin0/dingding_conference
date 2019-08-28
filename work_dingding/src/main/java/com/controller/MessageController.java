package com.controller;

import com.dingtalk.api.response.*;
import com.entity.Chat;
import com.entity.Msg;
import com.entity.DTO.WorkNoticeDTO;
import com.entity.VO.WorkNoticeVO;
import com.entity.WorkNotice;
import com.google.gson.Gson;
import com.service.msg.ChatService;
import com.service.msg.MessageService;
import com.service.msg.WorkNoticeService;
import com.taobao.api.ApiException;
import com.util.AccessTokenUtil;
import com.util.JsonUtils;
import com.util.ServiceResult;
import com.util.idworker.Sid;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.InvocationTargetException;
import java.util.*;


/**
 * 企业内部E应用工作通知消息
 *
 * @ClassName MessageController
 * @Description TODO
 * @Author tabjin
 */
@RestController
@Api(value = "消息发送接口", tags = {"消息发送的controller"})
// TODO 添加controller 的路由
public class MessageController {

    @Autowired
    private MessageService messageService;

    @Autowired
    private WorkNoticeService workNoticeService;

    @Autowired
    private ChatService chatService;

    @Autowired
    private Sid sid;

    /**
     * OK
     * 发送工作通知消息，每天只能发送3次
     *
     * @param
     * @return
     */
    @ApiOperation(value = "01 发送工作通知消息 ok", notes = "发送工作通知消息的接口")
    @ApiImplicitParam(paramType = "query", value = "params", name = "params", dataType = "String", defaultValue = "{\"msgType\":\"text\",\"text\":\"嘿，小白\"}")
    @RequestMapping(value = "/sendWorkMsg", method = RequestMethod.POST, produces = "application/json;charset=utf-8;")
    @ResponseBody
    public ServiceResult sendWorkMessage(@RequestBody String params)
            throws InvocationTargetException, IllegalAccessException {

        // 前端传入的json字符串 -> 对象
        WorkNoticeDTO workNoticeDTO = JsonUtils.jsonToPojo(params, WorkNoticeDTO.class);

        Gson gson = new Gson();
        WorkNoticeVO vo = gson.fromJson(params, WorkNoticeVO.class);

        // 1. 获取access_token
        String accessToken = AccessTokenUtil.getToken();


        // 2. 调用api -> 消息会被发送至钉钉工作通知
        OapiMessageCorpconversationAsyncsendV2Response response =
                messageService.sendWorkConversation(accessToken, workNoticeDTO);


        ServiceResult serviceResult = ServiceResult.success(response);

        // 3. 获取到数据之后，处理主表相关，保存至数据库
        Map<String, String> paramsMap = response.getParams();

        List<Map<String, String>> mapList = new ArrayList<>();
        mapList.add(paramsMap);
        Iterator<Map.Entry<String, String>> it = paramsMap.entrySet().iterator();
        while (it.hasNext()) {
            Map.Entry<String, String> entry = it.next();
            System.out.println(entry.getKey() + ":" + entry.getValue());
            // it.remove(); 删除元素ß
        }


        WorkNotice workNotice = new WorkNotice();
        BeanUtils.copyProperties(workNotice, workNoticeDTO);
        // 遍历map<key, value>中的key，如果bean中有这个属性，就把这个key对应的value值赋给bean的属性
        BeanUtils.populate(workNotice, paramsMap);

        workNotice.setId(sid.nextShort());
        workNotice.setTaskId(response.getTaskId());
        workNotice.setMsgId(sid.nextShort());
        workNotice.setToAllUser(Boolean.getBoolean(paramsMap.get("to_all_user")));
        workNotice.setAgentId(Long.valueOf(paramsMap.get("agent_id")));
        workNoticeDTO.setTaskId(response.getTaskId());

        // 4. 提取msg，json字符串转对象
        Msg msg = gson.fromJson(workNotice.getMsg(), Msg.class);
        System.out.println(msg);
        System.out.println("====================");
        System.out.println(workNoticeDTO);


        // 5. 保存
        workNoticeService.save(workNotice);

        return serviceResult;
    }


    /**
     * 从数据库中查询发送消息列表
     * ok
     *
     * @return
     */
    @ApiOperation(value = "02 自定义 从数据库中查询发送消息列表 ok", notes = "从数据库中查询发送消息列表的接口")
    @RequestMapping(value = "/getSendMsgList", method = RequestMethod.GET)
    @ResponseBody
    public List<WorkNotice> getSendMsgList() {

        List<WorkNotice> workNoticeList = workNoticeService.querySendMsgList();

        return workNoticeList;
    }


    /**
     * 查询工作通知消息的发送进度
     * 任务执行状态，0=未开始，1=处理中，2=处理完毕
     *
     * @return
     */
    @ApiOperation(value = "03 查询工作通知消息的发送进度 ok", notes = "查询工作通知消息的发送进度的接口，可先调用查询发送消息列表的接口获取一个存在的taskId, 任务执行状态，0=未开始，1=处理中，2=处理完毕")
    @ApiImplicitParam(paramType = "query", value = "taskId", name = "taskId", dataType = "long", required = true, defaultValue = "31639413694")
    @RequestMapping(value = "/getSendProgress", method = RequestMethod.GET)
    @ResponseBody
    public ServiceResult getSendProgress(@RequestParam(value = "taskId") Long taskId) {

        OapiMessageCorpconversationGetsendprogressResponse response = messageService.getSendProgress(taskId);
        ServiceResult serviceResult = ServiceResult.success(response);
        return serviceResult;
    }

    /**
     * ok
     * 查询工作通知消息的发送结果
     * 提供access_token(后端直接获取) 和 taskId(数据库中查询)
     *
     * @return
     * @throws ApiException
     */
    @ApiOperation(value = "04 查询工作通知消息的发送结果 ok", notes = "查询工作通知消息的发送结果的接口")
    @ApiImplicitParam(paramType = "query", value = "taskId", name = "taskId", dataType = "long", required = true, defaultValue = "31639413694")
    @RequestMapping(value = "/getSendResult", method = RequestMethod.GET)
    @ResponseBody
    public ServiceResult getSendResult(@RequestParam(value = "taskId") Long taskId) {
        OapiMessageCorpconversationGetsendresultResponse response = messageService.getSendResult(taskId);
        ServiceResult serviceResult = ServiceResult.success(response);
        return serviceResult;
    }

    /**
     * 发送普通消息
     *
     * @return
     */
    @ApiOperation(value = "05 发送普通消息 api有问题", notes = "发送普通消息的接口")
    @ApiImplicitParams({
            @ApiImplicitParam(paramType = "query", name = "sender", value = "消息发送者 userId", required = true, dataType = "String", defaultValue = "1219441916791739"),
            @ApiImplicitParam(paramType = "query", name = "cid", value = "群消息或者个人聊天会话Id，(通过JSAPI的dd.chooseChatForNormalMsg接口唤起联系人界面选择之后即可拿到会话ID，之后您可以使用获取到的cid调用此接口）", required = true, dataType = "String")
            // TODO Msg实体类添加swagger的注解
    })
    @RequestMapping(value = "/sendNormalMsg", method = RequestMethod.POST)
    @ResponseBody
    public ServiceResult sendNormalMsg(@RequestParam(value = "sender") String sender,
                                       @RequestParam(value = "cid") String cid,
                                       @RequestBody Msg msg) {
        //  TODO 编写service
        return null;
    }

    /**
     * 发送群消息
     *
     * @return
     */
    @ApiOperation(value = "06 发送群消息 api有问题", notes = "发送群消息的接口")
    @ApiImplicitParams({
            @ApiImplicitParam(paramType = "query", name = "chatId", value = "群会话的id，可以在调用创建群会话接口的返回结果里面获取，也可以通过dd.chooseChat获取", required = true, dataType = "String")
    })
    @RequestMapping(value = "/sendGroupMsg", method = RequestMethod.POST)
    @ResponseBody
    public ServiceResult sendGroupMsg(@RequestParam(value = "chatId") String chatId,
                                      @RequestBody Msg msg) {
        // TODO 编写service
        return null;
    }

    /**
     * 查询群消息已读人员列表
     *
     * @return
     */
    @ApiOperation(value = "07 查询群消息已读人员列表 ok", notes = "查询群消息已读人员列表的接口，需要群消息接口正常使用")
    @ApiImplicitParams({
            @ApiImplicitParam(paramType = "query", name = "messageId", dataType = "string", required = true, value = "发送群消息接口返回的加密消息id"),
            @ApiImplicitParam(paramType = "query", name = "cursor", dataType = "long", required = true, value = "分页查询的游标，第一次可以传0，后续传返回结果中的next_cursor的值。当返回结果中，没有next_cursor时，表示没有后续的数据了，可以结束调用"),
            @ApiImplicitParam(paramType = "query", name = "size", dataType = "long", required = true, value = "分页查询的大小，最大可以传100")
    })
    @RequestMapping(value = "/getGroupMsgIsRead", method = RequestMethod.GET)
    @ResponseBody
    public ServiceResult getGroupMsgIsRead(@RequestParam(value = "messageId") String messageId,
                                           @RequestParam(value = "cursor") Long cursor,
                                           @RequestParam(value = "size") Long size) {

        String accessToken = AccessTokenUtil.getToken();

        OapiChatGetReadListResponse response = messageService.queryIsRead(accessToken, messageId, cursor, size);

        ServiceResult result = ServiceResult.success(response);

        return result;
    }

    /**
     * 创建会话
     * TODO 将会话保存至数据库
     *
     * @return
     */
    @ApiOperation(value = "08 创建会话 ok", notes = "创建会话的接口, 相同会话可以创建多次")
    @ApiImplicitParams({
            @ApiImplicitParam(paramType = "query", name = "name", dataType = "String", required = true, defaultValue = "小猪小猪", value = "群名称，长度限制为1~20个字符"),
            @ApiImplicitParam(paramType = "query", name = "owner", dataType = "String", required = true, defaultValue = "1219441916791739", value = "群主userId，员工唯一标识ID；必须为该会话useridlist的成员之一"),
            @ApiImplicitParam(paramType = "query", name = "userIdList", dataType = "String", required = true, defaultValue = "2435413912641959,2632311132739520,2459211509-783403757,2632311133732864,2632324207668145", value = "群成员列表，每次最多支持40人，群人数上限为1000"),
            @ApiImplicitParam(paramType = "query", name = "showHistoryType", dataType = "long", required = false, defaultValue = "0", value = "新成员是否可查看聊天历史消息（新成员入群是否可查看最近100条聊天记录）， 0代表否， 1代表是， 不传默认为否"),
            @ApiImplicitParam(paramType = "query", name = "searchable", dataType = "long", required = false, defaultValue = "0", value = "群可搜索，0-默认，不可搜索，1-可搜索"),
            @ApiImplicitParam(paramType = "query", name = "validationType", dataType = "long", required = false, defaultValue = "0", value = "入群验证，0：不入群验证（默认） 1：入群验证"),
            @ApiImplicitParam(paramType = "query", name = "mentionAllAuthority", dataType = "long", required = false, defaultValue = "0", value = "@all 权限，0-默认，所有人，1-仅群主可@all"),
            @ApiImplicitParam(paramType = "query", name = "chatBannedType", dataType = "long", required = false, defaultValue = "0", value = "群禁言，0-默认，不禁言，1-全员禁言"),
            @ApiImplicitParam(paramType = "query", name = "managementType", dataType = "long", required = false, defaultValue = "0", value = "管理类型，0-默认，所有人可管理，1-仅群主可管理")
    })
    @RequestMapping(value = "/createChat", method = RequestMethod.POST)
    @ResponseBody
    public ServiceResult createChat(@RequestParam(value = "name", required = true) String name,
                                    @RequestParam(value = "owner", required = true) String owner,
                                    @RequestParam(value = "userIdList", required = true) String userIdList,
                                    @RequestParam(value = "showHistoryType", required = false, defaultValue = "0") Long showHistoryType,
                                    @RequestParam(value = "searchable", required = false, defaultValue = "0") Long searchable,
                                    @RequestParam(value = "validationType", required = false, defaultValue = "0") Long validationType,
                                    @RequestParam(value = "mentionAllAuthority", required = false, defaultValue = "0") Long mentionAllAuthority,
                                    @RequestParam(value = "chatBannedType", required = false, defaultValue = "0") Long chatBannedType,
                                    @RequestParam(value = "managementType", required = false, defaultValue = "0") Long managementType) {

        // String -> Array
        String[] str = userIdList.split(",");

        // 调用api
        OapiChatCreateResponse response = messageService.createChat(name, owner, str, showHistoryType, searchable, validationType, mentionAllAuthority, chatBannedType, managementType);

        ServiceResult result = ServiceResult.success(response);

        // 将创建的会话信息保存至数据库
        // 1. 获取创建的会话的信息
        Chat chat = new Chat();
        org.springframework.beans.BeanUtils.copyProperties(response, chat);

        // 取response.param的值
        Map<String, String> paramsMap = response.getParams();
        List<Map<String, String>> mapList = new ArrayList<>();
        mapList.add(paramsMap);
        Iterator<Map.Entry<String, String>> it = paramsMap.entrySet().iterator();
        while (it.hasNext()) {
            Map.Entry<String, String> entry = it.next();
            System.out.println(entry.getKey() + ":" + entry.getValue());
        }

        chat.setId(sid.nextShort());
        chat.setChatId(response.getChatid());
        chat.setConversationTag(Math.toIntExact(response.getConversationTag()));
        chat.setName(paramsMap.get("name"));
        chat.setOwner(paramsMap.get("owner"));
        chat.setUserIdList(paramsMap.get("useridlist"));
        chat.setShowHistoryType(Boolean.valueOf(paramsMap.get("showHistoryType")));
        chat.setExtidList(paramsMap.get("extidlist"));

        // 2. 保存信息

        chatService.save(chat);
        return result;
    }

    /**
     * 修改会话
     * TODO 有点问题 查询企业员工不存在 可能测试的用户不在企业内
     *
     * @return
     */
    @ApiOperation(value = "09 修改会话 查询企业员工不存在", notes = "修改会话的接口")
    @ApiImplicitParams({
            @ApiImplicitParam(paramType = "query", name = "chatId", dataType = "String", required = true, defaultValue = "chat38aa9e81532dc986ec3448616257f0d7", value = "群会话的id"),
            @ApiImplicitParam(paramType = "query", name = "name", dataType = "String", required = false, defaultValue = "小猪小猪", value = "群名称，长度限制为1~20个字符"),
            @ApiImplicitParam(paramType = "query", name = "owner", dataType = "String", required = false, defaultValue = "1219441916791739", value = "群主userId，员工唯一标识ID；必须为该会话useridlist的成员之一"),
            @ApiImplicitParam(paramType = "query", name = "addUserIdList", dataType = "String", required = false, defaultValue = "2632324207668145", value = "添加成员列表，每次最多支持40人，群人数上限为1000"),
            @ApiImplicitParam(paramType = "query", name = "deleteUserIdList", dataType = "String", required = false, defaultValue = "null", value = "删除成员列表，每次最多支持40人，群人数上限为1000"),
            @ApiImplicitParam(paramType = "query", name = "icon", dataType = "String", required = false, defaultValue = "null", value = "群头像mediaid"),
            @ApiImplicitParam(paramType = "query", name = "showHistoryType", dataType = "long", required = false, defaultValue = "0", value = "新成员是否可查看聊天历史消息（新成员入群是否可查看最近100条聊天记录）， 0代表否， 1代表是， 不传默认为否"),
            @ApiImplicitParam(paramType = "query", name = "searchable", dataType = "long", required = false, defaultValue = "0", value = "群可搜索，0-默认，不可搜索，1-可搜索"),
            @ApiImplicitParam(paramType = "query", name = "validationType", dataType = "long", required = false, defaultValue = "0", value = "入群验证，0：不入群验证（默认） 1：入群验证"),
            @ApiImplicitParam(paramType = "query", name = "mentionAllAuthority", dataType = "long", required = false, defaultValue = "0", value = "@all 权限，0-默认，所有人，1-仅群主可@all"),
            @ApiImplicitParam(paramType = "query", name = "chatBannedType", dataType = "long", required = false, defaultValue = "0", value = "群禁言，0-默认，不禁言，1-全员禁言"),
            @ApiImplicitParam(paramType = "query", name = "managementType", dataType = "long", required = false, defaultValue = "0", value = "管理类型，0-默认，所有人可管理，1-仅群主可管理")
    })
    @RequestMapping(value = "/updateChat", method = RequestMethod.POST)
    @ResponseBody
    public ServiceResult updateChat(@RequestParam(value = "chatId", required = true) String chatId,
                                    @RequestParam(value = "name", required = false) String name,
                                    @RequestParam(value = "owner", required = false) String owner,
                                    @RequestParam(value = "addUserIdList", required = false) String addUserIdList,
                                    @RequestParam(value = "deleteUserIdList", required = false) String deleteUserIdList,
                                    @RequestParam(value = "icon", required = false) String icon,
                                    @RequestParam(value = "showHistoryType", required = false, defaultValue = "0") Long showHistoryType,
                                    @RequestParam(value = "searchable", required = false, defaultValue = "0") Long searchable,
                                    @RequestParam(value = "validationType", required = false, defaultValue = "0") Long validationType,
                                    @RequestParam(value = "mentionAllAuthority", required = false, defaultValue = "0") Long mentionAllAuthority,
                                    @RequestParam(value = "chatBannedType", required = false, defaultValue = "0") Long chatBannedType,
                                    @RequestParam(value = "managementType", required = false, defaultValue = "0") Long managementType) {

        // 调用api
        OapiChatUpdateResponse response = messageService.updateChat(chatId, name, owner, addUserIdList.split(","), deleteUserIdList.split(","), icon, showHistoryType, searchable, validationType, mentionAllAuthority, chatBannedType, managementType);

        // TODO 添加成员列表和删除成员列表不能有交集
        ServiceResult result = ServiceResult.success(response);
        return result;
    }

    /**
     * 获取会话
     *
     * @return
     */
    @ApiOperation(value = "10 获取会话 ok", notes = "获取会话的接口")
    @ApiImplicitParam(paramType = "query", name = "chatId", dataType = "string", required = true, defaultValue = "chat38aa9e81532dc986ec3448616257f0d7", value = "群会话的id")
    @RequestMapping(value = "/getChat", method = RequestMethod.GET)
    @ResponseBody
    public ServiceResult getChat(@RequestParam(value = "chatId") String chatId) {

        OapiChatGetResponse response = messageService.getChat(chatId);

        ServiceResult result = ServiceResult.success(response);
        return result;
    }


}
