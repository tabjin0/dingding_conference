package com.convert.typeConvert;

import java.util.Arrays;
import java.util.List;

public class StringArray2List {

    public static List<String> convert(String[] arr) {
        List<String> list = Arrays.asList(arr);
        return list;
    }
}
