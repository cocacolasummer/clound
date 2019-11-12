import {AccessPassRecordByRoomAction, AccessPassRecordByRoomState} from '@/store/access/accessPassRecordByRoom';

const initialState: AccessPassRecordByRoomState = {
    page: 1,
    limit: 10,
    list: [],
    search: '',
    userType: '',
    date: [],
    total: 0,
    loading: true,
    chartLoading: true,
    chartType: 'week',
    chartTitle: '',
    chartData: []
};

export default function reducer(
    state: AccessPassRecordByRoomState | null | undefined = initialState,
    action: AccessPassRecordByRoomAction,
): AccessPassRecordByRoomState | null {
    if (!state) {
        return null;
    }

    switch (action.type) {
        case "change accessPassRecordByRoom list": {
            return {
                ...state,
                list: action.list,
                page: action.page,
                limit: action.limit,
                total: action.total,
                loading: false
            };
        }
        case "change accessPassRecordByRoom limit": {
            return {
                ...state,
                limit: action.limit,
                page: action.page,
                loading: true
            };
        }
        case "change accessPassRecordByRoom page": {
            return {
                ...state,
                page: action.page,
                loading: true
            };
        }
        case "change accessPassRecordByRoom search": {
            return {
                ...state,
                search: action.search,
                loading: true
            };
        }
        case "change accessPassRecordByRoom date": {
            return {
                ...state,
                date: action.date
            };
        }
        case "change accessPassRecordByRoom userType": {
            return {
                ...state,
                userType: action.userType
            };
        }
        case "change accessPassRecordByRoom chartData": {
            return {
                ...state,
                chartData: action.chartData,
                chartTitle: action.chartTitle,
                chartLoading: false
            };
        }
        case "change accessPassRecordByRoom chartType": {
            return {
                ...state,
                chartType: action.chartType
            };
        }
        default:
            return state;
    }
}
