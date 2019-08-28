package com.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

@Entity
@Data
public class Msg {

    @Id
    @GeneratedValue
    private Integer id;
    private Integer actionCardId;
    private String fileId;
    private Integer imageId;
    private Integer linkId;
    private Integer markdownId;
    private String msgType;
    private Integer oaId;
    private Integer textId;
    private Date createTime;
    private Date updateTime;
}
