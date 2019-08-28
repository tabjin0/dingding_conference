package com.entity.VO;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@ApiModel(value = "部门对象", description = "这是部门对象")
public class DepartmentVO {

    @ApiModelProperty(hidden = true)
    private String id;

    @ApiModelProperty(value = "部门名称", name = "name", example = "云智技术部", dataType = "string", required = true)
    private String name;

    /** 父部门id，根部门为1 */
    @Column(name = "parent_id")
    @ApiModelProperty(value = "父部门id，根部门id为1", name = "parentId", example = "1", dataType = "string", required = true)
    private String parentId;

    /** 当前部门在父部门下的所有子部门中的排序值 */
    @ApiModelProperty(value = "当前部门在父部门下的所有子部门中的排序值", name = "order", example = "1", dataType = "string", required = true)
    private String order;

    /** 是否同步创建一个关联此部门的企业群，true表示是，false表示不是 */
    @Column(name = "create_dept_group")
    private Boolean createDeptGroup;

    /** 当部门群已经创建后，是否有新人加入部门会自动加入该群，true表示是，false表示不是 */
    @ApiModelProperty(hidden = true)
    @Column(name = "auto_add_user")
    private Boolean autoAddUser;

    /** 是否隐藏部门，true表示隐藏，false表示显示 */
    @ApiModelProperty(hidden = true)
    @Column(name = "dept_hiding")
    private Boolean deptHiding;

    /** deptPermits	可以查看指定隐藏部门的其他部门列表，如果部门隐藏，则此值生效，取值为其他的部门id组成的的字符串，使用“|”符号进行分割 */
    @ApiModelProperty(hidden = true)
    @Column(name = "dept_permits")
    private String deptPermits;

    /** 可以查看指定隐藏部门的其他人员列表，如果部门隐藏，则此值生效，取值为其他的人员userid组成的的字符串，使用“|”符号进行分割 */
    @ApiModelProperty(hidden = true)
    @Column(name = "user_permits")
    private String userPermits;

    /** 是否本部门的员工仅可见员工自己，为true时，本部门员工默认只能看到员工自己 */
    @ApiModelProperty(hidden = true)
    @Column(name = "outer_dept")
    private Boolean outerDept;

    /** 本部门的员工仅可见员工自己为true时，可以配置额外可见部门，值为部门id组成的的字符串，使用“|”符号进行分割 */
    @ApiModelProperty(hidden = true)
    @Column(name = "outer_permit_depts")
    private String outerPermitDepts;

    /** 本部门的员工仅可见员工自己为true时，可以配置额外可见人员，值为userid组成的的字符串，使用“|”符号进行分割 */
    @ApiModelProperty(hidden = true)
    @Column(name = "outer_permit_users")
    private String outerPermitUsers;

    /** 企业群群主  */
    @ApiModelProperty(hidden = true)
    @Column(name = "org_dept_owner")
    private String orgDeptOwner;

    /** 部门的主管列表，取值为由主管的userid组成的字符串，不同的userid使用“|”符号进行分割 */
    @ApiModelProperty(hidden = true)
    @Column(name = "dept_manager_userid_list")
    private String deptManagerUseridList;

    /** 部门标识字段，开发者可用该字段来唯一标识一个部门，并与钉钉外部通讯录里的部门做映射 */
    @ApiModelProperty(hidden = true)
    @Column(name = "source_identifier")
    private String sourceIdentifier;

    /** 部门群是否包含子部门 */
    @ApiModelProperty(hidden = true)
    @Column(name = "group_contain_sub_dept")
    private Boolean groupContainSubDept;
}