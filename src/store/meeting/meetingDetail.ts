export interface MeetingDetailState {
    id: string;
    data: any;
    qrcode: any;
    remarkList: any;
    summary: any;
    summaryEditor: string;
    detailType: string;
    show: boolean;
    mount: boolean;
}

export type MeetingDetailAction =
    | {
    type: 'change meetingDetail id';
    id: string;
} | {
    type: 'change meetingDetail data';
    data: any;
} | {
    type: 'change meetingDetail qrcode';
    qrcode: any;
} | {
    type: 'change meetingDetail remarkList';
    remarkList: any;
} | {
    type: 'change meetingDetail summary';
    summary: any;
} | {
    type: 'change meetingDetail summaryEditor';
    summaryEditor: string;
} | {
    type: 'change meetingDetail show';
    detailType: string;
} | {
    type: 'change meetingDetail hide';
} | {
    type: 'change meetingDetail unmount';
}