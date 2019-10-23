if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');


var AFAppX = self.AFAppX;
self.getCurrentPages = AFAppX.getCurrentPages;
self.getApp = AFAppX.getApp;
self.Page = AFAppX.Page;
self.App = AFAppX.App;
self.my = AFAppX.bridge || AFAppX.abridge;
self.abridge = self.my;
self.Component = AFAppX.WorkerComponent || function(){};
self.$global = AFAppX.$global;


function success() {
require('../../app');
require('../../page/index/index');
require('../../page/meetingAgenda/addConference/addConference');
require('../../page/conferenceManagement/addConference/addConference');
require('../../page/conferenceManagement/conferenceManager/conferenceManager');
require('../../page/statisticalReport/statisticalReport/statisticalReport');
require('../../page/meetingAgenda/conferenceDetail/conferenceDetail');
require('../../page/templates/labelTemplate/labelTemplate');
require('../../page/templates/collapse/collapse');
require('../../page/meetingAgenda/bookMeetingRoom/bookMeetingRoom');
require('../../page/index/search/search');
require('../../page/index/addMeetingSummary/addMeetingSummary');
require('../../page/index/notes/notes');
require('../../page/meetingAgenda/takeOff/takeOff');
require('../../page/organization/myOrganization/myOrganization');
require('../../page/meetingAgenda/photo/photo');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}