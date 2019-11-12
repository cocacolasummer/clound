export interface AttenderItem {
    name: string;
    avatar: string;
}

export interface MeetingListItem {
    id: number;
    subject: string;
    startUser: string;
    time: string;
    address: string;
    status: string | number;
    hasSeat: string;
    attender: AttenderItem[];
}

export interface MeetingListState {
    kind: string | undefined;
    status: string | undefined;
    showType: string;
    date: string;
    search: string;
    list: MeetingListItem[];
    page: number;
    total: number;
    limit: number;
    summaryEditShow: boolean;
    summaryEditMount: boolean;
    canCheck: boolean;
    needCheck: boolean;

    [propName: string]: any;
}

export type MeetingListAction =
    | {
    type: 'change meetinglist data';
    list: MeetingListItem[];
    total: number;
    page: number;
    limit: number;
} | {
    type: 'change meetinglist page';
    page: number;
} | {
    type: 'change meetinglist limit';
    limit: number;
    page: number;
} | {
    type: 'change meetinglist kind';
    kind: string | undefined;
} | {
    type: 'change meetinglist status';
    status: string | undefined;
} | {
    type: 'change meetinglist search';
    search: string;
} | {
    type: 'change meetinglist date';
    date: string;
} | {
    type: 'change meetinglist showtype';
    showType: string;
} | {
    type: 'open meetinglist summaryEdit';
    voteEditId: string | number;
} | {
    type: 'close meetinglist summaryEdit';
} | {
    type: 'unmount meetinglist summaryEdit';
} | {
    type: 'change meetingList canCheck';
    canCheck: boolean;
} | {
    type: 'change meetingList needCheck';
    needCheck: boolean;
} | {
    type: 'change meetingList total';
    total: number;
};
