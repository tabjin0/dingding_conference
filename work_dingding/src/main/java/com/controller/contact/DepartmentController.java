package com.controller.contact;

import com.dingtalk.api.response.*;
import com.entity.Department;
import com.entity.VO.DepartmentVO;
import com.service.contact.DepartmentService;
import com.util.ServiceResult;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.xml.ws.Service;

/**
 * 部门管理
 */
@Api(value = "通讯录管理", tags = "部门管理的controller")
@RestController
//@RequestMapping(value = )
public class DepartmentController {

    @Autowired
    private DepartmentService departmentService;

    /**
     * 获取子部门ID列表
     *
     * @return
     */
    @ApiOperation(value = "01 获取子部门ID列表 ok", notes = "获取子部门ID列表的接口")
    @ApiImplicitParam(name = "departmentId", value = "部门id", dataType = "string", paramType = "query", defaultValue = "1")
    @RequestMapping(value = "/querySubDepartmentIdList", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public ServiceResult querySubDepartmentIdList(@RequestParam(value = "departmentId", required = true) String departmentId) {
        OapiDepartmentListIdsResponse response = departmentService.querySubDepartmentListIds(departmentId);

        ServiceResult result = ServiceResult.success(response);
        return result;
    }

    /**
     * 获取部门列表
     *
     * @param departmentId
     * @param lang
     * @param fetchChild
     * @return
     */
    @ApiOperation(value = "02 获取部门列表 ok", notes = "获取部门列表的接口")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "departmentId", value = "部门id", dataType = "string", paramType = "query", defaultValue = "1"),
            @ApiImplicitParam(name = "lang", value = "通讯录语言（默认zh_CN，未来会支持en_US）", dataType = "string", paramType = "query", defaultValue = "zh_CN"),
            @ApiImplicitParam(name = "fetchChild", value = "是否递归部门的全部子部门，ISV微应用固定传递false", dataType = "string", paramType = "query", defaultValue = "false"),
    })
    @RequestMapping(value = "/queryDepartmentList", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public ServiceResult queryDepartmentList(@RequestParam(value = "departmentId", required = true) String departmentId,
                                             @RequestParam(value = "lang", required = false) String lang,
                                             @RequestParam(value = "fetchChild", required = false) Boolean fetchChild) {
        OapiDepartmentListResponse response = departmentService.queryDepartmentList(lang, fetchChild, departmentId);

        ServiceResult result = ServiceResult.success(response);
        return result;
    }

    /**
     * 获取部门详情
     *
     * @return
     */
    @ApiOperation(value = "02 获取部门详情 ok", notes = "获取部门详情的接口")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "departmentId", value = "部门id", dataType = "string", paramType = "query", defaultValue = "1"),
            @ApiImplicitParam(name = "lang", value = "通讯录语言（默认zh_CN，未来会支持en_US）", dataType = "string", paramType = "query", defaultValue = "zh_CN")
    })
    @RequestMapping(value = "/queryDepartmentDetail", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public ServiceResult queryDepartmentDetail(@RequestParam(value = "departmentId", required = true) String departmentId,
                                               @RequestParam(value = "lang", required = false) String lang) {
        OapiDepartmentGetResponse response = departmentService.queryDepartmentDetail(departmentId, lang);
        ServiceResult result = ServiceResult.success(response);
        return result;
    }

    /**
     * 查询部门的所有上级父部门路径
     *
     * @return
     */
    @ApiOperation(value = "03 查询部门的所有上级父部门路径 ok", notes = "查询部门的所有上级父部门路径的接口")
    @ApiImplicitParam(name = "departmentId", value = "希望查询的部门的id，包含查询的部门本身，,这边默认云智技术部", dataType = "string", paramType = "query", defaultValue = "110789809")
    @RequestMapping(value = "/queryDepartmentParentPath", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public ServiceResult queryDepartmentParentPath(@RequestParam(value = "departmentId", required = true) String departmentId) {
        OapiDepartmentListParentDeptsByDeptResponse response = departmentService.queryDepartmentParentPath(departmentId);

        ServiceResult result = ServiceResult.success(response);
        return result;
    }

    /**
     * 查询指定用户的所有上级父部门路径
     *
     * @return
     */
    @ApiOperation(value = "04 查询指定用户的所有上级父部门路径 ok", notes = "查询指定用户的所有上级父部门路径的接口")
    @ApiImplicitParam(name = "userId", value = "希望查询的用户的id", dataType = "string", paramType = "query", defaultValue = "1219441916791739")
    @RequestMapping(value = "/queryUserParentDepartment", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public ServiceResult queryUserParentDepartment(@RequestParam(value = "userId", required = true) String userId) {
        OapiDepartmentListParentDeptsResponse response = departmentService.queryUserParentPath(userId);

        ServiceResult result = ServiceResult.success(response);
        return result;
    }

    /**
     * 获取企业员工人数
     *
     * @return
     */
    @ApiOperation(value = "05 获取企业员工人数 ok", notes = "获取企业员工人数的接口")
    @ApiImplicitParam(name = "onlyActive", value = "0：包含未激活钉钉的人员数量,1：不包含未激活钉钉的人员数量", dataType = "long", paramType = "query", defaultValue = "1")
    @RequestMapping(value = "/queryOrgUserCount", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public ServiceResult queryOrgUserCount(@RequestParam(value = "onlyActive", required = true) Long onlyActive) {
        OapiUserGetOrgUserCountResponse response = departmentService.queryOrgUserCount(onlyActive);

        ServiceResult result = ServiceResult.success(response);
        return result;
    }

    /**
     * 创建部门
     * ok
     *
     * @return
     */
    @ApiOperation(value = "06 创建部门 ok", notes = "创建部门的接口")
    @RequestMapping(value = "/createDepartment", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    public ServiceResult createDepartment(@RequestBody DepartmentVO departmentVO) {

        Department department = new Department();

        department.setParentId(departmentVO.getParentId());
        department.setOrder(departmentVO.getOrder());
        department.setName(departmentVO.getName());


        OapiDepartmentCreateResponse response = departmentService.createDepartment(department);

        ServiceResult result = ServiceResult.success(response);
        return result;
    }

    /**
     * 更新部门
     * TODO 这边的官方更新对象的id类型怎么一会long，一会string
     * @return
     */
    @ApiOperation(value = "07 更新部门 有点bug", notes = "更新部门的接口，这边的官方更新对象的id类型怎么一会long，一会string")
    @RequestMapping(value = "/updateDepartment", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    public ServiceResult updateDepartment(@RequestBody DepartmentVO departmentVO) {

        Department department = new Department();

        department.setParentId(departmentVO.getParentId());
        department.setOrder(departmentVO.getOrder());
        department.setName(departmentVO.getName());


        OapiDepartmentUpdateResponse response = departmentService.updateDepartment(department);

        ServiceResult result = ServiceResult.success(response);
        return result;
    }

    /**
     * 删除部门
     *
     * @return
     */
    @ApiOperation(value = "08 删除部门 ok", notes = "删除部门的接口")
    @ApiImplicitParam(name = "departmentId", value = "部门id，注：不能删除根部门；不能删除含有子部门、成员的部门)", dataType = "string", paramType = "query")
    @RequestMapping(value = "/deleteDepartment", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public ServiceResult deleteDepartment(@RequestParam(value = "departmentId") String departmentId) {

        OapiDepartmentDeleteResponse response = departmentService.deleteDepartment(departmentId);

        ServiceResult result = ServiceResult.success(response);
        return result;
    }

}
