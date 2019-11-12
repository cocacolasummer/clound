import moment from 'moment';
import {MeetingRecordAction, MeetingRecordState} from '@/store/meeting/meetingRecord';

const initialState: MeetingRecordState = {
    canCheck: false,
    date: [moment().startOf('month').format('YYYY-MM-DD'), moment().endOf('month').endOf('month').format('YYYY-MM-DD')],
    department: [],
    kind: "0",
    limit: 10,
    list: [],
    needCheck: false,
    page: 1,
    search: "",
    showType: "table",
    status: "100",
    total: 0,
    user: [],
    userKey: [],
    departmentKey: []
};

export default function reducer(
    state: MeetingRecordState | null | undefined = initialState,
    action: MeetingRecordAction,
) {
    if (!state) {
        return null;
    }

    switch (action.type) {
        case 'change meetingRecord data': {
            return {
                ...state,
                list: action.list,
                total: action.total,
                page: action.page,
                limit: action.limit
            };
        }
        case 'change meetingRecord page': {
            return {
                ...state,
                page: action.page,
            };
        }
        case "change meetingRecord limit": {
            return {
                ...state,
                limit: action.limit,
                page: action.page
            };
        }
        case "change meetingRecord kind": {
            return {
                ...state,
                kind: action.kind
            };
        }
        case "change meetingRecord date": {
            return {
                ...state,
                date: action.date
            };
        }
        case "change meetingRecord search": {
            return {
                ...state,
                search: action.search
            };
        }
        case "change meetingRecord status": {
            return {
                ...state,
                status: action.status
            };
        }
        case "change meetingRecord showType": {
            return {
                ...state,
                showType: action.showType
            };
        }
        case "change meetingRecord canCheck": {
            return {
                ...state,
                canCheck: action.canCheck
            };
        }
        case "change meetingRecord needCheck": {
            return {
                ...state,
                needCheck: action.needCheck
            };
        }
        case "change meetingRecord total": {
            return {
                ...state,
                total: action.total
            };
        }
        case "change meetingRecord department": {
            return {
                ...state,
                department: action.department
            };
        }
        case "change meetingRecord user": {
            return {
                ...state,
                user: action.user
            };
        }
        case "change meetingRecord departmentKey": {
            return {
                ...state,
                departmentKey: action.departmentKey
            };
        }
        case "change meetingRecord userKey": {
            return {
                ...state,
                userKey: action.userKey
            };
        }
        default:
            return state;
    }
}
