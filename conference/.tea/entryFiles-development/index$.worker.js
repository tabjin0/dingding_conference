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
require('../../page/conferenceManagement/addConference/addConference');
require('../../page/index/index');
require('../../page/conferenceManagement/conferenceManager/conferenceManager');
require('../../page/statisticalReport/statisticalReport/statisticalReport');
require('../../page/issueDeclaration/issueDeclaration/issueDeclaration');
require('../../page/meetingAgenda/meetingAgenda/meetingAgenda');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}