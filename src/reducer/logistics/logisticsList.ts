import {LogisticsListAction, LogisticsListState} from '@/store/logistics/logisticsList';
import moment from "moment";

const initialState: LogisticsListState = {
    date: moment(new Date()).format('YYYY-MM-DD'),
    status: "",
    userType: "",
    page: 1,
    limit: 8,
    list: [],
    search: '',
    total: 0,
    loading: true,
    listType: 'table'
};

export default function reducer(
    state: LogisticsListState | null | undefined = initialState,
    action: LogisticsListAction,
): LogisticsListState | null {
    if (!state) {
        return null;
    }

    switch (action.type) {
        case "change logisticsList date": {
            return {
                ...state,
                date: action.date,
                loading: true
            };
        }
        case "change logisticsList limit": {
            return {
                ...state,
                limit: action.limit,
                page: action.page,
                loading: true
            };
        }
        case "change logisticsList list": {
            return {
                ...state,
                limit: action.limit,
                total: action.total,
                list: action.list,
                page: action.page,
                loading: false
            };
        }
        case "change logisticsList listType": {
            return {
                ...state,
                listType: action.listType,
                loading: true
            };
        }
        case "change logisticsList page": {
            return {
                ...state,
                page: action.page,
                loading: true
            };
        }
        case "change logisticsList search": {
            return {
                ...state,
                search: action.search,
                loading: true
            };
        }
        case "change logisticsList status": {
            return {
                ...state,
                status: action.status,
                loading: true
            };
        }
        default: {
            return state;
        }
    }
}
