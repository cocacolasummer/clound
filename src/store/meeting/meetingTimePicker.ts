export interface MeetingAddress {
    id: string | number;
    name: string;
}

export interface MeetingTimeUsed {
    startTime: string;
    endTime: string;
}

export interface MeetingRoom {
    id: number | string;
    name: string;
    openStartTime: string;
    openEndTime: string;
    appointTime: MeetingTimeUsed[] | null;
}

export interface MeetingTimePickerState {
    roomList: MeetingRoom[];
    startIndex: number;
    endIndex: number;
    selectedEnabled: boolean;
    selectRoom: any;
    addressList: MeetingAddress[];
    addressKey: string | number;
    date: string;
    showMore: boolean;
    showMeeting: any;
}

export type MeetingTimePickerAction =
    | {
    type: 'change timepicker select';
    selectRoom: any;
    selectedEnabled: boolean;
    startIndex: number;
    endIndex: number;
} | {
    type: 'select timepicker complete';
    endIndex: number;
    selectedEnabled: boolean;
} | {
    type: 'mouse timepicker move';
    endIndex: number;
} | {
    type: 'change timepicker address';
    addressKey: string | number;
} | {
    type: 'change timepicker address';
    addressKey: string | number;
} | {
    type: 'change timepicker date';
    date: string;
} | {
    type: 'change timepicker roomlist';
    roomList: MeetingRoom[];
} | {
    type: 'init timepicker addresslist';
    addressList: MeetingAddress[];
} | {
    type: 'change timepicker restore';
} | {
    type: 'change timepicker showMore';
    showMore: boolean;
} | {
    type: 'change timepicker showMeeting';
    showMeeting: any;
}
