package com.service.Impl.robot;

import com.config.URLConstant;
import com.dingtalk.api.DefaultDingTalkClient;
import com.dingtalk.api.DingTalkClient;
import com.dingtalk.api.request.OapiRobotSendRequest;
import com.dingtalk.api.response.OapiRobotSendResponse;
import com.entity.RobotMsg;
import com.entity.VO.RobotMsgVO;
import com.repository.RobotMsgRepository;
import com.service.robots.RobotsService;
import com.taobao.api.ApiException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;


@Service
public class RobotsServiceImpl implements RobotsService {

    @Autowired
    private RobotMsgRepository robotMsgRepository;

    @Override
    public OapiRobotSendResponse robotSendMsg(RobotMsgVO robotMsgVO){
        String WebHook = URLConstant.URL_ROBOTS_WEBHOOK;

        DingTalkClient client = new DefaultDingTalkClient(WebHook);
        OapiRobotSendRequest request = new OapiRobotSendRequest();

        switch (robotMsgVO.getMsgType()) {
            case "text":
                request.setMsgtype("text");
                OapiRobotSendRequest.Text text = new OapiRobotSendRequest.Text();
                text.setContent(robotMsgVO.getText());
                request.setText(text);
                OapiRobotSendRequest.At at = new OapiRobotSendRequest.At();
                at.setAtMobiles(Arrays.asList(robotMsgVO.getAtMobiles()));
                request.setAt(at);
                break;
            case "link":
                request.setMsgtype("link");
                OapiRobotSendRequest.Link link = new OapiRobotSendRequest.Link();
                link.setMessageUrl(robotMsgVO.getMessageUrl());
                link.setPicUrl(robotMsgVO.getPicUrl());
                link.setTitle(robotMsgVO.getTitle());
//                link.setText("这个即将发布的新版本，创始人陈航（花名“无招”）称它为“红树林”。\n" +
//                        "而在此之前，每当面临重大升级，产品经理们都会取一个应景的代号，这一次，为什么是“红树林");
                link.setText(robotMsgVO.getText());
                request.setLink(link);
                break;
            case "markdown":
                request.setMsgtype("markdown");
                OapiRobotSendRequest.Markdown markdown = new OapiRobotSendRequest.Markdown();
                markdown.setTitle(robotMsgVO.getTitle());
//                markdown.setText("#### 杭州天气 @156xxxx8827\n" +
//                        "> 9度，西北风1级，空气良89，相对温度73%\n\n" +
//                        "> ![screenshot](https://gw.alipayobjects.com/zos/skylark-tools/public/files/84111bbeba74743d2771ed4f062d1f25.png)\n" +
//                        "> ###### 10点20分发布 [天气](http://www.thinkpage.cn/) \n");
                markdown.setText(robotMsgVO.getText());
                request.setMarkdown(markdown);
                break;
            case "actionCard":
                request.setMsgtype("actionCard");
                OapiRobotSendRequest.Actioncard actioncard = new OapiRobotSendRequest.Actioncard();
                actioncard.setTitle(robotMsgVO.getTitle());
                actioncard.setText(robotMsgVO.getText());
                actioncard.setSingleTitle(robotMsgVO.getSingleTitle());
                actioncard.setSingleURL(robotMsgVO.getSingleUrl());
                actioncard.setBtnOrientation(robotMsgVO.getBtnOrientation());
                actioncard.setHideAvatar(robotMsgVO.getHideAvatar());
                request.setActionCard(actioncard);
                break;
            // TODO feedcard接口有问题，只能传入link
//            case "feedCard":
//                request.setMsgtype("feedCard");
//                OapiRobotSendRequest.Feedcard feedcard = new OapiRobotSendRequest.Feedcard();
//                feedcard.setLinks();
//                break;
        }




        OapiRobotSendResponse response = null;
        try {
            response = client.execute(request);
        } catch (ApiException e) {
            e.printStackTrace();
        }


        return response;
    }

    @Override
    public OapiRobotSendResponse testRobotSendMsg() {
        String WebHook = URLConstant.URL_ROBOTS_WEBHOOK;

        DingTalkClient client = new DefaultDingTalkClient(WebHook);
        OapiRobotSendRequest request = new OapiRobotSendRequest();

        request.setMsgtype("markdown");
        OapiRobotSendRequest.Markdown markdown = new OapiRobotSendRequest.Markdown();
        markdown.setTitle("杭州天气");
        markdown.setText("#### 杭州天气 @156xxxx8827\n" +
                "> 9度，西北风1级，空气良89，相对温度73%\n\n" +
                "> ![screenshot](https://gw.alipayobjects.com/zos/skylark-tools/public/files/84111bbeba74743d2771ed4f062d1f25.png)\n"  +
                "> ###### 10点20分发布 [天气](http://www.thinkpage.cn/) \n");
        request.setMarkdown(markdown);


        OapiRobotSendResponse response = null;
        try {
            response = client.execute(request);
        } catch (ApiException e) {
            e.printStackTrace();
        }


        return response;
    }

    @Override
    public RobotMsg save(RobotMsg robotMsg) {
        return robotMsgRepository.save(robotMsg);
    }
}
