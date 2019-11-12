import {ShortMessageStatisticAction, ShortMessageStatisticState} from '@/store/shortMessage/shortMessageStatistic';
import moment from "moment";

const initialState: ShortMessageStatisticState = {
    chartData: [],
    chartDate: moment(new Date()).format('YYYY'),
    countData: {}
};

export default function reducer(
    state: ShortMessageStatisticState | null | undefined = initialState,
    action: ShortMessageStatisticAction,
): ShortMessageStatisticState | null {
    if (!state) {
        return null;
    }
    switch (action.type) {
        case "change shortMessageStatistic countData": {
            return {
                ...state,
                countData: action.countData
            };
        }
        case "change shortMessageStatistic chartDate": {
            return {
                ...state,
                chartDate: action.chartDate
            };
        }
        case "change shortMessageStatistic chartData": {
            return {
                ...state,
                chartData: action.chartData
            };
        }
        default: {
            return state;
        }
    }
}