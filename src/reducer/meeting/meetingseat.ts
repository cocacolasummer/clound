import {MeetingSeatAction, MeetingSeatState} from '@/store/meeting/meetingSeat';

const initialState: MeetingSeatState = {
    mount: false,
    show: false
};

export default function reducer(
    state: MeetingSeatState | null | undefined = initialState,
    action: MeetingSeatAction,
) {
    if (!state) {
        return null;
    }

    switch (action.type) {
        case "change meetingseat show": {
            return {
                ...state,
                mount: true,
                show: true
            };
        }
        case "change meetingseat hide": {
            return {
                ...state,
                show: false
            };
        }
        case "change meetingseat unmount": {
            return {
                ...state,
                mount: false
            };
        }
        default:
            return state;
    }
}
