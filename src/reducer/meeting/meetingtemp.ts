import {MeetingTempAction, MeetingTempState} from '@/store/meeting/meetingTemp';

const initialState: MeetingTempState = {
    showType: 'table',
    search: '',
    list: [],
    page: 1,
    total: 0,
    limit: 8,
    editorShow: false,
    editorMount: false,
    editorId: null
};

export default function reducer(
    state: MeetingTempState | null | undefined = initialState,
    action: MeetingTempAction,
) {
    if (!state) {
        return null;
    }

    switch (action.type) {
        case 'change meetingtemp data': {
            return {
                ...state,
                list: action.list,
                total: action.total,
                page: action.page,
                limit: action.limit
            };
        }
        case 'change meetingtemp page': {
            return {
                ...state,
                page: action.page,
            };
        }
        case "change meetingtemp limit": {
            return {
                ...state,
                limit: action.limit,
                page: action.page
            };
        }
        case "change meetingtemp search": {
            return {
                ...state,
                search: action.search
            };
        }
        case "change meetingtemp showtype": {
            return {
                ...state,
                showType: action.showType
            };
        }
        case "open meetingtemp editor": {
            return {
                ...state,
                editorShow: true,
                editorMount: true,
                editorId: action.editId
            };
        }
        case "close meetingtemp editor": {
            return {
                ...state,
                editorShow: false,
                editorId: null
            };
        }
        case "unmount meetingtemp editor": {
            return {
                ...state,
                editorMount: false
            };
        }
        default:
            return state;
    }
}
