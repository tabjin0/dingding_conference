import { config } from "../config/config";
import { promisic } from "../utils/utils";

class Http {
    static async request({
        url,
        data,
        dataType = 'json',
        method = 'GET',
        headers
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

    static async request2({
        url,
        data,
        dataType = 'json',
        method = 'POST'
    }) {// 传入对象
        const res = await promisic(dd.httpRequest)({
            url: `${config.domain}${url}`,// 因为apiBaseUrl是一个固定的配置
            method,
            data,
            dataType,
        });
        return res.data;
    }
}

export {
    Http
}