package com.controller;

import com.util.ServiceResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DingPlateController {


    @RequestMapping(value = "/getCustomSpace", method = RequestMethod.POST)
    public ServiceResult getCustomSpace() {
        return null;
    }
}
