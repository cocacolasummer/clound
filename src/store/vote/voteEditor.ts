export interface VoteEditorState {
    show: boolean;
    mount: boolean;
    editorType: string;
    voteId: string | number | undefined;
    data: any;
    userList: any;
}

export type VoteEditorAction =
    | {
    type: 'change voteeditor show';
    show: boolean;
    mount: boolean;
    voteId: string | number | undefined;
    editorType: string;
} | {
    type: 'change voteeditor unmount';
    mount: boolean;
} | {
    type: 'change voteeditor hide';
    show: boolean;
} | {
    type: 'change voteeditor userList';
    userList: any;
}