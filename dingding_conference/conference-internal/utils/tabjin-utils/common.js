class Common {
    /**
     * 判空
     * @param param
     * @returns {boolean}
     */
    static isNull(param) {
        if (param == '') {
            return true;
        } else if (param == null) {
            return true;
        } else if (param == undefined) {
            return true;
        }
        return false;
    }

    /**
     * 判断item是否在数组中
     * @param arr 数组
     * @param item 待检测元素
     * @returns {boolean}
     */
    static inArray(arr, item) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == item) {
                return true;
            }
        }
        return false;
    }
}

export {
    Common
}