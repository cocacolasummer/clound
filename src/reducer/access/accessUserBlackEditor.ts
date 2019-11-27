import {AccessUserBlackEditorAction, AccessUserBlackEditorState} from '@/store/access/accessUserBlackEditor';

const initialState: AccessUserBlackEditorState = {
    mount: false,
    show: false,
    userList: [],
    devices: [],
};

export default function reducer(
    state: AccessUserBlackEditorState | null | undefined = initialState,
    action: AccessUserBlackEditorAction,
): AccessUserBlackEditorState | null {
    if (!state) {
        return null;
    }

    switch (action.type) {
        case "change accessUserBlackEditor show": {
            return {
                ...state,
                mount: true,
                show: true
            };
        }
        case "change accessUserBlackEditor userList": {
            return {
                ...state,
                userList: action.userList
            };
        }
        case "change accessUserBlackEditor devices": {
            return {
                ...state,
                devices: action.devices
            };
        }
        case "change accessUserBlackEditor hide": {
            return {
                ...state,
                show: false
            };
        }
        case "change accessUserBlackEditor unmount": {
            return {
                ...state,
                mount: false
            };
        }
        default:
            return state;
    }
}
