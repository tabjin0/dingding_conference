package com;


import com.netty.websocket.WSServer;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

@Component
public class NettyBooter implements ApplicationListener<ContextRefreshedEvent> {

    // TODO 启动netty服务，也就是监听SpringBoot，直接启动Application，NettyBooter将会作为Component启动
    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
        // 判断事件
        if (contextRefreshedEvent.getApplicationContext().getParent() == null) {
            try {
                WSServer.getInstance().start();// 启动netty
            } catch (Exception e) {
                e.printStackTrace();
            }

        }
    }
}
