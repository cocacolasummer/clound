export interface AccessManageEditorState {
    show: boolean;
    mount: boolean;
    editorType: string;
    manageId: string | number | undefined;
    data: any;
}

export type AccessManageEditorAction =
    | {
    type: 'change accessManageEditor show';
    show: boolean;
    mount: boolean;
    manageId: string | number | undefined;
    editorType: string;
} | {
    type: 'change accessManageEditor unmount';
    mount: boolean;
} | {
    type: 'change accessManageEditor hide';
    show: boolean;
};
