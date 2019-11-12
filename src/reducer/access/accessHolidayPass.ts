import {AccessHolidayPassAction, AccessHolidayPassState} from '@/store/access/accessHolidayPass';

const initialState: AccessHolidayPassState = {
    page: 1,
    limit: 10,
    list: [],
    search: '',
    total: 0,
    loading: true,
    selectRows: []
};

export default function reducer(
    state: AccessHolidayPassState | null | undefined = initialState,
    action: AccessHolidayPassAction,
): AccessHolidayPassState | null {
    if (!state) {
        return null;
    }

    switch (action.type) {
        case "change accessHolidayPass list": {
            return {
                ...state,
                list: action.list,
                page: action.page,
                limit: action.limit,
                total: action.total,
                loading: false
            };
        }
        case "change accessHolidayPass limit": {
            return {
                ...state,
                limit: action.limit,
                page: action.page,
                loading: true
            };
        }
        case "change accessHolidayPass page": {
            return {
                ...state,
                page: action.page,
                loading: true
            };
        }
        case "change accessHolidayPass search": {
            return {
                ...state,
                search: action.search,
                loading: true
            };
        }
        case "change accessHolidayPass selectRows": {
            return {
                ...state,
                selectRows: action.selectRows
            };
        }
        default:
            return state;
    }
}
