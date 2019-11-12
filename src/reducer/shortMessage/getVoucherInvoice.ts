import {GetVoucherInvoiceAction, GetVoucherInvoiceState} from '@/store/shortMessage/getVoucherInvoice';
import moment from "moment";

const initialState: GetVoucherInvoiceState = {
    crowMount: false,
    crowShow: false,
    date: [moment().startOf('month').format('YYYY-MM-DD'), moment().endOf('month').endOf('month').format('YYYY-MM-DD')],
    list: [],
    search: "",
    selectKey: [],
    balance: 0,
    lastInfo: {}
};

export default function reducer(
    state: GetVoucherInvoiceState | null | undefined = initialState,
    action: GetVoucherInvoiceAction,
): GetVoucherInvoiceState | null {
    if (!state) {
        return null;
    }
    switch (action.type) {
        case "change getVoucherInvoice crowShow": {
            return {
                ...state,
                crowShow: true,
                crowMount: true
            };
        }
        case "change getVoucherInvoice crowHide": {
            return {
                ...state,
                crowShow: false
            };
        }
        case "change getVoucherInvoice crowUnMount": {
            return {
                ...state,
                crowMount: false
            };
        }
        case "change getVoucherInvoice date": {
            return {
                ...state,
                date: action.date
            };
        }
        case "change getVoucherInvoice search": {
            return {
                ...state,
                search: action.search
            };
        }
        case "change getVoucherInvoice list": {
            return {
                ...state,
                list: action.list,
                balance: action.balance
            };
        }
        case "change getVoucherInvoice selectKey": {
            return {
                ...state,
                selectKey: action.selectKey
            };
        }
        case "change getVoucherInvoice lastInfo": {
            return {
                ...state,
                lastInfo: action.lastInfo
            };
        }
        default: {
            return state;
        }
    }
}