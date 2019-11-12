import moment from 'moment';
import {MeetingTimePickerAction, MeetingTimePickerState} from '@/store/meeting/meetingTimePicker';

const initialState: MeetingTimePickerState = {
    roomList: [],
    startIndex: -1,
    endIndex: -1,
    selectedEnabled: false,
    selectRoom: null,
    addressList: [],
    addressKey: '',
    date: moment(new Date()).format('YYYY-MM-DD'),
    showMore: false,
    showMeeting: {}
};

export default function reducer(
    state: MeetingTimePickerState | null | undefined = initialState,
    action: MeetingTimePickerAction,
) {
    if (!state) {
        return null;
    }

    switch (action.type) {
        case 'change timepicker select': {
            return {
                ...state,
                selectRoom: action.selectRoom,
                selectedEnabled: action.selectedEnabled,
                startIndex: action.startIndex,
                endIndex: action.endIndex
            };
        }
        case 'select timepicker complete': {
            return {
                ...state,
                selectedEnabled: action.selectedEnabled,
                endIndex: action.endIndex
            };
        }
        case 'mouse timepicker move': {
            return {
                ...state,
                endIndex: action.endIndex
            };
        }
        case 'change timepicker address': {
            return {
                ...state,
                addressKey: action.addressKey
            };
        }
        case 'change timepicker date': {
            return {
                ...state,
                date: action.date
            };
        }
        case 'change timepicker restore': {
            return {
                ...state,
                startIndex: -1,
                endIndex: -1
            };
        }
        case 'change timepicker roomlist': {
            return {
                ...state,
                roomList: action.roomList
            };
        }
        case 'init timepicker addresslist': {
            return {
                ...state,
                addressList: action.addressList
            };
        }
        case 'change timepicker showMore': {
            return {
                ...state,
                showMore: action.showMore
            };
        }
        case "change timepicker showMeeting": {
            return {
                ...state,
                showMeeting: action.showMeeting
            };
        }
        default:
            return state;
    }
}
