import {VoteDetailAction, VoteDetailState} from '@/store/vote/voteDetail';

const initialState: VoteDetailState = {
    mount: false,
    show: false,
    detailId: '',
    data: {}
};

export default function reducer(
    state: VoteDetailState | null | undefined = initialState,
    action: VoteDetailAction,
) {
    if (!state) {
        return null;
    }

    switch (action.type) {
        case "change voteDetail show": {
            return {
                ...state,
                mount: true,
                show: true,
                detailId: action.detailId
            };
        }
        case "change voteDetail hide": {
            return {
                ...state,
                show: false
            };
        }
        case "change voteDetail unmount": {
            return {
                ...initialState,
            };
        }
        case "change voteDetail data": {
            return {
                ...state,
                data: action.data
            };
        }
        default:
            return state;
    }
}
