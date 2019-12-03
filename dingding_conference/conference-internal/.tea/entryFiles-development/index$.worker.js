if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');


var AFAppX = self.AFAppX.getAppContext
  ? self.AFAppX.getAppContext().AFAppX
  : self.AFAppX;
self.getCurrentPages = AFAppX.getCurrentPages;
self.getApp = AFAppX.getApp;
self.Page = AFAppX.Page;
self.App = AFAppX.App;
self.my = AFAppX.bridge || AFAppX.abridge;
self.abridge = self.my;
self.Component = AFAppX.WorkerComponent || function(){};
self.$global = AFAppX.$global;
self.requirePlugin = AFAppX.requirePlugin;
        


function success() {
require('../../app');
require('../../components/conference/card/index');
require('../../components/conference/card-detail-word/index');
require('../../components/conference/operation-detail-page/operation-detail-page');
require('../../page/index/index');
require('../../page/statisticalReport/statisticalReport/statisticalReport');
require('../../page/templates/labelTemplate/labelTemplate');
require('../../page/templates/collapse/collapse');
require('../../page/organization/myOrganization/myOrganization');
require('../../page/organization/singleMember/singleMember');
require('../../page/conference/add/add');
require('../../page/conference/note/note');
require('../../page/conference/summary/summary');
require('../../page/conference/detail/detail');
require('../../page/conference/meetingRoom/meetingRoom');
require('../../page/conference/photo/photo');
require('../../page/conference/takeOff/takeOff');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}