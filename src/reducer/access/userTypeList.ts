import {AccessUserTypeAction, AccessUserTypState} from '@/store/access/userType';

const initialState: AccessUserTypState = {
    page: 1,
    limit: 10,
    list: [],
    search: '',
    total: 0,
    loading: true
};

export default function reducer(
    state: AccessUserTypState | null | undefined = initialState,
    action: AccessUserTypeAction,
): AccessUserTypState | null {
    if (!state) {
        return null;
    }

    switch (action.type) {
        case "change accessUserType list": {
            return {
                ...state,
                list: action.list,
                page: action.page,
                limit: action.limit,
                total: action.total,
                loading: false
            };
        }
        case "change accessUserType limit": {
            return {
                ...state,
                limit: action.limit,
                page: action.page,
                loading: true
            };
        }
        case "change accessUserType page": {
            return {
                ...state,
                page: action.page,
                loading: true
            };
        }
        case "change accessUserType search": {
            return {
                ...state,
                search: action.search,
                loading: true
            };
        }
        default:
            return state;
    }
}
