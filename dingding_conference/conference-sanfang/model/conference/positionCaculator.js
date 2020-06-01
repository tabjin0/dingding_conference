import {LocationUtils} from "../../utils/native-api/location/location";
import {LocationUtilsCustomized} from "../../utils/tabjin-utils/location";

/**
 * dingding_conference  positionCaculator
 * Created by Tabjin 2020-03-24-11-53
 */

class PositionCaculator {
    location;// 经纬度
    constructor(location) {
        this.location = location;
    }

    async CacuDistance() {
        if (this.location) {
            const location = this.location.split(',');
            let longitude = parseFloat(location[0]);// 纬度
            let latitude = parseFloat(location[1]);// 经度（大）

            // 当前定位经纬度
            const res = await LocationUtils.fnGetLocation();
            const currentLongitude = parseFloat(res.longitude);
            const currentLatitude = parseFloat(res.latitude);

            const distance = LocationUtilsCustomized.getFlatternDistance(latitude, longitude, currentLatitude, currentLongitude);
            return {
                distance: distance,
                currentLocation: res
            };
        }
    }
}

export {
    PositionCaculator
}
