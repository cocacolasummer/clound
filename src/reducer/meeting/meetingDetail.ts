import {MeetingDetailAction, MeetingDetailState} from '@/store/meeting/meetingDetail';

const initialState: MeetingDetailState = {
    detailType: "normal",
    mount: false,
    show: false,
    id: '',
    data: {},
    remarkList: [],
    qrcode: '',
    summary: undefined,
    summaryEditor: 'add'
};

export default function reducer(
    state: MeetingDetailState | null | undefined = initialState,
    action: MeetingDetailAction,
) {
    if (!state) {
        return null;
    }

    switch (action.type) {
        case "change meetingDetail data": {
            return {
                ...state,
                data: action.data
            };
        }
        case "change meetingDetail id": {
            return {
                ...state,
                id: action.id
            };
        }
        case "change meetingDetail qrcode": {
            return {
                ...state,
                qrcode: action.qrcode
            };
        }
        case "change meetingDetail remarkList": {
            return {
                ...state,
                remarkList: action.remarkList
            };
        }
        case "change meetingDetail summary": {
            return {
                ...state,
                summary: action.summary
            };
        }
        case "change meetingDetail summaryEditor": {
            return {
                ...state,
                summaryEditor: action.summaryEditor
            };
        }
        case "change meetingDetail show": {
            return {
                ...state,
                detailType: action.detailType,
                show: true,
                mount: true
            };
        }
        case "change meetingDetail hide": {
            return {
                ...state,
                show: false
            };
        }
        case "change meetingDetail unmount": {
            return {
                ...initialState
            };
        }
        default:
            return state;
    }
}
