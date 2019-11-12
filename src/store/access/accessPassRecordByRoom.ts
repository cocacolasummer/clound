export interface ListObjects {
    id: string;
    name: string;
    department: string;
    passType: string;
    passTime: string;
    imgUrl?: string;
}

export interface CharDataObj {
    day: string;
    count: number;
}

export interface AccessPassRecordByRoomState {
    list: ListObjects[];
    search: string | undefined;
    date: string[];
    userType: string;
    page: number;
    limit: number;
    total: number;
    loading: boolean;
    chartLoading: boolean;
    chartType: string;
    chartTitle: string;
    chartData: CharDataObj[];
}

export type AccessPassRecordByRoomAction =
    | {
    type: 'change accessPassRecordByRoom search';
    search: string | undefined;
} | {
    type: 'change accessPassRecordByRoom date';
    date: string[];
} | {
    type: 'change accessPassRecordByRoom userType';
    userType: string;
} | {
    type: 'change accessPassRecordByRoom page';
    page: number;
} | {
    type: 'change accessPassRecordByRoom limit';
    page: number;
    limit: number;
} | {
    type: 'change accessPassRecordByRoom list';
    list: ListObjects[];
    page: number;
    total: number;
    limit: number;
} | {
    type: 'change accessPassRecordByRoom chartType';
    chartType: string;
} | {
    type: 'change accessPassRecordByRoom chartData';
    chartTitle: string;
    chartData: CharDataObj[];
};
