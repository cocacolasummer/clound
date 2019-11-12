import {UserTypeEditorAction, UserTypeEditorState} from '@/store/access/userTypeEditor';

const initialState: UserTypeEditorState = {
    mount: false,
    show: false,
    editorType: 'add',
    userTypeId: undefined,
    data: null
};

export default function reducer(
    state: UserTypeEditorState | null | undefined = initialState,
    action: UserTypeEditorAction,
) {
    if (!state) {
        return null;
    }

    switch (action.type) {
        case "change userTypeEditor show": {
            return {
                ...state,
                mount: true,
                show: true,
                userTypeId: action.userTypeId,
                editorType: action.editorType
            };
        }
        case "change userTypeEditor hide": {
            return {
                ...state,
                show: false,
                userTypeId: undefined,
                editorType: 'add'
            };
        }
        case "change userTypeEditor unmount": {
            return {
                ...state,
                mount: false
            };
        }
        default:
            return state;
    }
}
