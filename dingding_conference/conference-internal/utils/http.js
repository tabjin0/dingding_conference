import {config} from "../config/config";
import {promisic} from "../utils/utils";

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
            data: Object.assign(data, {orgPid: 1}),
            dataType,
            headers: {
                // 'Content-Type': 'application/json',
                'version': 'v3.0',
                'access-token': ''
            },
        });
        // console.log('Object.assign(data,{orgId:\'\'}),');
        // console.log(Object.assign(data, {orgId: 1}));
        // console.log((Object.assign(data, {orgId: 1})).code);
        // console.log('Object.assign(data,{orgId:\'\'}),');
        return res.data;
    }

    static async request2({
                              url,
                              data,
                              dataType = 'json',
                              method = 'POST'
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