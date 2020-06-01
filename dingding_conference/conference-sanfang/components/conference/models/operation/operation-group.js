import {OperationButtonStatus} from "./enum";
import {ImgUrl} from "../../../../config/imgConstant";

class OperationGroup {

    // 主管按钮
    adminOperation = [
        {
            index: 0,
            operation: 'locationCheckCurrentConference',
            name: "签到",
            status: true,
            img: `${ImgUrl.CHECKIN}`
        },
        {
            index: 1,
            operation: 'toPhoto',
            name: "照片",
            status: true,
            img: `${ImgUrl.PHOTO}`
        },
        {
            index: 2,
            operation: 'summary',
            name: "纪要",
            status: true,
            img: `${ImgUrl.SUMMARY}`
        },
    ];

    // 普通按钮
    commonOperation = [
        {
            index: 0,
            operation: 'takeOff',
            name: "请假",
            status: true,
            img: `${ImgUrl.TAKEOFF}`
        },
        {
            index: 1,
            operation: 'locationCheckCurrentConference',
            name: "签到",
            status: true,
            img: `${ImgUrl.CHECKIN}`
        },
        {
            index: 2,
            operation: 'note',
            name: "笔记",
            status: true,
            img: `${ImgUrl.NOTE}`
        },
    ];
}

export {
    OperationGroup
}