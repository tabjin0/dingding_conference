package com.entity;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Date;

/**
 * @ClassName User
 * @Description TODO
 * @Author tabjin
 */
@Entity
@Data
@ApiModel(value = "用户对象", description = "这是用户对象")// TODO 最好去VO处理
public class User {

    @ApiModelProperty(hidden = true)
    @Id
    private String id;

    /** 是否已经激活，true表示已激活，false表示未激活 */
    @ApiModelProperty(hidden = true)
    private Boolean active;

    /** 头像url */
    @ApiModelProperty(hidden = true)
    private String avatar;

    /** 成员所属部门id列表 */
    @ApiModelProperty(value = "成员所属部门id列表", name = "department", example = "[1]", required = true)
    private String department;

    @ApiModelProperty(hidden = true)
    private String dingId;

    /** 员工的电子邮箱 */
    @ApiModelProperty(value = "员工的电子邮箱", name = "email", example = "zhangsan@gzdev.com", required = false)
    private String email;

    /** 扩展属性，可以设置多种属性（但手机上最多只能显示10个扩展属性，具体显示哪些属性，请到OA管理后台->设置->通讯录信息设置和OA管理后台->设置->手机端显示信息设置） */
    @ApiModelProperty(value = "扩展属性", name = "extattr" , example = "{\"爱好\": \"旅游\", \"年龄\": \"24\"}", required = false)
    private String extattr;

    /** 入职时间。Unix时间戳 （在OA后台通讯录中的员工基础信息中维护过入职时间才会返回) */
    @ApiModelProperty(hidden = true)
    private Date hiredDate;

    @ApiModelProperty(hidden = true)
    private String inviteMobile;

    /** 是否为企业的管理员，true表示是，false表示不是 */
    @ApiModelProperty(hidden = true)
    private Boolean isAdmin;

    /** 是否为企业的老板，true表示是，false表示不是 */
    @ApiModelProperty(hidden = true)
    private Boolean isBoss;

    @ApiModelProperty(hidden = true)
    private Boolean isCustomizedPortal;

    /** 是否号码隐藏，true表示隐藏，false表示不隐藏 */
    @ApiModelProperty(value = "是否隐藏号码", name = "isHide", example = "false", required = false)
    private Boolean isHide;

    /** 在对应的部门中是否为主管：Map结构的json字符串，key是部门的Id，value是人员在这个部门中是否为主管，true表示是，false表示不是 */
    @ApiModelProperty(hidden = true)
    private Boolean isLeaderInDepts;

    @ApiModelProperty(hidden = true)
    private Boolean isLimited;

    /** 是否是高管 */
    @ApiModelProperty(value = "是否是高管", name = "isSenior", example = "false", required = false)
    private Boolean isSenior;

    /** 员工工号 */
    @ApiModelProperty(value = "员工工号", name = "jobnumber", example = "111111", required = false)
    private String jobNumber;

    /** 管理员id */
    @ApiModelProperty(hidden = true)
    private String managerUserId;

    @ApiModelProperty(hidden = true)
    private String memberView;

    /** 手机号码 */
    @ApiModelProperty(value = "手机号码", name = "mobile", example = "19951430881", required = false)
    private String mobile;

    @ApiModelProperty(hidden = true)
    private String mobileHash;

    /** 员工名字 */
    @ApiModelProperty(value = "成员名称", name = "name", example = "张三", required = true)
    private String name;

    @ApiModelProperty(hidden = true)
    private String nickName;

    @ApiModelProperty(hidden = true)
    private String openId;

    @ApiModelProperty(value = "在对应的部门中的排序, Map结构的json字符串, key是部门的Id, value是人员在这个部门的排序值", name = "orderInDepts", example = "\"{1:10, 2:20}\"", required = false)
    private String orderInDepts;

    /** 员工的企业邮箱，如果员工已经开通了企业邮箱，接口会返回，否则不会返回 */
    @ApiModelProperty(value = "员工的企业邮箱", name = "orgEmail", example = "qiye@gzdev.com", required = false)
    private String orgEmail;

    /** 职位信息 */
    @ApiModelProperty(value = "职位信息", name = "position", example = "产品经理", required = false)
    private String position;

    /** 备注 */
    @ApiModelProperty(value = "备注", name = "remark", example = "你是猪么", required = false)
    private String remark;

    /** 角色 */
    @ApiModelProperty(hidden = true)
    private String roles;

    @ApiModelProperty(hidden = true)
    private String stateCode;

    /** 分机号（仅限企业内部开发调用） */
    @ApiModelProperty(value = "分机号（仅限企业内部开发调用）", name = "tel", example = "010-123333", required = false)
    private String tel;

    @ApiModelProperty(value = "userId", name = "userId", example = "tabjin", required = false)
    private String userId;

    /** 员工在当前开发者企业账号范围内的唯一标识，系统生成，固定值，不会改变 */
    @ApiModelProperty(hidden = true)
    private String unionId;

    /** 办公地点 */
    @ApiModelProperty(value = "办公地点", name = "workPlace", example = "云智", required = false)
    private String workPlace;
}
