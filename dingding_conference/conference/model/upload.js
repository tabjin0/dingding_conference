import {UploadDownLoad} from "../utils/uploadDownLoad";
import {config} from "../config/config";

class Upload {
    static async uploadImg(filePath, fileName) {
        return await UploadDownLoad.uploadImg({
            url: `${config.apiBaseUrl}`,
            filePath,
            fileName,
            fileType: 'image',// 文件类型，image / video
            header: {},//HTTP 请求 Header
            formData: {}//HTTP 请求中其他额外的 form 数据
        });
    }
}

export {
    Upload
}