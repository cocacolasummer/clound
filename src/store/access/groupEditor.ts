export interface AccessGroupEditorState {
    show: boolean;
    mount: boolean;
    editorType: string;
    groupId: string | number | undefined;
    data: any;
}

export type AccessGroupEditorAction =
    | {
    type: 'change accessGroupEditor show';
    show: boolean;
    mount: boolean;
    groupId: string | number | undefined;
    editorType: string;
} | {
    type: 'change accessGroupEditor defaultvalues';
    data: any;
} | {
    type: 'change accessGroupEditor unmount';
    mount: boolean;
} | {
    type: 'change accessGroupEditor hide';
    show: boolean;
};
