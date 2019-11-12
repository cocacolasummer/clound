import {SeatListAction, SeatListState} from '@/store/seat/seatList';

const initialState: SeatListState = {
    page: 1,
    limit: 8,
    list: [],
    search: '',
    total: 0
};

export default function reducer(
    state: SeatListState | null | undefined = initialState,
    action: SeatListAction,
) {
    if (!state) {
        return null;
    }

    switch (action.type) {
        case "change seatlist data": {
            return {
                ...state,
                list: action.list,
                page: action.page,
                limit: action.limit,
                total: action.total
            };
        }
        case "change seatlist limit": {
            return {
                ...state,
                limit: action.limit,
                page: action.page
            };
        }
        case "change seatlist page": {
            return {
                ...state,
                page: action.page
            };
        }
        case "change seatlist search": {
            return {
                ...state,
                search: action.search
            };
        }
        case "change seatlist delete": {
            return {
                ...state,
                total: state.total - 1
            };
        }
        default:
            return state;
    }
}
