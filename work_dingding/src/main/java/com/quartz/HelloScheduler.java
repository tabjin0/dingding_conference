package com.quartz;

import org.quartz.*;
import org.quartz.impl.StdSchedulerFactory;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;

@Component
public class HelloScheduler {
    public static void main(String[] args) throws SchedulerException {
        // 创建一个JobDetail实例，将该实例与HelloJob Class绑定
        JobDetail jobDetail = JobBuilder.newJob(HelloJob.class)
                .withIdentity("myJob", "group1")
                .usingJobData("message", "笨笨detail")
                .usingJobData("floatJobValue", 3.141F)
                .build();

        // 创建Trigger实例，定义该Job立即执行，并且每个两秒钟重复一次
        Trigger trigger = TriggerBuilder.newTrigger()
                .withIdentity("myTrigger", "group1")// 标识
                .usingJobData("message","笨笨trigger")
                .usingJobData("doubleTrigger", 2.0D)
                .startNow()// 立即执行
                .withSchedule(SimpleScheduleBuilder // 执行频度
                        .simpleSchedule()
                        .withIntervalInSeconds(2)
                        .repeatForever())
                .build();

        // 创建Schedule实例
        SchedulerFactory schedulerFactory = new StdSchedulerFactory();
        Scheduler scheduler = schedulerFactory.getScheduler();
        scheduler.start();
        // 打印当前的时间，格式为2019-04-01 00:00:00
        Date date = new Date();
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        System.out.println("当前时间为：" + sf.format(date));
        scheduler.scheduleJob(jobDetail, trigger);

    }
}
