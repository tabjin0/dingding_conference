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
require('../../components/conference/card/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../tab-ui/grid-item/grid-item?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../tab-ui/grid/grid?hash=d98445a8b60f69d55d082582797fad2613bc8ea7');
require('../../tab-ui/layout/card/card?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/conference/card-note/card-note?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/conference/card-detail-word/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/conference/operation-detail-page/operation-detail-page?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../tab-ui/base/icon/icon?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../tab-ui/navigation/tabbar/tabbar?hash=e09cd98b603918194423e56b7952a1417f04166d');
require('../../tab-ui/view/tag/tag?hash=2558741cd602df6fa15aac0ed5d9fcbe13ee17f5');
require('../../page/index/index?hash=00bf0e561e332227b53ee7be0309f10fcb4f37ee');
require('../../page/statisticalReport/statisticalReport/statisticalReport?hash=53737d573c4f0d0020eb999ae57129c05813c667');
require('../../page/templates/labelTemplate/labelTemplate?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/templates/collapse/collapse?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/organization/myOrganization/myOrganization?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/organization/singleMember/singleMember?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/conference/add/add?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/conference/note/note?hash=8139af7546a547eedd25a4a1c3e5929cb9d8ca04');
require('../../page/conference/summary/summary?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/conference/detail/detail?hash=08fcc8476b13923634a34e8db841ae1d165fa908');
require('../../page/conference/meetingRoom/meetingRoom?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/conference/photo/photo?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/conference/takeOff/takeOff?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/meetingAgenda/conferenceDetail/conferenceDetail?hash=1eaa213fec9512b99ab3d0afcf362e957f040530');
require('../../page/conference/noteEdit/noteEdit?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/test/test?hash=c48e2f8d9efa3931f2bd78b7f6c346355ce0bad7');
require('../../page/conference/checkIn/checkIn?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}