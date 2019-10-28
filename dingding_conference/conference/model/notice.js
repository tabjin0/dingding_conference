/**
 * 通知模型
 */
import {Http} from "../utils/http";

class Notice {
    /**
     * 发送工作通知
     * @param userIdList
     * @param toAllUser
     * @param msgType
     * @param textContent
     * @param imageMediaId
     * @param fileMediaId
     * @param linkTitle
     * @param linkText
     * @param linkMessageUrl
     * @param linkPicUrl
     * @param markdownText
     * @param markdownTitle
     * @param oaText
     * @param oaContent
     * @param actionCardTitle
     * @param actionCardtMarkdown
     * @param actionCardSingleTitle
     * @param actionCardSingleUrl
     * @returns {Promise<*>}
     */
    static async submitNoticeInfo(
        {
            userIdList,
            toAllUser,
            msgType,
            textContent,
            imageMediaId,
            fileMediaId,
            linkTitle,
            linkText,
            linkMessageUrl,
            linkPicUrl,
            markdownText,
            markdownTitle,
            oaText,
            oaContent,
            actionCardTitle,
            actionCardtMarkdown,
            actionCardSingleTitle,
            actionCardSingleUrl,
        }
    ) {
        return await Http.request({
            url: ``,
            data: {
                userIdList: userIdList,
                toAllUser: toAllUser,
                msgType: msgType,//
                textContent: textContent,
                imageMediaId: imageMediaId,
                fileMediaId: fileMediaId,
                linkTitle: linkTitle,
                linkText: linkText,
                linkMessageUrl: linkMessageUrl,
                linkPicUrl: linkPicUrl,
                markdownText: markdownText,
                markdownTitle: markdownTitle,
                oaText: oaText,
                oaContent: oaContent,
                actionCardTitle: actionCardTitle,
                actionCardtMarkdown: actionCardtMarkdown,
                actionCardSingleTitle: actionCardSingleTitle,
                actionCardSingleUrl: actionCardSingleUrl,
            }
        });
    }

    /**
     * 查询工作通知消息的发送结果
     * @param agentId 应用的agentid
     * @param msgTaskId 异步任务的id
     * @returns {Promise<*>}
     */
    static async getNoticeSendResult(agentId, msgTaskId) {
        return await Http.request({
            url: ``,
            data: {
                agentId: agentId,
                msgTaskId: msgTaskId
            }
        })
    }

    /**
     * 工作通知消息撤回
     * @param agentId 应用的agentid
     * @param msgTaskId 异步任务的id
     * @returns {Promise<*>}
     */
    static async recallNotice(agentId, msgTaskId) {
        return await Http.request({
            url: ``,
            data: {
                agentId: agentId,
                msgTaskId: msgTaskId
            }
        });
    }

    /**
     * 发送群消息
     * @param chatid 群会话的id，可以在调用创建群会话接口的返回结果里面获取，也可以通过dd.chooseChat获取
     * @param msg 消息内容，消息类型和样例可参考“消息类型与数据格式”文档
     * @returns {Promise<*>}
     */
    static async sendChat(chatid, msg) {
        return await Http.request({
            url: ``,
            data: {
                chatid: chatid,
                msg: msg
            }
        });
    }

    /**
     * 查询群消息已读人员列表
     * @param messageId 发送群消息接口返回的加密消息id(消息id中包含url特殊字符时需要encode后再使用)
     * @param cursor 分页查询的游标，第一次可以传0，后续传返回结果中的next_cursor的值。当返回结果中，没有next_cursor时，表示没有后续的数据了，可以结束调用
     * @param msg 分页查询的大小，最大可以传100
     * @returns {Promise<*>}
     */
    static async getChatReadList(messageId, cursor, msg) {
        return await Http.request({
            url: ``,
            data: {
                messageId: messageId,
                cursor: cursor,
                size: size
            }
        });
    }

}

export {
    Notice
}