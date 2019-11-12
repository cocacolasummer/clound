import {LogisticsDetailAction, LogisticsDetailState} from '@/store/logistics/logisticsDetail';

const initialState: LogisticsDetailState = {
    data: undefined,
    mount: false,
    show: false,
    showId: ""

};

export default function reducer(
    state: LogisticsDetailState | null | undefined = initialState,
    action: LogisticsDetailAction,
): LogisticsDetailState | null {
    if (!state) {
        return null;
    }

    switch (action.type) {
        case "change logisticsDetail show": {
            return {
                ...state,
                show: true,
                mount: true,
                showId: action.showId
            };
        }
        case "change logisticsDetail hide": {
            return {
                ...state,
                show: false
            };
        }
        case "change logisticsDetail unmount": {
            return {
                ...state,
                mount: false
            };
        }
        case "change logisticsDetail data": {
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
