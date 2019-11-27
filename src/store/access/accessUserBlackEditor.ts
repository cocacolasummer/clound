export interface AccessUserBlackEditorState {
    show: boolean;
    mount: boolean;
    userList: any[];
    devices: any[];
}

export type AccessUserBlackEditorAction =
    | {
    type: 'change accessUserBlackEditor show';
    show: boolean;
    mount: boolean;
} | {
    type: 'change accessUserBlackEditor userList';
    userList: any[];
} | {
    type: 'change accessUserBlackEditor devices';
    devices: any[];
} | {
    type: 'change accessUserBlackEditor unmount';
    mount: boolean;
} | {
    type: 'change accessUserBlackEditor hide';
    show: boolean;
};
