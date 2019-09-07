package com.service.Impl.msg;

import com.entity.WorkNotice;
import com.repository.WorkNoticeRepository;

import com.service.msg.WorkNoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkNoticeServiceImpl implements WorkNoticeService {

    @Autowired
    private WorkNoticeRepository workNoticeRepository;


    @Override
    public WorkNotice save(WorkNotice workNotice) {
        WorkNotice result = workNoticeRepository.save(workNotice);
        return result;
    }

//    @Override
//    public WorkNotice findByTaskId(String workNoticeId) {
//        WorkNotice result = workNoticeRepository.findOne(workNoticeId);
//        return result;
//    }

    @Override
    public WorkNotice findByWorkNoticeId(String workNoticeId) {
        WorkNotice result = workNoticeRepository.findOne(workNoticeId);
        return result;
    }


    @Override
    public List<WorkNotice> querySendMsgList() {
        // TODO 后期完善分页查询
        List<WorkNotice> workNoticePage = workNoticeRepository.findAll();

        // TODO

        List<WorkNotice> resultList = workNoticeRepository.findAll();
        return resultList;
    }

}
