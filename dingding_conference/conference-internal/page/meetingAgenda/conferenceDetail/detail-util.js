class DetailUtil {
    readInfo;
    isReadInfoArrayNull;

    constructor(readInfo) {
        this.readInfo = readInfo;
    }

    // 1. 判断阅读人员的数组是否为空，空返回true，非空false
    isReadInfoArrayNull() {
        console.log('this.readInfo', this.readInfo);
        const isReadNull = this.readInfo.some(read => {
            console.log('read', read);
            return read.length === 0;
        })
        if (isReadNull) {
            return;
        }
    }

}

export {
    DetailUtil
}