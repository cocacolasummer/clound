import {VoteListAction, VoteListState} from '@/store/vote/voteList';
import moment from "moment";

const initialState: VoteListState = {
    page: 1,
    limit: 6,
    list: [],
    search: '',
    total: 0,
    date: moment(new Date()).format('YYYY-MM-DD'),
    listType: '1'
};

export default function reducer(
    state: VoteListState | null | undefined = initialState,
    action: VoteListAction,
) {
    if (!state) {
        return null;
    }

    switch (action.type) {
        case "change votelist data": {
            return {
                ...state,
                list: action.list,
                page: action.page,
                limit: action.limit,
                total: action.total
            };
        }
        case "change votelist limit": {
            return {
                ...state,
                limit: action.limit,
                page: action.page
            };
        }
        case "change votelist page": {
            return {
                ...state,
                page: action.page
            };
        }
        case "change votelist search": {
            return {
                ...state,
                search: action.search
            };
        }
        case "change votelist date": {
            return {
                ...state,
                date: action.date
            };
        }
        case "change votelist type": {
            return {
                ...state,
                listType: action.listType
            };
        }
        case "change votelist total": {
            return {
                ...state,
                total: action.total
            };
        }
        default:
            return state;
    }
}
