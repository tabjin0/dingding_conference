import {config} from "../../config/config";
import {UploadDownLoad} from "../../utils/tabjin-utils/uploadDownLoad";


class Upload {
    static async uploadImg(filePath, fileName) {
        return await UploadDownLoad.upload({
            url: `${config.apiUpload}`,
            filePath,
            fileName,
            fileType: 'image',// 文件类型，image / video
            header: {// 'Content-Type': 'application/json',
                'version': 'v3.0',
                'access-token': ''
            },//HTTP 请求 Header
            // formData: {}//HTTP 请求中其他额外的 form 数据
        });
    }
}

export {
    Upload
}