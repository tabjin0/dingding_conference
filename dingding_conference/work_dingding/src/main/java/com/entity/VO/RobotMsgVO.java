package com.entity.VO;

import lombok.Data;


@Data
public class RobotMsgVO {

    private String id;

    /** 消息类型 */
    private String msgType;

    /** 消息内容 */
    private String content;

    /** 被@人的手机号(在content里添加@人的手机号) */
    private String atMobiles;

    /** 所有人时：true，否则为：false */
    private Boolean isAtAll;

    /** 消息标题 */
    private String title;

    /** 消息内容。如果太长只会部分展示 */
    private String text;

    /** 点击消息跳转的URL */
    private String messageUrl;

    /** 图片URL */
    private String picUrl;

    /** 单个按钮的方案。(设置此项和singleURL后btns无效) */
    private String singleTitle;

    /** 点击singleTitle按钮触发的URL */
    private String singleUrl;

    /** 0-按钮竖直排列，1-按钮横向排列 */
    private String btnOrientation;

    /** 0-正常发消息者头像，1-隐藏发消息者头像 */
    private String hideAvatar;
}
