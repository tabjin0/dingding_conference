package com.quartz;

import com.service.msg.MessageService;
import com.service.robots.RobotsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.quartz.CronTriggerFactoryBean;
import org.springframework.scheduling.quartz.MethodInvokingJobDetailFactoryBean;
import org.springframework.scheduling.quartz.SchedulerFactoryBean;

/**
 * 我是一个quartz定时器
 */
//@Configuration // 将bean的一些配置写入ioc容器中
public class QuzrtzConfiguration {

    @Autowired
    private RobotsService robotsService;

    @Autowired
    private MessageService messageService;

    @Autowired
    private MethodInvokingJobDetailFactoryBean jobDetailFactoryBean;

    @Autowired
    private CronTriggerFactoryBean msgSendTriggerFactoryBean;

    /**
     * 创建jobDetail
     * @return
     */
    @Bean(name = "jobDetailFactory")// 上面会Autowired
    public MethodInvokingJobDetailFactoryBean createJobDetail() {
        // TODO
        // new 出JobDetailFactory对象，该Factory主要用来制作一个jobDetail，即制作一个任务
        // 此处的定时任务只是反复调用一个方法
        MethodInvokingJobDetailFactoryBean jobDetailFactoryBean = new MethodInvokingJobDetailFactoryBean();

        // 设置jobDetail名字
        jobDetailFactoryBean.setName("schedule_to_send_msg_job");
        // 设置jobDetail组名
        jobDetailFactoryBean.setGroup("job_schedule_to_send_msg_group");

        // 这边的一个jobDetail，当有多个trigger的时候，可能在第一个job完成之前，第二个job就开始了
        // 指定current设为false，多个job不会并发运行，第二个job不会再第一个job完成完成之前完成
        jobDetailFactoryBean.setConcurrent(true);

        // 指定运行任务的类，这边填入service接口
        jobDetailFactoryBean.setTargetObject(robotsService);

        // 指定运行任务的方法，这边填入service接口下的方法
        jobDetailFactoryBean.setTargetMethod("testRobotSendMsg");

        return jobDetailFactoryBean;
    }

    /**
     * 创建cronTriggerFactory
     * @return
     */
    @Bean(name = "msgSendTriggerFactoryBean")
    public CronTriggerFactoryBean createMsgSendTrigger() {
        // 创建triggerFactory实例，用来创建cronTriggerFactoryBean
        CronTriggerFactoryBean cronTriggerFactoryBean = new CronTriggerFactoryBean();
        // 设置trigger名称
        cronTriggerFactoryBean.setName("schedule_to_send_msg_trigger");
        // 设置trigger组名
        cronTriggerFactoryBean.setGroup("job_schedule_to_send_msg_group");
        // 绑定jobDetail
        cronTriggerFactoryBean.setJobDetail(jobDetailFactoryBean.getObject());
        // 设置cron表达式
        cronTriggerFactoryBean.setCronExpression("1/1 * * * * ? ");// 每1秒执行一下T
//        cronTriggerFactoryBean.setCronExpression("0/1 0 0/1 * * ? ");// 每5秒执行一下T
        return cronTriggerFactoryBean;
    }

    /**
     * 创建调度工厂, 并返回
     * @return
     */
    @Bean(name = "scheduleFactory")
    public SchedulerFactoryBean createSchedulerFactoryBean() {
        SchedulerFactoryBean schedulerFactoryBean = new SchedulerFactoryBean();

        // TODO
        // messageService.getSendResult会获取到没有读消息的人
        // 这边确实需要重写发送给个人消息的接口，但是钉钉的api中缺少Msg构造函数，无法发消息
        // 工作通知接口一天只能发送3次，所以这边改用机器人接口发送消息，
        // 机器人接口又不给我们消息发送状态，只能定时重发，不能根据未读用户重发
        if(true){
            schedulerFactoryBean.setTriggers(msgSendTriggerFactoryBean.getObject());// 这边可以设置多个trigger
            return schedulerFactoryBean;
        }
        return schedulerFactoryBean;
    }
}
