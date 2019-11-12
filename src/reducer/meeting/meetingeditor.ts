import {MeetingEditorAction, MeetingEditorState} from '@/store/meeting/meetingEditor';

const initialState: MeetingEditorState = {
    isEdit: 'add',
    id: '',
    data: {},
    userList: [],
    roomList: [],
    mount: false,
    show: false,
    timeRange: ['00:00:00', '23:59:59']
};

export default function reducer(
    state: MeetingEditorState | null | undefined = initialState,
    action: MeetingEditorAction,
) {
    if (!state) {
        return null;
    }

    switch (action.type) {
        case "change meetingeditor defaultvalues": {
            return {
                ...state,
                data: action.data
            };
        }
        case "change meetingeditor userList": {
            return {
                ...state,
                userList: action.userList
            };
        }
        case "change meetingeditor roomList": {
            return {
                ...state,
                roomList: action.roomList
            };
        }
        case "change meetingeditor isEdit": {
            return {
                ...state,
                isEdit: action.isEdit,
                id: action.id
            };
        }
        case "change meetingeditor show": {
            return {
                ...state,
                show: true,
                mount: true
            };
        }
        case "change meetingeditor unmount": {
            return {
                ...initialState
            };
        }
        case "change meetingeditor hide": {
            return {
                ...state,
                show: false
            };
        }
        case "change meetingeditor timeRange": {
            return {
                ...state,
                timeRange: action.timeRange
            };
        }
        default:
            return state;
    }
}
