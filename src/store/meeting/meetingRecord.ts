export interface MeetingRecordState {
    kind: string | undefined;
    status: string | undefined;
    showType: string;
    date: string[];
    search: string;
    list: [];
    department: [];
    departmentKey: [];
    user: [];
    userKey: [];
    page: number;
    total: number;
    limit: number;
    canCheck: boolean;
    needCheck: boolean;
}

export type MeetingRecordAction =
    | {
    type: 'change meetingRecord data';
    list: [];
    total: number;
    page: number;
    limit: number;
} | {
    type: 'change meetingRecord page';
    page: number;
} | {
    type: 'change meetingRecord limit';
    limit: number;
    page: number;
} | {
    type: 'change meetingRecord kind';
    kind: string | undefined;
} | {
    type: 'change meetingRecord status';
    status: string | undefined;
} | {
    type: 'change meetingRecord search';
    search: string;
} | {
    type: 'change meetingRecord date';
    date: string[];
} | {
    type: 'change meetingRecord showType';
    showType: string;
} | {
    type: 'change meetingRecord canCheck';
    canCheck: boolean;
} | {
    type: 'change meetingRecord needCheck';
    needCheck: boolean;
} | {
    type: 'change meetingRecord total';
    total: number;
} | {
    type: 'change meetingRecord user';
    user: [];
} | {
    type: 'change meetingRecord department';
    department: [];
} | {
    type: 'change meetingRecord departmentKey';
    departmentKey: [];
} | {
    type: 'change meetingRecord userKey';
    userKey: [];
}
