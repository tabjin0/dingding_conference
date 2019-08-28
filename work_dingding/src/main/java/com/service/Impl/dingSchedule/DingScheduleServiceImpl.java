package com.service.Impl.dingSchedule;

import com.dingtalk.api.DefaultDingTalkClient;
import com.dingtalk.api.DingTalkClient;
import com.dingtalk.api.request.OapiCalendarCreateRequest;
import com.dingtalk.api.response.OapiCalendarCreateResponse;
import com.service.dingSchedule.DingScheduleService;
import com.taobao.api.ApiException;
import com.util.AccessTokenUtil;
import org.springframework.stereotype.Service;


import java.util.Arrays;

@Service
public class DingScheduleServiceImpl implements DingScheduleService {
    @Override
    public OapiCalendarCreateResponse createDingSchedule() {

        String accessToken = AccessTokenUtil.getToken();
        DingTalkClient client = new DefaultDingTalkClient("https://oapi.dingtalk.com/topapi/calendar/create");
        OapiCalendarCreateRequest request = new OapiCalendarCreateRequest();
        OapiCalendarCreateRequest.OpenCalendarCreateVo creatVo = new OapiCalendarCreateRequest.OpenCalendarCreateVo();
        creatVo.setUuid("123456");
        creatVo.setBizId("test123");
        creatVo.setCreatorUserid("1226682231742708");
        creatVo.setSummary("测试日历创建");
        creatVo.setReceiverUserids(Arrays.asList("01376814877479"));
        OapiCalendarCreateRequest.DatetimeVo start = new OapiCalendarCreateRequest.DatetimeVo();
        start.setUnixTimestamp(System.currentTimeMillis() - 10000);
        creatVo.setStartTime(start);
        OapiCalendarCreateRequest.DatetimeVo end = new OapiCalendarCreateRequest.DatetimeVo();
        end.setUnixTimestamp(System.currentTimeMillis());
        creatVo.setEndTime(end);
        creatVo.setCalendarType("notification");
        OapiCalendarCreateRequest.OpenCalendarSourceVo source = new OapiCalendarCreateRequest.OpenCalendarSourceVo();
        source.setTitle("招聘");
        source.setUrl("http://www.dingtalk.com/page=xxx");
        creatVo.setSource(source);
        request.setCreateVo(creatVo);

        OapiCalendarCreateResponse response = null;
        try {
            response = client.execute(request, accessToken);
        } catch (ApiException e) {
            e.printStackTrace();
        }
        return response;
    }
}
