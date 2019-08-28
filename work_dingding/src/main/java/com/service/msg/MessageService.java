package com.service.msg;

import com.dingtalk.api.response.*;
import com.entity.DTO.WorkNoticeDTO;
import com.taobao.api.ApiException;

/**
 * @ClassName MessageService
 * @Description
 * @Author tabjin
 */
public interface MessageService {

    /**
     * 发送工作通知消息
     */
    OapiMessageCorpconversationAsyncsendV2Response sendWorkConversation(String accessToken,
                                                                        WorkNoticeDTO workNoticeVO);

    void lalala();

//    OapiMessageCorpconversationAsyncsendV2Response sendWorkConversation(String accessToken);

    /**
     * 查询工作通知消息的发送进度
     */
    OapiMessageCorpconversationGetsendprogressResponse getSendProgress(Long taskId);

    /**
     * 查询工作通知消息的发送结果
     */
    OapiMessageCorpconversationGetsendresultResponse getSendResult(Long taskId);

    /** 发送普通消息 */
//    OapiMessageSendToConversationResponse sendMsg2NormalUser(String userId, String cid, Msg msg);

    /** 发送群消息 */
//    OapiChatSendResponse sendMsg2AllUsers(String accessToken, String chatId, Msg msg);

    /**
     * 查询群消息已读人员列表
     */
    OapiChatGetReadListResponse queryIsRead(String accessToken, String messageId, Long cursor, Long size);

    /**
     * 创建会话
     *
     * @param name                群名称，长度限制为1~20个字符
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
    OapiChatCreateResponse createChat(String name,
                                      String owner,
                                      String[] userIdList,
                                      Long showHistoryType,
                                      Long searchable,
                                      Long validationType,
                                      Long mentionAllAuthority,
                                      Long chatBannedType,
                                      Long managementType);

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
    OapiChatUpdateResponse updateChat(String chatId,
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
                                      Long managementType);

    /**
     * 获取会话
     *
     * @param chatId 群会话的id
     * @return
     */
    OapiChatGetResponse getChat(String chatId);


}
