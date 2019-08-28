package com.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
public class Chat {
    @Id
    private String id;

    /** 群名称，长度限制为1~20个字符*/
    @Column(name = "chat_id")
    private String chatId;

    /** 这是啥 */
    @Column(name = "agent_id_list")
    private String agentIdList;

    /** 这是啥 */
    @Column(name = "extid_list")
    private String extidList;

    /**
     * 会话名称
     */
    private String name;

    /** 群主userId，员工唯一标识ID；必须为该会话useridlist的成员之一 */
    private String owner;

    /** 群头像mediaid */
    private String icon;

    /** 群成员列表，每次最多支持40人，群人数上限为1000 */
    @Column(name = "user_id_list")
    private String userIdList;

    /** 新成员是否可查看聊天历史消息（新成员入群是否可查看最近100条聊天记录）， 0代表否， 1代表是， 不传默认为否 */
    @Column(name = "show_history_type")
    private Boolean showHistoryType;

    /**
     * 入群验证，0：不入群验证（默认） 1：入群验证
     */
    @Column(name = "validation_type")
    private Boolean validationType;

    /** 这是啥 */
    @Column(name = "conversation_tag")
    private Integer conversationTag;

    /** @all 权限，0-默认，所有人，1-仅群主可@all */
    @Column(name = "mentionAllAuthority")
    private Boolean mentionallauthority;

    /** 群可搜索，0-默认，不可搜索，1-可搜索 */
    private Boolean searchable;

    /** 新成员可查看聊天历史 0否 1是 */
    @Column(name = "management_type")
    private Boolean managementType;
}