import {VoucherCenterAction, VoucherCenterState} from '@/store/shortMessage/voucherCenter';

const initialState: VoucherCenterState = {
    userCode: "",
    voucherPackageList: []
};

export default function reducer(
    state: VoucherCenterState | null | undefined = initialState,
    action: VoucherCenterAction,
): VoucherCenterState | null {
    if (!state) {
        return null;
    }
    switch (action.type) {
        case "change voucherCenter userCode": {
            return {
                ...state,
                userCode: action.userCode
            };
        }
        case "change voucherCenter voucherPackageList": {
            return {
                ...state,
                voucherPackageList: action.voucherPackageList
            };
        }
        default: {
            return state;
        }
    }
}