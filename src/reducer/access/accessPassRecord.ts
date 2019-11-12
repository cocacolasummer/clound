import {AccessPassRecordAction, AccessPassRecordState} from '@/store/access/accessPassRecord';

const initialState: AccessPassRecordState = {
    data: [],
    search: '',
    loading: true,
};

export default function reducer(
    state: AccessPassRecordState | null | undefined = initialState,
    action: AccessPassRecordAction,
): AccessPassRecordState | null {
    if (!state) {
        return null;
    }

    switch (action.type) {
        case "change accessPassRecord data": {
            return {
                ...state,
                data: action.data,
                loading: false
            };
        }
        case "change accessPassRecord search": {
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
