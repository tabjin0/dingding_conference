package com.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
public class Department {
    @Id
    private String id;

    private String name;

    /** 父部门id，根部门为1 */
    @Column(name = "parent_id")
    private String parentId;

    /** 当前部门在父部门下的所有子部门中的排序值 */
    private String order;

    /** 是否同步创建一个关联此部门的企业群，true表示是，false表示不是 */
    @Column(name = "create_dept_group")
    private Boolean createDeptGroup;

    /** 当部门群已经创建后，是否有新人加入部门会自动加入该群，true表示是，false表示不是 */
    @Column(name = "auto_add_user")
    private Boolean autoAddUser;

    /** 是否隐藏部门，true表示隐藏，false表示显示 */
    @Column(name = "dept_hiding")
    private Boolean deptHiding;

    /** deptPermits	可以查看指定隐藏部门的其他部门列表，如果部门隐藏，则此值生效，取值为其他的部门id组成的的字符串，使用“|”符号进行分割 */
    @Column(name = "dept_permits")
    private String deptPermits;

    /** 可以查看指定隐藏部门的其他人员列表，如果部门隐藏，则此值生效，取值为其他的人员userid组成的的字符串，使用“|”符号进行分割 */
    @Column(name = "user_permits")
    private String userPermits;

    /** 是否本部门的员工仅可见员工自己，为true时，本部门员工默认只能看到员工自己 */
    @Column(name = "outer_dept")
    private Boolean outerDept;

    /** 本部门的员工仅可见员工自己为true时，可以配置额外可见部门，值为部门id组成的的字符串，使用“|”符号进行分割 */
    @Column(name = "outer_permit_depts")
    private String outerPermitDepts;

    /** 本部门的员工仅可见员工自己为true时，可以配置额外可见人员，值为userid组成的的字符串，使用“|”符号进行分割 */
    @Column(name = "outer_permit_users")
    private String outerPermitUsers;

    /** 企业群群主  */
    @Column(name = "org_dept_owner")
    private String orgDeptOwner;

    /** 部门的主管列表，取值为由主管的userid组成的字符串，不同的userid使用“|”符号进行分割 */
    @Column(name = "dept_manager_userid_list")
    private String deptManagerUseridList;

    /** 部门标识字段，开发者可用该字段来唯一标识一个部门，并与钉钉外部通讯录里的部门做映射 */
    @Column(name = "source_identifier")
    private String sourceIdentifier;

    /** 部门群是否包含子部门 */
    @Column(name = "group_contain_sub_dept")
    private Boolean groupContainSubDept;

    /**
     * @return id
     */
    public String getId() {
        return id;
    }

    /**
     * @param id
     */
    public void setId(String id) {
        this.id = id;
    }

    /**
     * @return name
     */
    public String getName() {
        return name;
    }

    /**
     * @param name
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * 获取父部门id，根部门为1
     *
     * @return parent_id - 父部门id，根部门为1
     */
    public String getParentId() {
        return parentId;
    }

    /**
     * 设置父部门id，根部门为1
     *
     * @param parentId 父部门id，根部门为1
     */
    public void setParentId(String parentId) {
        this.parentId = parentId;
    }

    /**
     * 获取当前部门在父部门下的所有子部门中的排序值
     *
     * @return order - 当前部门在父部门下的所有子部门中的排序值
     */
    public String getOrder() {
        return order;
    }

    /**
     * 设置当前部门在父部门下的所有子部门中的排序值
     *
     * @param order 当前部门在父部门下的所有子部门中的排序值
     */
    public void setOrder(String order) {
        this.order = order;
    }

    /**
     * 获取是否同步创建一个关联此部门的企业群，true表示是，false表示不是
     *
     * @return create_dept_group - 是否同步创建一个关联此部门的企业群，true表示是，false表示不是
     */
    public Boolean getCreateDeptGroup() {
        return createDeptGroup;
    }

    /**
     * 设置是否同步创建一个关联此部门的企业群，true表示是，false表示不是
     *
     * @param createDeptGroup 是否同步创建一个关联此部门的企业群，true表示是，false表示不是
     */
    public void setCreateDeptGroup(Boolean createDeptGroup) {
        this.createDeptGroup = createDeptGroup;
    }

