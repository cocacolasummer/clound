import {LogisticsClassifyAction, LogisticsClassifyState} from '@/store/logistics/logisticsClassify';

const initialState: LogisticsClassifyState = {
    data: undefined,
    mount: false,
    show: false,
};

export default function reducer(
    state: LogisticsClassifyState | null | undefined = initialState,
    action: LogisticsClassifyAction,
): LogisticsClassifyState | null {
    if (!state) {
        return null;
    }

    switch (action.type) {
        case "change logisticsClassify show": {
            return {
                ...state,
                show: true,
                mount: true
            };
        }
        case "change logisticsClassify hide": {
            return {
                ...state,
                show: false
            };
        }
        case "change logisticsClassify unmount": {
            return {
                ...initialState
            };
        }
        case "change logisticsClassify data": {
            return {
                ...state,
                data: action.data
            };
        }
        default: {
            return state;
        }
    }
}
