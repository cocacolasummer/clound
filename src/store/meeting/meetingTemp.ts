import {MeetingListItem} from './meetinglist';

export interface MeetingTempState {
    showType: string;
    search: string;
    list: any[];
    page: number;
    total: number;
    limit: number;
    editorShow: boolean;
    editorMount: boolean;
    editorId: string | number | null;

    [propName: string]: any;
}

export type MeetingTempAction =
    | {
    type: 'change meetingtemp data';
    list: MeetingListItem[];
    total: number;
    page: number;
    limit: number;
} | {
    type: 'change meetingtemp page';
    page: number;
} | {
    type: 'change meetingtemp limit';
    limit: number;
    page: number;
} | {
    type: 'change meetingtemp search';
    search: string;
} | {
    type: 'change meetingtemp showtype';
    showType: string;
} | {
    type: 'open meetingtemp editor';
    editId: string | number;
} | {
    type: 'close meetingtemp editor';
} | {
    type: 'unmount meetingtemp editor';
};
