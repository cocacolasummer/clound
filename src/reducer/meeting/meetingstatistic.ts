import {MeetingStatisticAction, MeetingStatisticState} from '@/store/meeting/meetingStatistic';
import moment from "moment";

const initialState: MeetingStatisticState = {
    userCount: {},
    roomTotal: [],
    roomTotalDate: [moment().startOf('month').format('YYYY-MM-DD'), moment().endOf('month').endOf('month').format('YYYY-MM-DD')],
    roomTotalPage: 1,
    roomTotalCount: 0,
    attendTotal: [],
    attendTotalDate: [moment().startOf('month').format('YYYY-MM-DD'), moment().endOf('month').endOf('month').format('YYYY-MM-DD')],
    attendTotalPage: 1,
    attendTotalCount: 0,
    comRank: [],
    comRankDate: [moment().startOf('month').format('YYYY-MM-DD'), moment().endOf('month').endOf('month').format('YYYY-MM-DD')],
    comRankPage: 1,
    comRankCount: 0
};

export default function reducer(
    state: MeetingStatisticState | null | undefined = initialState,
    action: MeetingStatisticAction,
) {
    if (!state) {
        return null;
    }

    switch (action.type) {
        case "change meetingStatistic userCount": {
            return {
                ...state,
                userCount: action.userCount
            };
        }
        case "change meetingStatistic roomTotal": {
            return {
                ...state,
                roomTotal: action.roomTotal,
                roomTotalCount: action.roomTotalCount
            };
        }
        case "change meetingStatistic roomTotalDate": {
            return {
                ...state,
                roomTotalDate: action.roomTotalDate
            };
        }
        case "change meetingStatistic roomTotalPage": {
            return {
                ...state,
                roomTotalPage: action.roomTotalPage
            };
        }
        case "change meetingStatistic comRankDate": {
            return {
                ...state,
                comRankDate: action.comRankDate
            };
        }
        case "change meetingStatistic comRankPage": {
            return {
                ...state,
                comRankPage: action.comRankPage
            };
        }
        case "change meetingStatistic comRank": {
            return {
                ...state,
                comRank: action.comRank,
                comRankCount: action.comRankCount
            };
        }
        case "change meetingStatistic attendTotal": {
            return {
                ...state,
                attendTotal: action.attendTotal,
                attendTotalCount: action.attendTotalCount
            };
        }
        case "change meetingStatistic attendTotalDate": {
            return {
                ...state,
                attendTotalDate: action.attendTotalDate
            };
        }
        case "change meetingStatistic attendTotalPage": {
            return {
                ...state,
                attendTotalPage: action.attendTotalPage
            };
        }
        default:
            return state;
    }
}
