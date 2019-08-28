package com.netty.websocket;

import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelPipeline;
import io.netty.channel.socket.SocketChannel;
import io.netty.handler.codec.http.HttpObjectAggregator;
import io.netty.handler.codec.http.HttpServerCodec;
import io.netty.handler.codec.http.websocketx.WebSocketServerProtocolHandler;
import io.netty.handler.stream.ChunkedWriteHandler;

public class WSServerInitializer extends ChannelInitializer<SocketChannel> {


    @Override
    protected void initChannel(SocketChannel socketChannel) throws Exception {

        ChannelPipeline channelPipeline = socketChannel.pipeline();

        // websocket基于http协议，需要相应的编解码器
        channelPipeline.addLast(new HttpServerCodec());
        // 对写大数据流的支持
        channelPipeline.addLast(new ChunkedWriteHandler());
        // 对httpMessage进行聚合，聚合成FullHttpRequest或者FullHttpResponse
        // netty中几乎都会用到此handler
        channelPipeline.addLast(new HttpObjectAggregator(1024 * 64));

        // =============== 以上用于支持http协议 ========================

        // websocket 服务器处理的协议，用于指定给客户端连接访问的路由：/ws
        // 本handler处理一些繁琐的东西：处理握手动作handshaking(close, ping, pong)  ping+pong = 心跳
        // 对于websocket，都是以frames进行传输，不同的数据类型对应的frames也不同
        channelPipeline.addLast(new WebSocketServerProtocolHandler("/ws"));

        // 自定义handler
        channelPipeline.addLast(new ChatHandler());
    }
}
