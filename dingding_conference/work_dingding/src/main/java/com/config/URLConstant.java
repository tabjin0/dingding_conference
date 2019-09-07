package com.config;

public class URLConstant {
    /** 钉钉网关gettoken地址 */
    public static final String URL_GET_TOKKEN = "https://oapi.dingtalk.com/gettoken";

    /** 获取用户在企业内userId的接口URL */
    public static final String URL_GET_USER_INFO = "https://oapi.dingtalk.com/user/getuserinfo";

    /** 获取用户姓名的接口url */
    public static final String URL_USER_GET = "https://oapi.dingtalk.com/user/get";

    /** 发送工作通知消息的url */
    public static final String URL_MESSAGE_SEND = "https://oapi.dingtalk.com/topapi/message/corpconversation/asyncsend_v2";

    /** 查询工作通知消息的发送进度的url */
    public static final String URL_GET_SEND_PROGRESS = "https://oapi.dingtalk.com/topapi/message/corpconversation/getsendprogress";

    /** 查询工作通知消息的发送结果的url */
    public static final String URL_GET_SEND_RESULT = "https://oapi.dingtalk.com/topapi/message/corpconversation/getsendresult";

    /** 获取部门用户userid列表 */
    public static final String URL_GET_DEPARTMENT_USERID_LIST = "https://oapi.dingtalk.com/user/getDeptMember";

    /** 屁话多机器人 */
    public static final String URL_ROBOTS_WEBHOOK = "https://oapi.dingtalk.com/robot/send?access_token=199f66dbd6099b7c610a8ef6a77cc52b520b7017b1e1a3857d84c3f625d4c1ef";


}
