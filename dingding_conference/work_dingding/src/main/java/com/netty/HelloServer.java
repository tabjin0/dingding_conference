package com.netty;

import com.mysql.fabric.Server;
import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.EventLoop;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.nio.NioServerSocketChannel;

/**
 * 客户端发送一个请求，服务器返回hello netty
 */
public class HelloServer {

    public static void main(String[] args) throws InterruptedException {
        // 1.定义一对线程组
        // 主线程组，用于接收客户端的链接，但是不处理，和老板一样，不做事情
        EventLoopGroup bossGroup = new NioEventLoopGroup();
        // 子线程组，老板线程组会将任务交给子线程组，让手下线程组做任务
        EventLoopGroup workerGroup = new NioEventLoopGroup();

        try {
            // 2.netty服务器的创建，ServerBootstrap是服务端启动类，简单启动ServerChannel
            ServerBootstrap serverBootstrap = new ServerBootstrap();
            serverBootstrap.group(bossGroup, workerGroup)// 针对server类设置主从线程组，
                    .channel(NioServerSocketChannel.class)// 设置nio双向通道，当客户端和server端建立连接之后，会有相应通道产生，这边需要设置通道类型
                    .childHandler(new HelloServerInitializer());// 字处理器，针对从线程组进行相应操作，处理workGroup
            // server定义完毕

            // 3.启动服务器,并且设置8088为启动端口号，同时设置启动方式为同步
            ChannelFuture channelFuture = serverBootstrap.bind(8088).sync(); // 绑定完端口设置同步启动方式，一直等到8088启动完毕

            // 4.监听关闭的channel，设置为同步
            channelFuture.channel().closeFuture().sync();// 获取当前某个客户端对应的管道，并关闭


        } finally {
            // 5.服务器启动完，关闭服务器之后，需要优雅地关闭两个线程组
            bossGroup.shutdownGracefully();// 优雅关闭主线程
            workerGroup.shutdownGracefully();// 优雅关闭子线程
        }
    }
}
