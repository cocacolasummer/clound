export interface UserTypeEditorState {
    show: boolean;
    mount: boolean;
    editorType: string;
    userTypeId: string | number | undefined;
    data: any;
}

export type UserTypeEditorAction =
    | {
    type: 'change userTypeEditor show';
    show: boolean;
    mount: boolean;
    userTypeId: string | number | undefined;
    editorType: string;
} | {
    type: 'change userTypeEditor unmount';
    mount: boolean;
} | {
    type: 'change userTypeEditor hide';
    show: boolean;
};
