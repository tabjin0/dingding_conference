package com.service.robots;

import com.dingtalk.api.response.OapiRobotSendResponse;
import com.entity.RobotMsg;
import com.entity.VO.RobotMsgVO;
import com.taobao.api.ApiException;


public interface RobotsService {

    /** 通过机器人发送消息 */
    OapiRobotSendResponse robotSendMsg(RobotMsgVO robotMsgVO) throws ApiException;

    OapiRobotSendResponse testRobotSendMsg();

    /** 保存机器人发送的消息 */
    RobotMsg save(RobotMsg robotMsg);
}
