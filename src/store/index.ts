import {createStore, Store} from 'redux';
import reducers from '@/reducer';

import {GlobalState} from '@/store/global/global';

import {MeetingListState} from '@/store/meeting/meetinglist';
import {MeetingTempState} from '@/store/meeting/meetingTemp';
import {MeetingTimePickerState} from '@/store/meeting/meetingTimePicker';
import {MeetingEditorState} from '@/store/meeting/meetingEditor';
import {MeetingStatisticState} from '@/store/meeting/meetingStatistic';
import {MeetingSeatState} from '@/store/meeting/meetingSeat';
import {MeetingDetailState} from '@/store/meeting/meetingDetail';
import {MeetingRecordState} from "@/store/meeting/meetingRecord";

import {SeatListState} from '@/store/seat/seatList';

import {VoteListState} from '@/store/vote/voteList';
import {VoteEditorState} from '@/store/vote/voteEditor';
import {VoteDetailState} from '@/store/vote/voteDetail';

import {AccessUserTypState} from '@/store/access/userType';
import {UserTypeEditorState} from '@/store/access/userTypeEditor';
import {AccessGroupState} from "@/store/access/groupList";
import {AccessGroupEditorState} from '@/store/access/groupEditor';
import {AccessManageState} from '@/store/access/accessManage';
import {AccessManageEditorState} from '@/store/access/accessManageEditor';
import {AccessUserBlackState} from '@/store/access/accessUserBlack';
import {AccessUserBlackEditorState} from '@/store/access/accessUserBlackEditor';
import {AccessHolidayPassState} from '@/store/access/accessHolidayPass';
import {AccessHolidayPassEditorState} from '@/store/access/accessHolidayPassEditor';
import {AccessPassRecordState} from '@/store/access/accessPassRecord';
import {AccessPassRecordByRoomState} from "@/store/access/accessPassRecordByRoom";

import {LogisticsListState} from '@/store/logistics/logisticsList';
import {LogisticsEditorState} from '@/store/logistics/logisticsEditor';
import {LogisticsDetailState} from '@/store/logistics/logisticsDetail';
import {LogisticsClassifyState} from '@/store/logistics/logisticsClassify';
import {LogisticsGoodsState} from '@/store/logistics/logisticsGoods';

import {ShortMessageStatisticState} from '@/store/shortMessage/shortMessageStatistic';
import {VoucherCenterState} from '@/store/shortMessage/voucherCenter';
import {VoucherRecordState} from '@/store/shortMessage/voucherRecord';
import {GetVoucherInvoiceState} from '@/store/shortMessage/getVoucherInvoice';
import {VoucherInvoiceListState} from '@/store/shortMessage/voucherInvoiceList';

export interface MeetingStatisticRank {
    rank: number;
    avatar?: string;
    name: string;
    percent: number;
    time: number;
    count: number;
}

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IState {
    Global: GlobalState;
    MeetingTimePicker: MeetingTimePickerState;
    MeetingList: MeetingListState;
    MeetingTemp: MeetingTempState;
    MeetingEditor: MeetingEditorState;
    MeetingStatistic: MeetingStatisticState;
    MeetingSeat: MeetingSeatState;
    MeetingDetail: MeetingDetailState;
    MeetingRecord: MeetingRecordState;
    SeatList: SeatListState;
    VoteList: VoteListState;
    VoteEditor: VoteEditorState;
    VoteDetail: VoteDetailState;
    AccessUserType: AccessUserTypState;
    AccessUserTypeEditor: UserTypeEditorState;
    AccessGroup: AccessGroupState;
    AccessGroupEditor: AccessGroupEditorState;
    AccessManage: AccessManageState;
    AccessManageEditor: AccessManageEditorState;
    AccessUserBlack: AccessUserBlackState;
    AccessUserBlackEditor: AccessUserBlackEditorState;
    AccessHolidayPass: AccessHolidayPassState;
    AccessHolidayPassEditor: AccessHolidayPassEditorState;
    AccessPassRecord: AccessPassRecordState;
    AccessPassRecordByRoom: AccessPassRecordByRoomState;
    LogisticsList: LogisticsListState;
    LogisticsEditor: LogisticsEditorState;
    LogisticsDetail: LogisticsDetailState;
    LogisticsClassify: LogisticsClassifyState;
    LogisticsGoods: LogisticsGoodsState;
    GetVoucherInvoice: GetVoucherInvoiceState;
    VoucherInvoiceList: VoucherInvoiceListState;
    ShortMessageStatistic: ShortMessageStatisticState;
    VoucherCenter: VoucherCenterState;
    VoucherRecord: VoucherRecordState;
}

export function makeStore(): Store {
    return createStore(reducers);
}
