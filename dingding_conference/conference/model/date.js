class T_DATE {
    getDateArr(arr) {
        console.log('arr');
        console.log(arr);
        let new_arr = {};
        for (let i = 0, len = arr.length; i < len; i++) {
            let Month_index = arr[i].time.lastIndexOf('-');// 从右向左查某个指定的字符串在字符串中最后一次出现的位置（也就是从后往前查）
            console.log(Month_index);// 月份索引 7
            let time = arr[i].time.substr(0, Month_index);
            console.log(time);// 2019-1
            if (!new_arr[time]) {
                new_arr[time] = [];
                new_arr[time].push(arr[i])
            } else {
                new_arr[time].push(arr[i])
            }

        }
        return new_arr;
    }
}
export {
    T_DATE
}