    /**
     * 获取当部门群已经创建后，是否有新人加入部门会自动加入该群，true表示是，false表示不是
     *
     * @return auto_add_user - 当部门群已经创建后，是否有新人加入部门会自动加入该群，true表示是，false表示不是
     */
    public Boolean getAutoAddUser() {
        return autoAddUser;
    }

    /**
     * 设置当部门群已经创建后，是否有新人加入部门会自动加入该群，true表示是，false表示不是
     *
     * @param autoAddUser 当部门群已经创建后，是否有新人加入部门会自动加入该群，true表示是，false表示不是
     */
    public void setAutoAddUser(Boolean autoAddUser) {
        this.autoAddUser = autoAddUser;
    }

    /**
     * 获取是否隐藏部门，true表示隐藏，false表示显示
     *
     * @return dept_hiding - 是否隐藏部门，true表示隐藏，false表示显示
     */
    public Boolean getDeptHiding() {
        return deptHiding;
    }

    /**
     * 设置是否隐藏部门，true表示隐藏，false表示显示
     *
     * @param deptHiding 是否隐藏部门，true表示隐藏，false表示显示
     */
    public void setDeptHiding(Boolean deptHiding) {
        this.deptHiding = deptHiding;
    }

    /**
     * 获取deptPermits	可以查看指定隐藏部门的其他部门列表，如果部门隐藏，则此值生效，取值为其他的部门id组成的的字符串，使用“|”符号进行分割
     *
     * @return dept_permits - deptPermits	可以查看指定隐藏部门的其他部门列表，如果部门隐藏，则此值生效，取值为其他的部门id组成的的字符串，使用“|”符号进行分割
     */
    public String getDeptPermits() {
        return deptPermits;
    }

    /**
     * 设置deptPermits	可以查看指定隐藏部门的其他部门列表，如果部门隐藏，则此值生效，取值为其他的部门id组成的的字符串，使用“|”符号进行分割
     *
     * @param deptPermits deptPermits	可以查看指定隐藏部门的其他部门列表，如果部门隐藏，则此值生效，取值为其他的部门id组成的的字符串，使用“|”符号进行分割
     */
    public void setDeptPermits(String deptPermits) {
        this.deptPermits = deptPermits;
    }

    /**
     * 获取可以查看指定隐藏部门的其他人员列表，如果部门隐藏，则此值生效，取值为其他的人员userid组成的的字符串，使用“|”符号进行分割
     *
     * @return user_permits - 可以查看指定隐藏部门的其他人员列表，如果部门隐藏，则此值生效，取值为其他的人员userid组成的的字符串，使用“|”符号进行分割
     */
    public String getUserPermits() {
        return userPermits;
    }

    /**
     * 设置可以查看指定隐藏部门的其他人员列表，如果部门隐藏，则此值生效，取值为其他的人员userid组成的的字符串，使用“|”符号进行分割
     *
     * @param userPermits 可以查看指定隐藏部门的其他人员列表，如果部门隐藏，则此值生效，取值为其他的人员userid组成的的字符串，使用“|”符号进行分割
     */
    public void setUserPermits(String userPermits) {
        this.userPermits = userPermits;
    }

    /**
     * 获取是否本部门的员工仅可见员工自己，为true时，本部门员工默认只能看到员工自己
     *
     * @return outer_dept - 是否本部门的员工仅可见员工自己，为true时，本部门员工默认只能看到员工自己
     */
    public Boolean getOuterDept() {
        return outerDept;
    }

    /**
     * 设置是否本部门的员工仅可见员工自己，为true时，本部门员工默认只能看到员工自己
     *
     * @param outerDept 是否本部门的员工仅可见员工自己，为true时，本部门员工默认只能看到员工自己
     */
    public void setOuterDept(Boolean outerDept) {
        this.outerDept = outerDept;
    }

