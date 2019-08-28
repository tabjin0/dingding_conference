package com.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2 // 开启配置
public class Swagger2 {

    /**
     * Swagger2的配置文件，此处配置swagger2的一些基本内容，如扫描的包等等
     * @return
     */
    @Bean
    public Docket createRestApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .host("tabjin.vaiwan.com")
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.controller"))
                .paths(PathSelectors.any())
                .build();
    }

    /**
     * 构建api文档信息
     * @return
     */
    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                // 设置页面标题
                .title("使用swagger2构建钉钉后端api接口文档")
                // 设置联系人
                .contact(new Contact("张进", "http://github/jinboy", "zjdefine@163.com"))
                // 描述
                .description("欢迎访问钉钉企业E应用后端接口文档，这里是描述信息")
                // 定义版本号
                .version("1.0")
                .build();
    }
}
