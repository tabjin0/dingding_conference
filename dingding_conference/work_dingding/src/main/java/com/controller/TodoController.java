package com.controller;

import com.util.ServiceResult;
import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * 待办事项controller
 */

@Api(value = "待办事项", tags = "待办事项controller 整体api有问题")
@RestController
public class TodoController {

    /**
     * OapiWorkrecordAddResponse api 中 没有
     * @return
     */
    @RequestMapping(value = "/todo", method = RequestMethod.POST)
    public ServiceResult todo() {
        return null;
    }
}
