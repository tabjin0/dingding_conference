class Common {

    static isEmpty(_obj) {
        if (typeof _obj == "undefined" || _obj == null || _obj == "") {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 判空
     * @param param
     * @returns {boolean}
     */
    static isNull(_param) {

        if (!_param && typeof (_param) != 'undefined' && _param != 0) {
            return true;
        }
        return false;
    }

    static isUndefined(_param) {
        if (typeof (_param) === "undefined") {
            return true;
        }
    }

    static isNaN(_param) {
        if (isNaN(_param)) {
            return true;
        }
        return false;
    }

    static isObjectNull(_object) {
        if (_object) {
            return true;
        }
        return false;
        // if (Object.keys(_object)) {
        //     return true;
        // }
        // return false;
    }

    /**
     * 判断数组是否为空
     * @param _array
     * @returns {boolean}
     */
    static isArrayNull(_array) {
        if (_array.length === 0) {
            return true;
        } else {
            return false;
        }
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