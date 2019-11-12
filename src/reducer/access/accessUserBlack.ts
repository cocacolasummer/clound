import {AccessUserBlackAction, AccessUserBlackState} from '@/store/access/accessUserBlack';

const initialState: AccessUserBlackState = {
    page: 1,
    limit: 10,
    list: [],
    search: '',
    total: 0,
    loading: true,
    selectRows: []
};

export default function reducer(
    state: AccessUserBlackState | null | undefined = initialState,
    action: AccessUserBlackAction,
): AccessUserBlackState | null {
    if (!state) {
        return null;
    }

    switch (action.type) {
        case "change accessUserBlack list": {
            return {
                ...state,
                list: action.list,
                page: action.page,
                limit: action.limit,
                total: action.total,
                loading: false
            };
        }
        case "change accessUserBlack limit": {
            return {
                ...state,
                limit: action.limit,
                page: action.page,
                loading: true
            };
        }
        case "change accessUserBlack page": {
            return {
                ...state,
                page: action.page,
                loading: true
            };
        }
        case "change accessUserBlack search": {
            return {
                ...state,
                search: action.search,
                loading: true
            };
        }
        case "change accessUserBlack selectRows": {
            return {
                ...state,
                selectRows: action.selectRows
            };
        }
        default:
            return state;
    }
}
