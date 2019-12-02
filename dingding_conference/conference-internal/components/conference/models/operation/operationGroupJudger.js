import {OperationGroup} from "./operation-group";
import {OperationButtonStatus} from "./enum";
import {ImgUrl} from "../../../../config/imgConstant";


class OperationGroupJudger {
    operationGroup

    constructor(signType) {
        // this.operationGroup = operationGroup
        this._initCurrentOperationStatus(signType);
    }


    /**
     * 切换按钮状态
     * @param signType 签到类型
     * @param adminOperation 主管按钮
     * @param commonOperation 党员按钮
     * @private
     */
    _initCurrentOperationStatus(signType) {
        let operationGroup = new OperationGroup();
        let adminOperation = operationGroup.adminOperation;
        let commonOperation = operationGroup.commonOperation;
        this.operationGroup = this.__changeCurrentOperationStatus(signType, adminOperation, commonOperation);
    }

    __changeCurrentOperationStatus(signType, adminOperation, commonOperation) {
        // 主管： 0 签到 1 照片 2 纪要
        // 党员： 0 请假 1 签到 2 笔记
        switch (signType) {
            case 0:// 未签到，不禁用签到按钮
                adminOperation[0].status = OperationButtonStatus.ALLOW;
                commonOperation[1].status = OperationButtonStatus.ALLOW;
                break;
            case 1:// 已签到，禁用签到按钮
                // 管理员禁用签到按钮，显示已签到
                adminOperation[0].status = OperationButtonStatus.DISALLOW;
                adminOperation[0].name = '已签到';
                adminOperation[0].img = `${ImgUrl.CHECKINED}`;
                // 禁用党员请假按钮
                commonOperation[0].status = OperationButtonStatus.DISALLOW;
                commonOperation[0].img = `${ImgUrl.TAKEOFF}`;
                // 禁用签到按钮
                commonOperation[1].status = OperationButtonStatus.DISALLOW;
                commonOperation[1].name = '已签到';
                commonOperation[1].img = `${ImgUrl.CHECKINED}`;
                break;
            case 2:// 签到迟到
                // 禁用管理员签到按钮
                adminOperation[0].status = OperationButtonStatus.DISALLOW;
                adminOperation[0].name = '已迟到';
                adminOperation[0].img = `${ImgUrl.LATE}`;
                // 禁用党员请假按钮
                commonOperation[0].status = OperationButtonStatus.DISALLOW;
                commonOperation[0].img = `${ImgUrl.TAKEOFF}`;
                // 禁用党员签到按钮
                commonOperation[1].status = OperationButtonStatus.DISALLOW;
                commonOperation[1].name = '已迟到';
                commonOperation[1].img = `${ImgUrl.LATE}`;

                break;
            case 3:// 请假
                // 禁用党员请假按钮
                commonOperation[0].status = OperationButtonStatus.DISALLOW;
                commonOperation[0].name = '已请假';
                commonOperation[0].img = `${ImgUrl.CHECKINED}`;
                // 禁用党员签到按钮
                commonOperation[1].status = OperationButtonStatus.DISALLOW;
                break;
        }
        return {
            adminOperation,
            commonOperation
        }
    }
}

export {
    OperationGroupJudger
}