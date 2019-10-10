import { Http } from '../utils/http';

class CheckIn {
    static async submitCheckInInfo({
        mid,
        uid,
        address,
        distance,
        leaveType,
        leaveReason
    }) {
        return await Http.request({
            url: '5d8b1a59f20b8',
            data: {
                mid: mid,
                uid: uid,
                address: address,
                distance: distance,
                leaveType: leaveType,
                leaveReason: leaveReason
            },

        })
    }

    /**
    * 计算两个经纬度的距离(千米)
    */
    static async getDistance(lat1, lng1, lat2, lng2) {
        var radLat1 = lat1 * Math.PI / 180.0;
        var radLat2 = lat2 * Math.PI / 180.0;
        var a = radLat1 - radLat2;
        var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
            Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
        s = s * 6378.137;// EARTH_RADIUS;
        s = Math.round(s * 10000) / 10000;
        return await s;
    }

    getRad(d) {
        return d * Math.PI / 180.0;
    }

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

        return d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg)) / 1000
    }



}

export {
    CheckIn
}