    /**
     * 获取本部门的员工仅可见员工自己为true时，可以配置额外可见部门，值为部门id组成的的字符串，使用“|”符号进行分割
     *
     * @return outer_permit_depts - 本部门的员工仅可见员工自己为true时，可以配置额外可见部门，值为部门id组成的的字符串，使用“|”符号进行分割
     */
    public String getOuterPermitDepts() {
        return outerPermitDepts;
    }

    /**
     * 设置本部门的员工仅可见员工自己为true时，可以配置额外可见部门，值为部门id组成的的字符串，使用“|”符号进行分割
     *
     * @param outerPermitDepts 本部门的员工仅可见员工自己为true时，可以配置额外可见部门，值为部门id组成的的字符串，使用“|”符号进行分割
     */
    public void setOuterPermitDepts(String outerPermitDepts) {
        this.outerPermitDepts = outerPermitDepts;
    }

    /**
     * 获取本部门的员工仅可见员工自己为true时，可以配置额外可见人员，值为userid组成的的字符串，使用“|”符号进行分割
     *
     * @return outer_permit_users - 本部门的员工仅可见员工自己为true时，可以配置额外可见人员，值为userid组成的的字符串，使用“|”符号进行分割
     */
    public String getOuterPermitUsers() {
        return outerPermitUsers;
    }

    /**
     * 设置本部门的员工仅可见员工自己为true时，可以配置额外可见人员，值为userid组成的的字符串，使用“|”符号进行分割
     *
     * @param outerPermitUsers 本部门的员工仅可见员工自己为true时，可以配置额外可见人员，值为userid组成的的字符串，使用“|”符号进行分割
     */
    public void setOuterPermitUsers(String outerPermitUsers) {
        this.outerPermitUsers = outerPermitUsers;
    }

    /**
     * 获取企业群群主
     *
     * @return org_dept_owner - 企业群群主
     */
    public String getOrgDeptOwner() {
        return orgDeptOwner;
    }

    /**
     * 设置企业群群主
     *
     * @param orgDeptOwner 企业群群主
     */
    public void setOrgDeptOwner(String orgDeptOwner) {
        this.orgDeptOwner = orgDeptOwner;
    }

    /**
     * 获取部门的主管列表，取值为由主管的userid组成的字符串，不同的userid使用“|”符号进行分割
     *
     * @return dept_manager_userid_list - 部门的主管列表，取值为由主管的userid组成的字符串，不同的userid使用“|”符号进行分割
     */
    public String getDeptManagerUseridList() {
        return deptManagerUseridList;
    }

    /**
     * 设置部门的主管列表，取值为由主管的userid组成的字符串，不同的userid使用“|”符号进行分割
     *
     * @param deptManagerUseridList 部门的主管列表，取值为由主管的userid组成的字符串，不同的userid使用“|”符号进行分割
     */
    public void setDeptManagerUseridList(String deptManagerUseridList) {
        this.deptManagerUseridList = deptManagerUseridList;
    }

    /**
     * 获取部门标识字段，开发者可用该字段来唯一标识一个部门，并与钉钉外部通讯录里的部门做映射
     *
     * @return source_identifier - 部门标识字段，开发者可用该字段来唯一标识一个部门，并与钉钉外部通讯录里的部门做映射
     */
    public String getSourceIdentifier() {
        return sourceIdentifier;
    }

    /**
     * 设置部门标识字段，开发者可用该字段来唯一标识一个部门，并与钉钉外部通讯录里的部门做映射
     *
     * @param sourceIdentifier 部门标识字段，开发者可用该字段来唯一标识一个部门，并与钉钉外部通讯录里的部门做映射
     */
    public void setSourceIdentifier(String sourceIdentifier) {
        this.sourceIdentifier = sourceIdentifier;
    }

    /**
     * 获取部门群是否包含子部门
     *
     * @return group_contain_sub_dept - 部门群是否包含子部门
     */
    public Boolean getGroupContainSubDept() {
        return groupContainSubDept;
    }

    /**
     * 设置部门群是否包含子部门
     *
     * @param groupContainSubDept 部门群是否包含子部门
     */
    public void setGroupContainSubDept(Boolean groupContainSubDept) {
        this.groupContainSubDept = groupContainSubDept;
    }
}