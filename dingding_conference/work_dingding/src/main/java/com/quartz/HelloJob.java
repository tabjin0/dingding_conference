package com.quartz;

import org.quartz.*;

import java.text.SimpleDateFormat;
import java.util.Date;

public class HelloJob implements Job {
    @Override
    public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {
        // 打印当前的执行时间，格式为2019-04-01 00:00:00
        Date date = new Date();
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        System.out.println("当前exec时间为：" + sf.format(date));
        // 编写具体的业务逻辑
        System.out.println("猪猪猪");

        // 获取JobDetail实例的名字和组名
        JobKey jobKey = jobExecutionContext.getJobDetail().getKey();
        System.out.println("jobDetail 名字和组名：" + jobKey.getName() + ":" + jobKey.getGroup());

        // 获取Trigger实例的名字和组名
        TriggerKey triggerKey = jobExecutionContext.getTrigger().getKey();
        System.out.println("trigger 名字和组名：" + triggerKey.getName() + ":" + triggerKey.getGroup());

        // 获取两个实例 jobDetail和trigger 的data
//        JobDataMap jobDetailDataMap = jobExecutionContext.getJobDetail().getJobDataMap();
//        JobDataMap triggerDataMap = jobExecutionContext.getTrigger().getJobDataMap();
//        String jobMsg = jobDetailDataMap.getString("message");
//        Float floatJobValue = jobDetailDataMap.getFloat("floatJobValue");
//        String triggerMsg = triggerDataMap.getString("message");
//        Double doubleTrigger = triggerDataMap.getDouble("doubleTrigger");

        JobDataMap dataMap = jobExecutionContext.getMergedJobDataMap();// 将jobDetail和trigger合并dataMap
        Float floatJobValue = dataMap.getFloat("floatJobValue");
        Double doubleTrigger = dataMap.getDouble("doubleTrigger");
        String msg = dataMap.getString("message");
        System.out.println("msg : " + msg);
        System.out.println("floatJobValue : " + floatJobValue);
        System.out.println("doubleTrigger : " + doubleTrigger);

        // TODO 获取到未读消息人员的id列表，然后针对这些人员进行消息重发。PS：因为钉钉工作消息通知限定一天只能发三次，此处重发将会针对个人重发
        //
    }
}
