/**
 * 钉钉版本 导航栏
 */

import {promisic} from "../../utils";

class Navigate {
    /**
     * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
     * @param url {string} 需要跳转的 tabBar 页面的路径 (代码包路径)（需在 app.json 的 tabBar 字段定义的页面），路径后不能带参数。
     */
    static async switchTab(url) {
        return await promisic(dd.switchTab)({
            url: url
        });
    }

    /**
     * 保留当前页面，跳转到应用内的某个指定页面，可以使用 dd.navigateBack 返回到原来页面。
     * 注意：页面最大深度为5，即可连续调用 5 次 navigateTo
     * dd.navigateTo 和 dd.redirectTo 不允许跳转到 tabbar 页面；如果需要跳转到 tabbar 页面，请使用 dd.switchTab。
     * @param url {string} 需要跳转的应用内非 tabBar 的目标页面路径 ,路径后可以带参数。参数规则如下：路径与参数之间使用?分隔，参数键与参数值用=相连，不同参数必须用&分隔；如 path?key1=value1&key2=value2
     * @returns {Promise<*>}
     */
    static async navigateTo(url) {
        return await promisic(dd.navigateTo)({
            url: url
        });
    }

    /**
     * 关闭当前页面，跳转到应用内的某个指定页面。
     * dd.navigateTo 和 dd.redirectTo 不允许跳转到 tabbar 页面；如果需要跳转到 tabbar 页面，请使用 dd.switchTab。
     * @param url {string} 需要跳转的应用内非 tabBar 的目标页面路径 ,路径后可以带参数。参数规则如下：路径与参数之间使用?分隔，参数键与参数值用=相连，不同参数必须用&分隔；如 path?key1=value1&key2=value2
     * @returns {Promise<*>}
     */
    static async redirectTo(url) {
        return await promisic(dd.navigateTo)({
            url: url
        });
    }

    /**
     * 关闭当前页面，返回上一级或多级页面。可通过 getCurrentPages 获取当前的页面栈信息，决定需要返回几层。
     * @param delta {Number} 返回的页面数，如果 delta 大于现有打开的页面数，则返回到当前页面栈最顶部的页
     * @returns {Promise<*>}
     */
    static async navigateBack(delta) {
        return await promisic(dd.navigateBack)({
            delta: delta
        });
    }

    /**
     * 关闭当前所有页面，跳转到应用内的某个指定页面。
     * @param url {string} 需要跳转的应用内非 tabBar 的目标页面路径 ,路径后可以带参数。参数规则如下：路径与参数之间使用?分隔，参数键与参数值用=相连，不同参数必须用&分隔；如 path?key1=value1&key2=value2
     * @returns {Promise<*>}
     */
    static async reLaunch(url) {
        return await promisic(dd.reLaunch)({
            url: url
        });
    }

    /**
     * 设置导航栏文字及样式。
     * @param title {string} 导航栏标题
     * @param backgroundColor {string} 导航栏背景色，支持十六进制颜色值
     * @param reset {boolean} 是否重置导航栏为钉钉默认配色，默认 false
     * @returns {Promise<*>}
     */
    static async setNavigationBar(title, backgroundColor, reset = false) {
        return await promisic(dd.setNavigationBar)({
            title: title,
            backgroundColor: backgroundColor,
            reset: reset
        });
    }
}

export {
    Navigate
}