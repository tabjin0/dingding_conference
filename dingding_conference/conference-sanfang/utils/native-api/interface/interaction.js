/**
 * 钉钉版本交互模型
 */
import {promisic} from "../../utils";

class InterAction {
    static fnAlert(title, content, buttonText) {
        dd.alert({
            title: title,
            content: content,
            buttonText: buttonText,
            success: () => {

            },
        });
    }

    static async fnConfirm(title, content, confirmButtonText) {
        const res = await promisic(dd.confirm)({
            title: title,
            content: content,
            confirmButtonText: confirmButtonText,
            cancelButtonText: cancelButtonText,
            // title: '温馨提示',
            // content: '您是否想查询快递单号：
            // 1234567890',
            // confirmButtonText: '马上查询',
            // cancelButtonText: '暂不需要',
        });
    }

    /**
     * 显示一个弱提示
     * @param {string} content 文字内容
     * @param {string} type toast 类型，展示相应图标，默认 none，支持 success / fail / exception / none。其中 exception 类型必须传文字信息
     * @param {number} duration 显示时长，单位为 ms，默认 2000。按系统规范，android只有两种(<=2s >2s)
     */
    static fnShowToast(content, type, duration) {
        dd.showToast({
            content: content,
            type: type,
            duration: duration,
            success: () => {
            },
        });
    }

    static fnShowLoading(content) {
        dd.showLoading({
            content: content,
        });
    }

    static fnHideLoading() {
        dd.hideLoading();
    }
}

export {
    InterAction
}