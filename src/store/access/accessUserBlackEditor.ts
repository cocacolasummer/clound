export interface AccessUserBlackEditorState {
    show: boolean;
    mount: boolean;
}

export type AccessUserBlackEditorAction =
    | {
    type: 'change accessUserBlackEditor show';
    show: boolean;
    mount: boolean;
} | {
    type: 'change accessUserBlackEditor unmount';
    mount: boolean;
} | {
    type: 'change accessUserBlackEditor hide';
    show: boolean;
};
