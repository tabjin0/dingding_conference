package com.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Date;

@Entity
@Data
public class WorkNoticeDetail {

    @Id
    private Long taskId;

    private String markdown;

    private String msgType;

    private String singleTitle;

    private String text;

    private String title;

    private String singleUrl;

    private String file;

    private String image;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT-8")
    private Date createTime;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT-8")
    private Date updateTime;


}
