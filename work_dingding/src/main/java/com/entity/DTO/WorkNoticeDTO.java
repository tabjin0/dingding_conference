package com.entity.DTO;

import com.dingtalk.api.request.OapiMessageCorpconversationAsyncsendV2Request;
import com.entity.WorkNoticeDetail;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.taobao.api.TaobaoObject;
import com.taobao.api.internal.mapping.ApiField;
import com.taobao.api.internal.mapping.ApiListField;
import lombok.Data;

import javax.persistence.Id;
import java.util.Date;
import java.util.List;

@Data
public class WorkNoticeDTO {

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

    /**
     * 一对多映射
     */
//    private List<OrderDetail> orderDetailList = new ArrayList<>();
    private List<WorkNoticeDetail> workNoticeDetailList;


    public static class Msg {
        private OapiMessageCorpconversationAsyncsendV2Request.ActionCard actionCard;
        private OapiMessageCorpconversationAsyncsendV2Request.File file;
        private OapiMessageCorpconversationAsyncsendV2Request.Image image;
        private OapiMessageCorpconversationAsyncsendV2Request.Link link;
        private OapiMessageCorpconversationAsyncsendV2Request.Markdown markdown;
        private String msgtype;
        private OapiMessageCorpconversationAsyncsendV2Request.OA oa;
        private OapiMessageCorpconversationAsyncsendV2Request.Text text;
        private OapiMessageCorpconversationAsyncsendV2Request.Voice voice;

        public Msg() {
        }

        public OapiMessageCorpconversationAsyncsendV2Request.ActionCard getActionCard() {
            return this.actionCard;
        }

        public void setActionCard(OapiMessageCorpconversationAsyncsendV2Request.ActionCard actionCard) {
            this.actionCard = actionCard;
        }

        public OapiMessageCorpconversationAsyncsendV2Request.File getFile() {
            return this.file;
        }

        public void setFile(OapiMessageCorpconversationAsyncsendV2Request.File file) {
            this.file = file;
        }

        public OapiMessageCorpconversationAsyncsendV2Request.Image getImage() {
            return this.image;
        }

        public void setImage(OapiMessageCorpconversationAsyncsendV2Request.Image image) {
            this.image = image;
        }

        public OapiMessageCorpconversationAsyncsendV2Request.Link getLink() {
            return this.link;
        }

        public void setLink(OapiMessageCorpconversationAsyncsendV2Request.Link link) {
            this.link = link;
        }

        public OapiMessageCorpconversationAsyncsendV2Request.Markdown getMarkdown() {
            return this.markdown;
        }

        public void setMarkdown(OapiMessageCorpconversationAsyncsendV2Request.Markdown markdown) {
            this.markdown = markdown;
        }

        public String getMsgtype() {
            return this.msgtype;
        }

        public void setMsgtype(String msgtype) {
            this.msgtype = msgtype;
        }

        public OapiMessageCorpconversationAsyncsendV2Request.OA getOa() {
            return this.oa;
        }

        public void setOa(OapiMessageCorpconversationAsyncsendV2Request.OA oa) {
            this.oa = oa;
        }

        public OapiMessageCorpconversationAsyncsendV2Request.Text getText() {
            return this.text;
        }

        public void setText(OapiMessageCorpconversationAsyncsendV2Request.Text text) {
            this.text = text;
        }

        public OapiMessageCorpconversationAsyncsendV2Request.Voice getVoice() {
            return this.voice;
        }

        public void setVoice(OapiMessageCorpconversationAsyncsendV2Request.Voice voice) {
            this.voice = voice;
        }
    }

    public static class ActionCard {
        private List<OapiMessageCorpconversationAsyncsendV2Request.BtnJsonList> btnJsonList;
        private String btnOrientation;
        private String markdown;
        private String singleTitle;
        private String singleUrl;
        private String title;

        public ActionCard() {
        }

        public List<OapiMessageCorpconversationAsyncsendV2Request.BtnJsonList> getBtnJsonList() {
            return this.btnJsonList;
        }

        public void setBtnJsonList(List<OapiMessageCorpconversationAsyncsendV2Request.BtnJsonList> btnJsonList) {
            this.btnJsonList = btnJsonList;
        }

        public String getBtnOrientation() {
            return this.btnOrientation;
        }

        public void setBtnOrientation(String btnOrientation) {
            this.btnOrientation = btnOrientation;
        }

        public String getMarkdown() {
            return this.markdown;
        }

        public void setMarkdown(String markdown) {
            this.markdown = markdown;
        }

        public String getSingleTitle() {
            return this.singleTitle;
        }

        public void setSingleTitle(String singleTitle) {
            this.singleTitle = singleTitle;
        }

        public String getSingleUrl() {
            return this.singleUrl;
        }

        public void setSingleUrl(String singleUrl) {
            this.singleUrl = singleUrl;
        }

        public String getTitle() {
            return this.title;
        }

        public void setTitle(String title) {
            this.title = title;
        }
    }

    public static class BtnJsonList {
        private String actionUrl;
        private String title;

        public BtnJsonList() {
        }
    }

    public static class Markdown {
        private String text;
        private String title;

        public Markdown() {
        }
    }

    public static class OA {
        private OapiMessageCorpconversationAsyncsendV2Request.Body body;
        private OapiMessageCorpconversationAsyncsendV2Request.Head head;
        private String messageUrl;
        private String pcMessageUrl;

        public OA() {
        }
    }

    public static class Head {
        private String bgcolor;
        private String text;

        public Head() {
        }
    }

    public static class Body {
        private String author;
        private String content;
        private String fileCount;
        private List<OapiMessageCorpconversationAsyncsendV2Request.Form> form;
        private String image;
        private OapiMessageCorpconversationAsyncsendV2Request.Rich rich;
        private String title;

        public Body() {
        }
    }

    public static class Form {
        private String key;
        private String value;

        public Form() {
        }
    }

    public static class Rich {
        private String num;
        private String unit;

        public Rich() {
        }
    }

    public static class Voice {
        private String duration;
        private String mediaId;

        public Voice() {
        }
    }

    public static class File {
        private String mediaId;

        public File() {
        }
    }

    public static class Link {
        private String messageUrl;
        private String picUrl;
        private String text;
        private String title;

        public Link() {
        }

        public String getMessageUrl() {
            return this.messageUrl;
        }

        public void setMessageUrl(String messageUrl) {
            this.messageUrl = messageUrl;
        }

        public String getPicUrl() {
            return this.picUrl;
        }

        public void setPicUrl(String picUrl) {
            this.picUrl = picUrl;
        }

        public String getText() {
            return this.text;
        }

        public void setText(String text) {
            this.text = text;
        }

        public String getTitle() {
            return this.title;
        }

        public void setTitle(String title) {
            this.title = title;
        }
    }

    public static class Image {
        private String mediaId;

        public Image() {
        }
    }

    public static class Text {
        private String content;

        public Text() {
        }
    }
}
