import moment from 'moment';
import {MeetingListAction, MeetingListState} from '@/store/meeting/meetinglist';

const initialState: MeetingListState = {
    kind: '2',
    status: '100',
    showType: 'table',
    date: moment(new Date()).format('YYYY-MM-DD'),
    search: '',
    list: [],
    page: 1,
    total: 0,
    limit: 8,
    detailShow: false,
    detailMount: false,
    detailId: null,
    summaryEditShow: false,
    summaryEditMount: false,
    canCheck: false,
    needCheck: false
};

export default function reducer(
    state: MeetingListState | null | undefined = initialState,
    action: MeetingListAction,
) {
    if (!state) {
        return null;
    }

    switch (action.type) {
        case 'change meetinglist data': {
            return {
                ...state,
                list: action.list,
                total: action.total,
                page: action.page,
                limit: action.limit
            };
        }
        case 'change meetinglist page': {
            return {
                ...state,
                page: action.page,
            };
        }
        case "change meetinglist limit": {
            return {
                ...state,
                limit: action.limit,
                page: action.page
            };
        }
        case "change meetinglist kind": {
            return {
                ...state,
                kind: action.kind
            };
        }
        case "change meetinglist date": {
            return {
                ...state,
                date: action.date
            };
        }
        case "change meetinglist search": {
            return {
                ...state,
                search: action.search
            };
        }
        case "change meetinglist status": {
            return {
                ...state,
                status: action.status
            };
        }
        case "change meetinglist showtype": {
            return {
                ...state,
                showType: action.showType
            };
        }
        case "open meetinglist summaryEdit": {
            return {
                ...state,
                summaryEditMount: true,
                summaryEditShow: true
            };
        }
        case "close meetinglist summaryEdit": {
            return {
                ...state,
                summaryEditShow: false
            };
        }
        case "unmount meetinglist summaryEdit": {
            return {
                ...state,
                summaryEditMount: false,
                summaryEditId: null
            };
        }
        case "change meetingList canCheck": {
            return {
                ...state,
                canCheck: action.canCheck
            };
        }
        case "change meetingList needCheck": {
            return {
                ...state,
                needCheck: action.needCheck
            };
        }
        case "change meetingList total": {
            return {
                ...state,
                total: action.total
            };
        }
        default:
            return state;
    }
}
