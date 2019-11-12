import {AccessManageAction, AccessManageState} from '@/store/access/accessManage';

const initialState: AccessManageState = {
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
    state: AccessManageState | null | undefined = initialState,
    action: AccessManageAction,
): AccessManageState | null {
    if (!state) {
        return null;
    }

    switch (action.type) {
        case "change accessManage list": {
            return {
                ...state,
                list: action.list,
                page: action.page,
                limit: action.limit,
                total: action.total,
                loading: false
            };
        }
        case "change accessManage limit": {
            return {
                ...state,
                limit: action.limit,
                page: action.page,
                loading: true
            };
        }
        case "change accessManage page": {
            return {
                ...state,
                page: action.page,
                loading: true
            };
        }
        case "change accessManage search": {
            return {
                ...state,
                search: action.search,
                loading: true
            };
        }
        case "change accessManage listType": {
            return {
                ...state,
                listType: action.listType
            };
        }
        case "change accessManage selectRows": {
            return {
                ...state,
                selectRows: action.selectRows
            };
        }
        default:
            return state;
    }
}
