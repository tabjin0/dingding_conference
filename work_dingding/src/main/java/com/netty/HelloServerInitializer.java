package com.netty;

import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelPipeline;
import io.netty.channel.socket.SocketChannel;
import io.netty.handler.codec.http.HttpServerCodec;

/**
 * 初始化器，channel注册之后，执行内部相应的初始化方法
 */
public class HelloServerInitializer extends ChannelInitializer<SocketChannel> {

    @Override
    protected void initChannel(SocketChannel channel) throws Exception {
        // 通过SocketChannel获取相应的管道pipeline
        ChannelPipeline channelPipeline =channel.pipeline();
        // 获取到pipeline之后，里面有很多handler（可以理解为拦截器），通过管道添加handler
        // 当请求到服务端，需要解码，相应到客户端需要编码
        channelPipeline.addLast("HttpServerCodec", new HttpServerCodec());// 添加handler并命名为HttpServerCodec
        channelPipeline.addLast("CustomHandler", new CustomHandler());// 添加自定义的助手类，返回hello netty
    }
}
