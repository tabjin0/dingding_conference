package com.controller.contact;

import com.convert.typeConvert.ArrayList2String;
import com.dingtalk.api.response.*;
import com.entity.User;
import com.service.contact.UserService;
import com.util.AccessTokenUtil;
import com.util.ServiceResult;
import com.util.idworker.Sid;
import io.swagger.annotations.*;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;


/**
 * @ClassName MemberController
 * @Description TODO
 * @Author tabjin
 */
@Api(value = "通讯录管理", tags = "用户管理的controller")
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private Sid sid;

    /**
     * 获取用户详情
     * ok
     *
     * @param
     * @return
     */
    @ApiOperation(value = "01 获取用户详情 ok", notes = "获取用户详情的接口")
    @ApiImplicitParam(name = "userId", value = "传入userId试试", required = true, dataType = "String", paramType = "query", defaultValue = "1219441916791739")
    @RequestMapping(value = "/getUserDetail", method = RequestMethod.GET)
    @ResponseBody
    public ServiceResult queryUserDetail(@RequestParam(value = "userId") String userId) {

        String accessToken = AccessTokenUtil.getToken();

        // 调用service接口 -> 获取response
        OapiUserGetResponse response = userService.queryUserDetail(accessToken, userId, "zh_CN");
        ServiceResult serviceResult = ServiceResult.success(response);

        // 取出response中的数据
        Map<String, String> paramMap = response.getParams();

        List<Map<String, String>> mapList = new ArrayList<>();
        mapList.add(paramMap);


        User user = new User();
        BeanUtils.copyProperties(response, user);
        user.setId(sid.nextShort());
        user.setDepartment(ArrayList2String.convert(response.getDepartment()));


        userService.save(user, userId);

        return serviceResult;
    }

    /**
     * 根据userid获取用户列表
     *
     * @param
     * @return
     */
    @ApiOperation(value = "02 自定义 根据userid获取用户列表 ok", notes = "根据userid获取用户列表的接口")
    @RequestMapping(value = "/getUserList", method = RequestMethod.GET)
    @ResponseBody
    public ServiceResult queryUserList(@RequestParam String userIdList) {
        System.out.println(userIdList.getClass().getName());

        // 字符串转List,先将"["a","b"]"转为""a","b"",再将""a","b""转为"a,b"
        String userList = userIdList.substring(1, userIdList.length() - 1);
        List<String> idList = new ArrayList<>();
        String[] str = userList.split(",");
        for (int i = 0; i < str.length; i++) {
            str[i] = str[i].substring(1, str[i].length() - 1).replace("\"", "");
        }
        idList = Arrays.asList(str);

        List<OapiUserGetResponse> responseList = userService.queryUserList(idList);
        ServiceResult serviceResult = ServiceResult.success(responseList);
        return serviceResult;
    }

    /**
     * TODO 获取部门用户userid列表 接口有问题
     *
     * @param deptId
     * @return
     */
    @ApiOperation(value = "03 获取部门用户userid列表 api有问题", notes = "获取部门用户userid列表的接口")
    @RequestMapping(value = "/getDeptMember", method = RequestMethod.GET)
    @ResponseBody
    public ServiceResult getDeptMember(String deptId) {
        String accessToken = AccessTokenUtil.getToken();

        // 调用接口
        return null;
    }

    /**
     * 获取部门用户
     * ok
     *
     * @param departmentId
     * @return
     */
    @ApiOperation(value = "04 获取部门用户 ok", notes = "获取部门用户的接口")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "departmentId", value = "传入部门id试试", required = true, dataType = "long", paramType = "query", defaultValue = "1"),
            @ApiImplicitParam(name = "lang", value = "通讯录语言(默认zh_CN另外支持en_US)", dataType = "string", paramType = "query", defaultValue = "zh_CN"),
            @ApiImplicitParam(name = "offset", value = "支持分页查询，与size参数同时设置时才生效，此参数代表偏移量", dataType = "long", paramType = "query", defaultValue = "0"),
            @ApiImplicitParam(name = "size", value = "支持分页查询，与offset参数同时设置时才生效，此参数代表分页大小，最大100", dataType = "long", paramType = "query", defaultValue = "10"),
            @ApiImplicitParam(name = "order", value = "支持分页查询，部门成员的排序规则，默认不传是按自定义排序", dataType = "string", paramType = "query", defaultValue = "entry_asc"),
    })
    @RequestMapping(value = "/getDepartmentUsers", method = RequestMethod.GET)
    @ResponseBody
    public ServiceResult getDepartmentUsers(@RequestParam(value = "departmentId", required = true) Long departmentId,
                                            @RequestParam(value = "offset", required = false, defaultValue = "0") Long offset,
                                            @RequestParam(value = "size", required = false, defaultValue = "10") Long size,
                                            @RequestParam(value = "order", required = false, defaultValue = "entry_asc") String order,
                                            @RequestParam(value = "lang", required = false, defaultValue = "zh_CN") String lang
    ) {
        String accessToken = AccessTokenUtil.getToken();

        // 调用api
        OapiUserSimplelistResponse response =
                userService.queryDepartmentUsers(accessToken, lang, departmentId, offset, size, order);

        ServiceResult result = ServiceResult.success(response);

        return result;
    }

    /**
     * TODO 获取部门用户详情 接口有问题
     *
     * @return
     */
    @ApiOperation(value = "05 获取部门用户详情 api有问题", notes = "获取部门用户详情的接口")
    @RequestMapping(value = "/getDepartmentUsersDetail", method = RequestMethod.GET)
    @ResponseBody
    public ServiceResult getDepartmentUsersDetail() {


        return null;
    }

    /**
     * 获取管理员列表
     *
     * @return
     */
    @ApiOperation(value = "06 获取管理员列表 ok", notes = "获取管理员列表的接口")
    @RequestMapping(value = "/getAdmin", method = RequestMethod.GET)
    @ResponseBody
    public ServiceResult getAdmin() {

        String accessToken = AccessTokenUtil.getToken();

        OapiUserGetAdminResponse response = userService.queryAdmin(accessToken);

        ServiceResult result = ServiceResult.success(response);

        return result;
    }

    /**
     * TODO 获取管理员通讯录权限范围 接口有问题
     */
    @ApiOperation(value = "07 获取管理员通讯录权限范围 api有问题")
    @ApiImplicitParam(paramType = "query", name = "userId", value = "userId", dataType = "String", defaultValue = "1219441916791739")
    public ServiceResult getAdminScope(@RequestParam(value = "userId") String userId) {

        String accessToken = AccessTokenUtil.getToken();

        // 调用api
        return null;
    }

    /**
     * 根据unionid获取userid
     *
     * @param unionId
     * @return
     */
    @ApiOperation(value = "08 根据unionid获取userid ok", notes = "根据unionid获取userid的接口")
    @ApiImplicitParam(paramType = "query", name = "unionId", value = "员工在当前开发者企业账号范围内的唯一标识，系统生成，固定值，不会改变", dataType = "String", defaultValue = "eVUkKaegVEoI1D3lGJ6PDgiEiE")
    @RequestMapping(value = "/getByUnionid", method = RequestMethod.GET)
    @ResponseBody
    public ServiceResult getByUnionid(@RequestParam(value = "unionId") String unionId) {

        String accessToken = AccessTokenUtil.getToken();
//        String unionId = user.getUnionid();

        OapiUserGetUseridByUnionidResponse response = userService.queryByUnionid(accessToken, unionId);

        ServiceResult result = ServiceResult.success(response);
        return result;
    }

    /**
     * 创建用户
     * TODO 添加判断用户是否存在功能
     *
     * @param user
     * @return
     */
    @ApiOperation(value = "09 创建用户 ok", notes = "创建用户的接口")
    @RequestMapping(value = "/createUser", method = RequestMethod.POST)
    @ResponseBody
    public ServiceResult createUser(@RequestBody User user) {

        String accessToken = AccessTokenUtil.getToken();

        OapiUserCreateResponse response = userService.createUser(accessToken, user);

        ServiceResult result = ServiceResult.success(response);

        return result;
    }

    /**
     * 更新用户
     *
     * @param user
     * @return
     */
    @ApiOperation(value = "10 更新用户 ok", notes = "更新用户的接口")
    @RequestMapping(value = "/updateUser", method = RequestMethod.POST)
    @ResponseBody
    public ServiceResult updateUser(@RequestBody User user) {

        String accessToken = AccessTokenUtil.getToken();

        OapiUserUpdateResponse response = userService.updateUser(accessToken, user);

        ServiceResult result = ServiceResult.success(response);

        return result;
    }

    /**
     * 删除用户
     *
     * @param userId
     * @return
     */
    @ApiOperation(value = "11 删除用户 ok", notes = "删除用户的接口")
    @ApiImplicitParam(paramType = "query", value = "userId", name = "userId", dataType = "String", defaultValue = "tabjin")
    @RequestMapping(value = "/deleteUser", method = RequestMethod.GET)
    @ResponseBody
    public ServiceResult deleteUser(@RequestParam(value = "userId") String userId) {

        String accessToken = AccessTokenUtil.getToken();

        OapiUserDeleteResponse response = userService.deleteUser(accessToken, userId);

        ServiceResult result = ServiceResult.success(response);

        return result;
    }
}
