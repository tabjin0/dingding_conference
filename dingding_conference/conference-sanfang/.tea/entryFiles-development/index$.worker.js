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
          

if(AFAppX.registerApp) {
  AFAppX.registerApp({
    appJSON: appXAppJson,
  });
}



function success() {
require('../../app');
require('../../components/conference/card/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../tab-ui/grid-item/grid-item?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../tab-ui/grid/grid?hash=d98445a8b60f69d55d082582797fad2613bc8ea7');
require('../../tab-ui/layout/card/card?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../tab-ui/view/popup/popup?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/test/test?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../tab-ui/base/icon/icon?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../tab-ui/form/input/input?hash=346a7901ee65439b3dc2af0c040c577549d41558');
require('../../tab-ui/base/button/button?hash=b235182c1d3b7f9d5ba9ceb40331c7cacf29e975');
require('../../components/realm/realm?hash=2b4148e06dd8631c3bde3eb9e5d11f00e244110d');
require('../../tab-ui/view/avatar/avatar?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../tab-ui/base/tip/tip?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/conference/card-note/card-note?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/conference/photo-grid/photo-grid?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/conference/operation-detail-page/operation-detail-page?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../tab-ui/navigation/tabbar/tabbar?hash=e09cd98b603918194423e56b7952a1417f04166d');
require('../../tab-ui/view/tag/tag?hash=2558741cd602df6fa15aac0ed5d9fcbe13ee17f5');
require('../../tab-ui/view/badge/badge?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../tab-ui/layout/list/list?hash=e704e01e688c1694f166e54293094334b11b508e');
require('../../node_modules/@antv/my-f2/es/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../page/index/index?hash=00bf0e561e332227b53ee7be0309f10fcb4f37ee');
require('../../page/statisticalReport/statisticalReport/statisticalReport?hash=a35e09d969ce1a9e5b36d95c18e42577336142bf');
require('../../page/templates/labelTemplate/labelTemplate?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/templates/collapse/collapse?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/organization/myOrganization/myOrganization?hash=9e4a338be3e535bd9f3f099aa3eb9c03c75042b5');
require('../../page/organization/singleMember/singleMember?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/conference/add/add?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/conference/note/note?hash=8139af7546a547eedd25a4a1c3e5929cb9d8ca04');
require('../../page/conference/summary/summary?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/conference/detail/detail?hash=d9effaf644f8a3ea75394b134741c1a9797c4d63');
require('../../page/conference/meetingRoom/meetingRoom?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/conference/photo/photo?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/conference/takeOff/takeOff?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/meetingAgenda/conferenceDetail/conferenceDetail?hash=09e665019c930a5e2d2d38fa410bd4f28bebaa61');
require('../../page/conference/noteEdit/noteEdit?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/test/test?hash=c48e2f8d9efa3931f2bd78b7f6c346355ce0bad7');
require('../../page/conference/checkIn/checkIn?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/me/me/me?hash=8830bce7ad90b2d54e1e67898b6b3ffc0dc4c9fe');
require('../../page/organization/partyBranchInfo/partyBranchInfo?hash=90b0fc9cc939aff1b2818af4f69d865fa3d52101');
require('../../page/organization/partyTeam/partyTeam?hash=9e4a338be3e535bd9f3f099aa3eb9c03c75042b5');
require('../../page/organization/partyActiveMember/partyActiveMember?hash=5edeebdcee4730eaf9fcd49aefee4a22455a5b70');
require('../../page/organization/electionSituationOfPartyBranch/electionSituationOfPartyBranch?hash=d03ff4ff87c1fc9ddde794944d1e3088752ad6b5');
require('../../page/organization/partyMembers/partyMembers?hash=9e4a338be3e535bd9f3f099aa3eb9c03c75042b5');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}