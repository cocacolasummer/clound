import {VoucherRecordAction, VoucherRecordState} from '@/store/shortMessage/voucherRecord';
import moment from "moment";

const initialState: VoucherRecordState = {
    date: [moment().startOf('month').format('YYYY-MM-DD'), moment().endOf('month').endOf('month').format('YYYY-MM-DD')],
    limit: 0,
    list: undefined,
    page: 0,
    search: "",
    status: "0",
    total: 0
};

export default function reducer(
    state: VoucherRecordState | null | undefined = initialState,
    action: VoucherRecordAction,
): VoucherRecordState | null {
    if (!state) {
        return null;
    }
    switch (action.type) {
        case "change voucherRecord status": {
            return {
                ...state,
                status: action.status
            };
        }
        case "change voucherRecord date": {
            return {
                ...state,
                date: action.date
            };
        }
        case "change voucherRecord list": {
            return {
                ...state,
                list: action.list,
                page: action.page,
                total: action.total,
                limit: action.limit
            };
        }
        case "change voucherRecord page": {
            return {
                ...state,
                page: action.page
            };
        }
        case "change voucherRecord search": {
            return {
                ...state,
                search: action.search
            };
        }
        default: {
            return state;
        }
    }
}