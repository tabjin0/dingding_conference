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
require('../../page/index/index?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/meetingAgenda/addConference/addConference?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/statisticalReport/statisticalReport/statisticalReport?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/meetingAgenda/conferenceDetail/conferenceDetail?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/templates/labelTemplate/labelTemplate?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/templates/collapse/collapse?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/meetingAgenda/bookMeetingRoom/bookMeetingRoom?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/index/search/search?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/index/addMeetingSummary/addMeetingSummary?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/index/notes/notes?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/meetingAgenda/takeOff/takeOff?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/organization/myOrganization/myOrganization?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/meetingAgenda/photo/photo?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/organization/singleMember/singleMember?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/test/test?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}