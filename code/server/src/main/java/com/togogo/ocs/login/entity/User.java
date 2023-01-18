package com.togogo.ocs.login.entity;



import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@Entity
@Table(name="ocs_user")
public class User implements Serializable {
    /**
     * 用户编号
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    /**
     * 用户名称
     */
    private String userName;

    /**
     * 用户密码
     */
    private String password="";

    /**
     * 用户姓名
     */
    private String trueName="";

    /**
     * 用户是否禁用
     * 0：启用，1：禁用
     * */
    private Integer enable=0;

    /**
     * 注册时间
     */
    private Long registerDate=0L;

    /**是否在线
     * 0：不在线，1：在线
     * */
    private Integer isOnline=0;

    /**
     * 最后登录时间(毫秒)
     */
    private Long lastLoginTime=0L;

    /**
     * 地区编号
     */
    private Long areaId=0L;

    /**
     * 部门编号
     */
    private Long sectionId=0L;

    /**
     * 数据查看权限
     * personal：仅自己，部门编号数组（,11,12,13）：可查看的部门（用英文逗号隔开，且每个id前都必须有一个逗号）
     */
    private String dataAuth="";

    /**
     * 职位
     */
    private String position="";

    /**
     * 职位描述
     */
    private String  description="";

    /**
     * 优惠券可用额度
     * 单位：分
     */
    private long couponBalance=0L;

    /**
     * 删除状态
     * 0:未删除，1：已删除
     */
    private Integer deleted=0;

    /**
     * 邮箱
     */
    private String email = "";

    /**
     * 账号组编号,0：主账号，>0：子账号（主订单用户编号）
     */
    private long fatherId = 0;

    /**
     * 是否自动禁用，0：否，1：是
     * */
    private int isAutoEnable=0;


}
