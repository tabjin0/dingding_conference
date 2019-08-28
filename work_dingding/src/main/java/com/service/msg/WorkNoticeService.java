package com.service.msg;

import com.entity.WorkNotice;

import java.util.List;

/**
 * 涉及到工作通知的保存之类
 */
public interface WorkNoticeService {

    WorkNotice save(WorkNotice workNotice);

//    WorkNotice findByTaskId(Long TaskId);

    WorkNotice findByWorkNoticeId(String workNoticeId);

    /**
     * 查询消息发送列表
     * TODO 分页
     */
    List<WorkNotice> querySendMsgList();
}