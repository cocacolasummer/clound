import {AccessGroupEditorAction, AccessGroupEditorState} from '@/store/access/groupEditor';

const initialState: AccessGroupEditorState = {
    mount: false,
    show: false,
    editorType: 'add',
    groupId: undefined,
    data: null
};

export default function reducer(
    state: AccessGroupEditorState | null | undefined = initialState,
    action: AccessGroupEditorAction,
) {
    if (!state) {
        return null;
    }

    switch (action.type) {
        case "change accessGroupEditor show": {
            return {
                ...state,
                mount: true,
                show: true,
                groupId: action.groupId,
                editorType: action.editorType
            };
        }
        case "change accessGroupEditor hide": {
            return {
                ...state,
                show: false,
                userTypeId: undefined,
                editorType: 'add'
            };
        }
        case "change accessGroupEditor unmount": {
            return {
                ...state,
                mount: false
            };
        }
        default:
            return state;
    }
}
