export interface MeetingEditorState {
    isEdit: string;
    id: string;
    data: any;
    mount: boolean;
    show: boolean;
    userList: any[];
    roomList: any[];
    timeRange: [string, string];
}

export type MeetingEditorAction =
    | {
    type: 'change meetingeditor defaultvalues';
    data: any;
} | {
    type: 'change meetingeditor userList';
    userList: any[];
} | {
    type: 'change meetingeditor roomList';
    roomList: any[];
} | {
    type: 'change meetingeditor isEdit';
    isEdit: string;
    id: string;
} | {
    type: 'change meetingeditor show';
} | {
    type: 'change meetingeditor hide';
} | {
    type: 'change meetingeditor unmount';
} | {
    type: 'change meetingeditor timeRange';
    timeRange: [string, string];
}
