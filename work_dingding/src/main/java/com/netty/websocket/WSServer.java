package com.netty.websocket;


import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.group.ChannelGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import org.springframework.stereotype.Component;

@Component
public class WSServer {

    // 改为单例
    private static class SingleWSServer {
        static final WSServer instance = new WSServer();
    }

    public static WSServer getInstance() {
        return SingleWSServer.instance;// 单例形式获取
    }

    private EventLoopGroup mainGroup;
    private EventLoopGroup subGroup;
    private ServerBootstrap serverBootstrap;
    private ChannelFuture channelFuture;

    public WSServer() {
        mainGroup = new NioEventLoopGroup();
        subGroup = new NioEventLoopGroup();
        serverBootstrap = new ServerBootstrap();
        serverBootstrap.group(mainGroup, subGroup)
                .channel(NioServerSocketChannel.class)
                .childHandler(new WSServerInitializer());
    }

    public void start() {
        this.channelFuture = serverBootstrap.bind(8088);
        System.err.println("netty ws server 启动完毕");
    }

//    public static void main(String[] args) throws InterruptedException {
//
//        EventLoopGroup mainGroup = new NioEventLoopGroup();
//        EventLoopGroup subGroup = new NioEventLoopGroup();
//
//        try {
//            ServerBootstrap serverBootstrap = new ServerBootstrap();
//            serverBootstrap.group(mainGroup, subGroup)
//                    .channel(NioServerSocketChannel.class)
////                    .childHandler(new WSServerInitializer());
//                    .childHandler(null);
//
//
//            ChannelFuture channelFuture = serverBootstrap.bind(8088).sync();
//
//            channelFuture.channel().closeFuture().sync();
//        } finally {
//            mainGroup.shutdownGracefully();
//            subGroup.shutdownGracefully();
//        }
//    }
}
