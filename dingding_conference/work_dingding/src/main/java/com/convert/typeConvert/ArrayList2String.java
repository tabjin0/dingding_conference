package com.convert.typeConvert;

import java.util.List;

/**
 * 将List<String>转化为String字符串显示，元素之间用","隔开
 */
public class ArrayList2String<T> {

    public static<T> String convert(List<T> list) {

        if (list == null || list.size() == 0) {
            return null;
        }

        Boolean isFirst = true;
        StringBuffer result = new StringBuffer();
        for(T s: list){
            if(isFirst){
                isFirst = false;
            }else {
                result.append(",");
            }
            result.append(s);
        }
        return result.toString();
    }
}
