export interface VoucherRecordState {
    status: string;
    date: [string, string];
    search: string;
    page: number;
    limit: number;
    total: number;
    list: any;
}

export type VoucherRecordAction =
    | {
    type: 'change voucherRecord status';
    status: string;
} | {
    type: 'change voucherRecord date';
    date: [string, string];
} | {
    type: 'change voucherRecord search';
    search: string;
} | {
    type: 'change voucherRecord page';
    page: number;
} | {
    type: 'change voucherRecord list';
    total: number;
    list: any;
    page: number;
    limit: number;
}