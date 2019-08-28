package com.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Date;

@Entity
@Data
public class WorkNotice {

    @Id
    private String id;
    private Long taskId;
    private String msgId;
    private String msgType;
    private String msg;
    private boolean toAllUser;
    private String text;
    private String title;
    private String markdown;
    private String singleTitle;
    private String singleUrl;
    private String file;
    private String image;
    private Long agentId;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT-8")
    private Date createTime;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT-8")
    private Date updateTime;
}
