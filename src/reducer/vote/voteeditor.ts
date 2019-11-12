import {VoteEditorAction, VoteEditorState} from '@/store/vote/voteEditor';

const initialState: VoteEditorState = {
    mount: false,
    show: false,
    editorType: 'add',
    voteId: undefined,
    data: null,
    userList: []
};

export default function reducer(
    state: VoteEditorState | null | undefined = initialState,
    action: VoteEditorAction,
): VoteEditorState | null {
    if (!state) {
        return null;
    }

    switch (action.type) {
        case "change voteeditor show": {
            return {
                ...state,
                mount: true,
                show: true,
                voteId: action.voteId,
                editorType: action.editorType
            };
        }
        case "change voteeditor hide": {
            return {
                ...state,
                show: false,
                voteId: undefined,
                editorType: 'add'
            };
        }
        case "change voteeditor unmount": {
            return {
                ...state,
                mount: false
            };
        }
        case "change voteeditor userList": {
            return {
                ...state,
                userList: action.userList
            };
        }
        default:
            return state;
    }
}
