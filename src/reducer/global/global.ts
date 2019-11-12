import {GlobalAction, GlobalState} from '@/store/global/global';

const initialState: GlobalState = {
    loginUserId: '',
    globalUser: {}
};

export default function reducer(
    state: GlobalState | null | undefined = initialState,
    action: GlobalAction,
): GlobalState | null {
    if (!state) {
        return null;
    }

    switch (action.type) {
        case "change global loginUser": {
            return {
                ...state,
                loginUserId: action.loginUserId,
                globalUser: action.globalUser
            };
        }
        default:
            return state;
    }
}
