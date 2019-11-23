export interface MeetingRoom {
    id: number | string;
    name: string;
}

export interface Group {
    id: number | string;
    name: string;
}

export interface AccessManageEditorState {
    show: boolean;
    mount: boolean;
    editorType: string;
    manageId: string | number | undefined;
    data: any;
    roomdata: MeetingRoom[];
    grouplist: Group[]
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
    type: 'change accessManageEditor roomdata';
    roomdata: MeetingRoom[];
} | {
    type: 'change accessManageEditor grouplist';
    grouplist: Group[];
}| {
    type: 'change accessManageEditor hide';
    show: boolean;
};
