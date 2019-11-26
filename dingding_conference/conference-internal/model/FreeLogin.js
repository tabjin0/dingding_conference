import {User} from "./users";
import {Storage} from "../utils/storage";

/**
 * 用户免登模块
 */

class FreeLogin {
    /**
     * 用户登录并进入缓存
     * @param authCode
     * @param corpId
     * @returns {Promise<void>}
     *
     {
	"active": true,
	"avatar": "https://static-legacy.dingtalk.com/media/lADPDgQ9rMrUgnbNAzTNAzU_821_820.jpg",
	"department": [143414386],
	"email": "",
	"errcode": 0,
	"errmsg": "ok",
	"isAdmin": true,
	"isBoss": false,
	"isHide": false,
	"isLeaderInDepts": "{143414386:true}",
	"isSenior": false,
	"jobnumber": "",
	"mobile": "18952594881",
	"name": "张进",
	"openId": "eVUkKaegVEoI1D3lGJ6PDgiEiE",
	"orderInDepts": "{143414386:180012095089372660}",
	"position": "",
	"remark": "",
	"roles": [{
		"groupName": "默认",
		"id": 427106940,
		"name": "主管理员",
		"type": 101
	}, {
		"groupName": "默认",
		"id": 427106943,
		"name": "主管",
		"type": 104
	}],
	"stateCode": "86",
	"tags": [],
	"tel": "",
	"unionid": "eVUkKaegVEoI1D3lGJ6PDgiEiE",
	"userid": "1219441916791739",
	"workPlace": ""
}
     */
    static async freeLogin(authCode, corpId) {
        // dd.showLoading({content: '加载中...'});
        // {authCode: "46f4d5f8748b3c31a1b5ae2ebc5e2775"}
        const currentUser = await User.getCurrentUser(authCode, corpId); // 网络获取钉钉返回的当前用户信息 ok
        // 总管理员
        Storage.setStorageSyncByKeyAndValue('isAdmin', currentUser.isAdmin);

        // 部门
        let department = currentUser.department[0];
        let isLeaderInDeptsStr = currentUser.isLeaderInDepts.replace(/(\d+):/g, "\"$1\":");
        let isLeaderInDepts = JSON.parse(isLeaderInDeptsStr);
        Storage.setStorageSyncByKeyAndValue('currentUser', currentUser);
        Storage.setStorageSyncByKeyAndValue('isLeaderInDepts', isLeaderInDepts[department]);
        Storage.setStorageSyncByKeyAndValue('user', currentUser.userid);// ok
        if (isLeaderInDepts[department]) {
            // 部门主管
            Storage.setStorageSyncByKeyAndValue('administrator', currentUser.userid);// ok

        } else {
            // 非部门主管
        }
        console.log(currentUser);
        return {
            currentUser: currentUser,
            isLeaderInDepts: isLeaderInDepts
        };
    }
}

export {
    FreeLogin
}