import {promisic} from "./utils";

class UploadDownLoad {
    static async uploadImg(
        {
            url,//开发者服务器地址
            filePath,//要上传文件资源的本地定位符
            fileName,// 文件名，即对应的 key, 开发者在服务器端通过这个 key 可以获取到文件二进制内容
            fileType = 'image',// 文件类型，image / video
            header = {},//HTTP 请求 Header
            formData = {}//HTTP 请求中其他额外的 form 数据
        }
    ) {
        const res = await promisic(dd.uploadFile)({
            url,
            filePath,
            fileName,
            fileType,
            header,
            formData
        })
        return res;
    }
}

export {
    UploadDownLoad
}