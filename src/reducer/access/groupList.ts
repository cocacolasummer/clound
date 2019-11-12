import {AccessGroupAction, AccessGroupState} from '@/store/access/groupList';

const initialState: AccessGroupState = {
    page: 1,
    limit: 8,
    list: [],
    search: '',
    total: 0,
    loading: true,
    listType: 'table',
    selectRows: []
};

export default function reducer(
    state: AccessGroupState | null | undefined = initialState,
    action: AccessGroupAction,
): AccessGroupState | null {
    if (!state) {
        return null;
    }

    switch (action.type) {
        case "change accessGroup list": {
            return {
                ...state,
                list: action.list,
                page: action.page,
                limit: action.limit,
                total: action.total,
                loading: false
            };
        }
        case "change accessGroup limit": {
            return {
                ...state,
                limit: action.limit,
                page: action.page,
                loading: true
            };
        }
        case "change accessGroup page": {
            return {
                ...state,
                page: action.page,
                loading: true
            };
        }
        case "change accessGroup search": {
            return {
                ...state,
                search: action.search,
                loading: true
            };
        }
        case "change accessGroup listType": {
            return {
                ...state,
                listType: action.listType
            };
        }
        case "change accessGroup selectRows": {
            return {
                ...state,
                selectRows: action.selectRows
            };
        }
        default:
            return state;
    }
}
