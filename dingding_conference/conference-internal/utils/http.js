import {config} from "../config/config";
import {promisic} from "../utils/utils";
import {Caching} from "./native-api/caching/caching";

class Http {
    static async request({
                             url,
                             data = {},
                             dataType = 'json',
                             method = 'GET',
                             headers
                         }) {// 传入对象
        const res = await promisic(dd.httpRequest)({
            url: `${config.apiBaseUrl}${url}`,// 因为apiBaseUrl是一个固定的配置
            method,
            data: Object.assign(
                data,
                {

                    orgId: await Caching.getStorageSync('orgId') == null ? NaN : await Caching.getStorageSync('orgId'),
                    orgPid: config.orgPid,
                    corpId: dd.corpId ? dd.corpId : ''
                }
            ),
            dataType,
            headers: {
                // 'Content-Type': 'application/json',
                'version': 'v3.0',
                'access-token': ''
            },
        });
        return res.data;
    }

    static async requestPost({
                                 url,
                                 data = {},
                                 dataType = 'json',
                                 method = 'POST',
                                 headers
                             }) {// 传入对象
        const res = await promisic(dd.httpRequest)({
            url: `${config.apiBaseUrl}${url}`,// 因为apiBaseUrl是一个固定的配置
            method,
            data: Object.assign(
                data,
                {

                    orgId: await Caching.getStorageSync('orgId') == null ? NaN : await Caching.getStorageSync('orgId'),
                    orgPid: config.orgPid,
                    corpId: dd.corpId ? dd.corpId : ''
                }
            ),
            dataType,
            headers: {
                // 'Content-Type': 'application/json',
                'version': 'v3.0',
                'access-token': ''
            },
        });
        return res.data;
    }

    static async request2({
                              url,
                              data = {},
                              dataType = 'json',
                              method = 'GET'
                          }) {// 传入对象
        const res = await promisic(dd.httpRequest)({
            url: `${config.apiBaseUrl}${url}`,// 因为apiBaseUrl是一个固定的配置
            method,
            data,
            dataType,
            headers: {
                // 'Content-Type': 'application/json',
                'version': 'v3.0',
                'access-token': ''
            },
        });
        return res.data;
    }
}

export {
    Http
}
