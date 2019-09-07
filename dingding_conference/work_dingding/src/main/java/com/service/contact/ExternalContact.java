package com.service.contact;

import com.dingtalk.api.response.*;
import com.entity.Contact;

/**
 * 通讯录 -> 外部联系人
 */
public interface ExternalContact {

    /**
     * 获取外部联系人标签列表
     *
     * @param size
     * @param offset
     * @return
     */
    OapiExtcontactListlabelgroupsResponse listLabel(Long size, Long offset);

    /**
     * 获取外部联系人列表
     *
     * @param size
     * @param offset
     * @return
     */
    OapiExtcontactListResponse list(Long size, Long offset);

    /**
     * 获取企业外部联系人详情
     *
     * @param userId
     * @return
     */
    OapiExtcontactGetResponse orgExternalContact(String userId);

    /**
     * 添加外部联系人
     *
     * @param contact
     * @return
     */
    OapiExtcontactCreateResponse addExternalContact(Contact contact);

    /**
     * 更新外部联系人
     *
     * @param contact
     * @return
     */
    OapiExtcontactUpdateResponse updateExternalContact(Contact contact);

    /**
     * 删除外部联系人
     *
     * @param userId
     * @return
     */
    OapiExtcontactDeleteResponse deleteExternalContact(String userId);
}
