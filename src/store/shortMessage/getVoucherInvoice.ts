export interface GetVoucherInvoiceState {
    crowShow: boolean;
    crowMount: boolean;
    selectKey: string[];
    list: any;
    date: [string, string];
    search: string;
    balance: number;
    lastInfo: any;
}

export type GetVoucherInvoiceAction =
    | {
    type: 'change getVoucherInvoice crowShow';
} | {
    type: 'change getVoucherInvoice crowHide';
} | {
    type: 'change getVoucherInvoice crowUnMount';
} | {
    type: 'change getVoucherInvoice date';
    date: [string, string];
} | {
    type: 'change getVoucherInvoice search';
    search: string;
} | {
    type: 'change getVoucherInvoice list';
    list: any;
    balance: number;
} | {
    type: 'change getVoucherInvoice selectKey';
    selectKey: string[];
} | {
    type: 'change getVoucherInvoice lastInfo';
    lastInfo: any;
}