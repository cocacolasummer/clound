import {VoucherInvoiceListAction, VoucherInvoiceListState} from '@/store/shortMessage/voucherInvoiceList';
import moment from "moment";

const initialState: VoucherInvoiceListState = {
    limit: 0,
    page: 1,
    showData: {},
    status: "0",
    total: 0,
    crowMount: false,
    crowShow: false,
    date: [moment().startOf('month').format('YYYY-MM-DD'), moment().endOf('month').endOf('month').format('YYYY-MM-DD')],
    list: [],
    search: ""
};

export default function reducer(
    state: VoucherInvoiceListState | null | undefined = initialState,
    action: VoucherInvoiceListAction,
): VoucherInvoiceListState | null {
    if (!state) {
        return null;
    }
    switch (action.type) {
        case "change voucherInvoiceList crowShow": {
            return {
                ...state,
                crowShow: true,
                crowMount: true,
                showData: action.showData
            };
        }
        case "change voucherInvoiceList crowHide": {
            return {
                ...state,
                crowShow: false
            };
        }
        case "change voucherInvoiceList crowUnMount": {
            return {
                ...state,
                crowMount: false,
                showData: {}
            };
        }
        case "change voucherInvoiceList date": {
            return {
                ...state,
                date: action.date
            };
        }
        case "change voucherInvoiceList list": {
            return {
                ...state,
                limit: action.limit,
                list: action.list,
                page: action.page,
                total: action.total
            };
        }
        case "change voucherInvoiceList page": {
            return {
                ...state,
                page: action.page
            };
        }
        case "change voucherInvoiceList search": {
            return {
                ...state,
                search: action.search
            };
        }
        case "change voucherInvoiceList status": {
            return {
                ...state,
                status: action.status
            };
        }
        default: {
            return state;
        }
    }
}