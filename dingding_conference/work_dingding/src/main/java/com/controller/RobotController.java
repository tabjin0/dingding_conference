package com.controller;

import com.dingtalk.api.response.OapiRobotSendResponse;
import com.entity.RobotMsg;
import com.entity.VO.RobotMsgVO;
import com.google.gson.Gson;
import com.service.robots.RobotsService;
import com.taobao.api.ApiException;
import com.util.ServiceResult;
import com.util.idworker.Sid;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.InvocationTargetException;

@Api(value = "群机器人", tags = "群机器人的controller")
@RestController
public class RobotController {

    @Autowired
    private RobotsService robotsService;

    @Autowired
    private Sid sid;

    @ApiOperation(value = "01 机器人发消息 ok", notes = "机器人发消息的接口")
    @RequestMapping(value = "/robot", method = RequestMethod.POST, produces = "application/json;charset=utf-8;")
    @ResponseBody
    public ServiceResult robotSendMsg(@RequestBody String params) throws InvocationTargetException, IllegalAccessException, ApiException {

        // json字符串 -> 对象
        Gson gson = new Gson();
        RobotMsgVO robotMsgVO = gson.fromJson(params, RobotMsgVO.class);

        // 2. 调用api -> 消息会被机器人发送至钉钉
        OapiRobotSendResponse response = robotsService.robotSendMsg(robotMsgVO);
        ServiceResult serviceResult = ServiceResult.success(response);

        // 3. 获取到数据之后，处理主表相关，保存至数据库
        RobotMsg robotMsg = new RobotMsg();
        BeanUtils.copyProperties(robotMsg, robotMsgVO);
        robotMsg.setId(sid.nextShort());

        robotsService.save(robotMsg);
        return serviceResult;
    }
}
