package com.convert;

import com.entity.DTO.WorkNoticeDTO;
import com.entity.WorkNotice;
import org.springframework.beans.BeanUtils;

import java.util.List;
import java.util.stream.Collectors;

public class WorkNotice2WorkNoticeDTOConverter {

    public static WorkNoticeDTO convert(WorkNotice workNotice) {


        WorkNoticeDTO workNoticeDTO = new WorkNoticeDTO();

        BeanUtils.copyProperties(workNotice, workNoticeDTO);

        return workNoticeDTO;
    }

    public static List<WorkNoticeDTO> convert(List<WorkNotice> workNoticeList){
        return workNoticeList.stream()
                .map(e -> convert(e))
                .collect(Collectors.toList());
    }
}
