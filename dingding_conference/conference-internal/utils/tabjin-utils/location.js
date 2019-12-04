class LocationUtilsCustomized {
    /**
     * 计算两经纬度之间的距离，单位是km
     */
    static getFlatternDistance(lat1, lng1, lat2, lng2) {
        const PI = Math.PI;
        const EARTH_RADIUS = 6378137.0;
        const radio = PI / 180.0;

        let f = ((lat1 + lat2) / 2) * radio;
        let g = ((lat1 - lat2) / 2) * radio;
        let l = ((lng1 - lng2) / 2) * radio;
        let sg = Math.sin(g)
        let sl = Math.sin(l)
        let sf = Math.sin(f)

        let s, c, w, r, d, h1, h2
        let a = EARTH_RADIUS
        let fl = 1 / 298.257

        sg = sg * sg
        sl = sl * sl
        sf = sf * sf

        s = sg * (1 - sl) + (1 - sf) * sl
        c = (1 - sg) * (1 - sl) + sf * sl

        w = Math.atan(Math.sqrt(s / c))
        r = Math.sqrt(s * c) / w
        d = 2 * w * a
        h1 = (3 * r - 1) / 2 / c
        h2 = (3 * r + 1) / 2 / s

        console.log('d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg)) / 1000', d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg)) / 1000);
        return d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg)) / 1000
    }

    /**
     * 计算两经纬度之间的距离，单位是km
     * @param lat1 {number} 纬度1
     * @param lng1 {number} 经度1
     * @param lat2 {number} 纬度2
     * @param lng2 {number} 经度1
     * @returns {number}
     */
    // static getFlatternDistance(lat1, lng1, lat2, lng2) {
    //     const PI = Math.PI
    //     const EARTH_RADIUS = 6378137.0
    //
    //     let f = this._getRad((lat1 + lat2) / 2)
    //     let g = this._getRad((lat1 - lat2) / 2)
    //     let l = this._getRad((lng1 - lng2) / 2)
    //     let sg = Math.sin(g)
    //     let sl = Math.sin(l)
    //     let sf = Math.sin(f)
    //
    //     let s, c, w, r, d, h1, h2
    //     let a = EARTH_RADIUS
    //     let fl = 1 / 298.257
    //
    //     sg = sg * sg
    //     sl = sl * sl
    //     sf = sf * sf
    //
    //     s = sg * (1 - sl) + (1 - sf) * sl
    //     c = (1 - sg) * (1 - sl) + sf * sl
    //
    //     w = Math.atan(Math.sqrt(s / c))
    //     r = Math.sqrt(s * c) / w
    //     d = 2 * w * a
    //     h1 = (3 * r - 1) / 2 / c
    //     h2 = (3 * r + 1) / 2 / s
    //
    //     return d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg)) / 1000
    // }

    static _getRad(d) {
        return d * Math.PI / 180.0;
    }

    getGreatCircleDistance(lat1, lng1, lat2, lng2) {
        let that = this;
        let EARTH_RADIUS = 6378137.0;    //单位m
        let radLat1 = that.getRad(lat1);
        let radLat2 = that.getRad(lat2);

        let a = radLat1 - radLat2;
        let b = that.getRad(lng1) - that.getRad(lng2);

        let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
        s = s * EARTH_RADIUS;
        s = Math.round(s * 10000) / 10000.0;

        return s;
    }

    /**
     * 计算时间差
     */
    static timeOffset(time) {
        var time1Date = new Date(time.replace(/-/g, "/"));// 会议时间
        var time2Date = new Date(app.getDate().replace(/-/g, "/"));// 当前时间
        console.log(time1Date);
        console.log(time2Date);

        console.log(parseInt(time1Date - time2Date));//两个时间相差的毫秒数
        console.log(parseInt(time1Date - time2Date) / 1000);//两个时间相差的秒数
        console.log(parseInt(time1Date - time2Date) / 1000 / 60);//两个时间相差的分钟数
        console.log(parseInt(time1Date - time2Date) / 1000 / 60);//两个时间相差的小时数

        return parseInt(time1Date - time2Date) / 1000;
    }
}

export {
    LocationUtilsCustomized
}