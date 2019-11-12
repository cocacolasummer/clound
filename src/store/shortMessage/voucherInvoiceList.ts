export interface VoucherInvoiceListState {
    list: any;
    crowShow: boolean;
    crowMount: boolean;
    showData: any;
    search: string;
    status: string;
    date: [string, string];
    page: number;
    limit: number;
    total: number;
}

export type VoucherInvoiceListAction =
    | {
    type: 'change voucherInvoiceList crowShow';
    showData: any;
} | {
    type: 'change voucherInvoiceList crowHide';
} | {
    type: 'change voucherInvoiceList crowUnMount';
} | {
    type: 'change voucherInvoiceList page';
    page: number;
} | {
    type: 'change voucherInvoiceList list';
    list: any;
    page: number;
    total: number;
    limit: number;
} | {
    type: 'change voucherInvoiceList date';
    date: [string, string];
} | {
    type: 'change voucherInvoiceList search';
    search: string;
} | {
    type: 'change voucherInvoiceList status';
    status: string;
}