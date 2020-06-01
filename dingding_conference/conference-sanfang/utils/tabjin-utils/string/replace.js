/**
 * dingding_conference  replace
 * Created by Tabjin 2020-03-24-15-22
 */

class StringReplace {
    constructor() {
    }

    /**
     * / 2 -
     * @param targetString {string}
     * @returns {void | string | *}
     */
    static slash2hyphen(targetString) {
        return targetString.replace(/\//g, '-');
    }
}

export {
    StringReplace
}
