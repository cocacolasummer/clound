import Global from '@/reducer/global/global';

import MeetingTimePicker from '@/reducer/meeting/timepicker';
import MeetingList from '@/reducer/meeting/meetinglist';
import MeetingTemp from '@/reducer/meeting/meetingtemp';
import MeetingEditor from '@/reducer/meeting/meetingeditor';
import MeetingStatistic from '@/reducer/meeting/meetingstatistic';
import MeetingSeat from '@/reducer/meeting/meetingseat';
import MeetingDetail from '@/reducer/meeting/meetingDetail';
import MeetingRecord from '@/reducer/meeting/meetingRecord';
import SeatList from '@/reducer/seat/seatlist';
import VoteList from '@/reducer/vote/votelist';
import VoteEditor from '@/reducer/vote/voteeditor';
import VoteDetail from '@/reducer/vote/voteDetail';
import AccessUserType from '@/reducer/access/userTypeList';
import AccessUserTypeEditor from '@/reducer/access/userTypeEditor';
import AccessGroup from '@/reducer/access/groupList';
import AccessGroupEditor from '@/reducer/access/accessGroupEditor';
import AccessManage from '@/reducer/access/accessManage';
import AccessManageEditor from '@/reducer/access/accessManageEditor';
import AccessUserBlack from '@/reducer/access/accessUserBlack';
import AccessUserBlackEditor from '@/reducer/access/accessUserBlackEditor';
import AccessHolidayPass from '@/reducer/access/accessHolidayPass';
import AccessHolidayPassEditor from '@/reducer/access/accessHolidayPassEditor';
import AccessPassRecord from '@/reducer/access/accessPassRecord';
import AccessPassRecordByRoom from '@/reducer/access/accessPassRecordByRoom';
import LogisticsList from '@/reducer/logistics/logisticsList';
import LogisticsEditor from '@/reducer/logistics/logisticsEditor';
import LogisticsDetail from '@/reducer/logistics/logisticsDetail';
import LogisticsClassify from '@/reducer/logistics/logisticsClassify';
import LogisticsGoods from '@/reducer/logistics/logisticsGoods';

import ShortMessageStatistic from '@/reducer/shortMessage/shortMessageStatistic';
import VoucherCenter from '@/reducer/shortMessage/voucherCenter';
import VoucherRecord from '@/reducer/shortMessage/voucherRecord';
import GetVoucherInvoice from '@/reducer/shortMessage/getVoucherInvoice';
import VoucherInvoiceList from '@/reducer/shortMessage/voucherInvoiceList';
import {combineReducers} from 'redux';

const reducers = combineReducers({
    Global,
    MeetingTimePicker,
    MeetingList,
    MeetingTemp,
    MeetingStatistic,
    MeetingSeat,
    MeetingEditor,
    MeetingDetail,
    MeetingRecord,
    SeatList,
    VoteList,
    VoteEditor,
    VoteDetail,
    AccessUserType,
    AccessUserTypeEditor,
    AccessGroup,
    AccessGroupEditor,
    AccessManage,
    AccessManageEditor,
    AccessUserBlack,
    AccessUserBlackEditor,
    AccessHolidayPass,
    AccessHolidayPassEditor,
    AccessPassRecord,
    AccessPassRecordByRoom,
    LogisticsList,
    LogisticsEditor,
    LogisticsDetail,
    LogisticsClassify,
    LogisticsGoods,
    ShortMessageStatistic,
    VoucherCenter,
    VoucherRecord,
    GetVoucherInvoice,
    VoucherInvoiceList
});

export default reducers;