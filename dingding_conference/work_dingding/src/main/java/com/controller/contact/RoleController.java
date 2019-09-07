package com.controller.contact;

import com.dingtalk.api.response.OapiRoleListResponse;
import com.service.contact.RoleService;
import com.util.ServiceResult;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@Api(value = "通讯录管理", tags = "角色管理的controller")
@RestController
public class RoleController {

    @Autowired
    private RoleService roleService;

    /**
     * 获取角色列表
     *
     * @return
     */
    @ApiOperation(value = "01 获取角色列表 接口有点问题", notes = "获取角色列表的接口")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "size", value = "分页大小，默认值：20，最大值200", dataType = "long", paramType = "query", defaultValue = "20"),
            @ApiImplicitParam(name = "offset", value = "分页偏移，默认值：0", dataType = "long", paramType = "query", defaultValue = "0")
    })
    @RequestMapping(value = "/getRoleList", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    public ServiceResult getRoleList(@RequestParam(value = "size", required = false, defaultValue = "20") Long size,
                                     @RequestParam(value = "offset", required = false, defaultValue = "0") Long offset) {
        // 调用api
        OapiRoleListResponse response = roleService.queryRoleList(size, offset);
        ServiceResult result = ServiceResult.success(response);
        return result;
    }

    /**
     * 获取角色下的员工列表
     *
     * @return
     */
    @ApiOperation(value = "获取角色下的员工列表", notes = "获取角色下的员工列表的接口")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "roleId", value = "角色ID", dataType = "long", paramType = "query", defaultValue = "427106940"),
            @ApiImplicitParam(name = "size", value = "分页大小，默认值：20，最大值200", dataType = "long", paramType = "query", defaultValue = "20"),
            @ApiImplicitParam(name = "offset", value = "分页偏移，默认值：0", dataType = "long", paramType = "query", defaultValue = "0")
    })
    @RequestMapping(value = "/getRoleUserList", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    public ServiceResult getRoleUserList(@RequestParam(value = "roleId", required = true) Long roleId,
                                         @RequestParam(value = "size", required = false, defaultValue = "20") Long size,
                                         @RequestParam(value = "offset", required = false, defaultValue = "0") Long offse) {
        // TODO
        return null;
    }

    /**
     * 获取角色组
     *
     * @return
     */
    @ApiOperation(value = "获取角色组", notes = "获取角色组的接口")
    @RequestMapping(value = "/geyRoleGroup", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    public ServiceResult getRoleGroup() {
        // TODO
        return null;
    }

    /**
     * 创建角色组
     *
     * @return
     */
    @ApiOperation(value = "创建角色组", notes = "创建角色组的接口")
    @RequestMapping(value = "/createRoleGroup", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public ServiceResult createRoleGroup() {
        // TODO
        return null;
    }


    /**
     * 获取角色详情
     *
     * @return
     */
    @ApiOperation(value = "获取角色详情", notes = "获取角色详情的接口")
    @RequestMapping(value = "/queryRoleDetail", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public ServiceResult queryRoleDetail() {
        // TODO
        return null;
    }

    /**
     * 创建角色
     *
     * @return
     */
    @ApiOperation(value = "创建角色", notes = "创建角色的接口")
    @RequestMapping(value = "/createRole", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public ServiceResult createRole() {
        // TODO
        return null;
    }

    /**
     * 更新角色
     *
     * @return
     */
    @ApiOperation(value = "更新角色", notes = "更新角色的接口")
    @RequestMapping(value = "/updateRole", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public ServiceResult updateRole() {
        // TODO
        return null;
    }

    /**
     * 删除角色
     *
     * @return
     */
    @ApiOperation(value = "删除角色", notes = "删除角色的接口")
    @RequestMapping(value = "/deleteRole", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public ServiceResult deleteRole() {
        // TODO
        return null;
    }

    /**
     * 批量增加员工角色
     *
     * @return
     */
    @ApiOperation(value = "批量增加员工角色", notes = "批量增加员工角色的接口")
    @RequestMapping(value = "/userBatchAddRole", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public ServiceResult userBatchAddRole() {
        // TODO
        return null;
    }

    /**
     * 批量删除员工角色
     *
     * @return
     */
    @ApiOperation(value = "批量删除员工角色", notes = "批量删除员工角色的接口")
    @RequestMapping(value = "/userBatchDeleteRole", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public ServiceResult userBatchDeleteRole() {
        // TODO
        return null;
    }
}
