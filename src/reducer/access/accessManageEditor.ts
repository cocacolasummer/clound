import {AccessManageEditorAction, AccessManageEditorState} from '@/store/access/accessManageEditor';

const initialState: AccessManageEditorState = {
    mount: false,
    show: false,
    editorType: 'add',
    manageId: undefined,
    data: null
};

export default function reducer(
    state: AccessManageEditorState | null | undefined = initialState,
    action: AccessManageEditorAction,
) {
    if (!state) {
        return null;
    }

    switch (action.type) {
        case "change accessManageEditor show": {
            return {
                ...state,
                mount: true,
                show: true,
                manageId: action.manageId,
                editorType: action.editorType
            };
        }
        case "change accessManageEditor hide": {
            return {
                ...state,
                show: false,
                manageId: undefined,
                editorType: 'add'
            };
        }
        case "change accessManageEditor unmount": {
            return {
                ...state,
                mount: false
            };
        }
        default:
            return state;
    }
}
