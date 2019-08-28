package com.controller;

import com.dingtalk.api.response.OapiCalendarCreateResponse;
import com.service.dingSchedule.DingScheduleService;
import com.util.ServiceResult;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
@Api(value = "Ding日程", tags = {"Ding日程的controller"})
@RequestMapping(value = "/ding")
public class DingScheduleController {

    @Autowired
    private DingScheduleService dingScheduleService;

    @ApiOperation(value = "创建Ding日程", notes = "创建Ding日程的接口")
    @RequestMapping(value = "/schedule", method = RequestMethod.POST, produces = "application/json;charset=utf-8;")
    public ServiceResult dingSchedule() {

        OapiCalendarCreateResponse response = dingScheduleService.createDingSchedule();

        ServiceResult result = ServiceResult.success(response);
        return result;
    }
}
