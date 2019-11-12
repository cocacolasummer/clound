export interface VoucherCenterState {
    voucherPackageList: any[];
    userCode: string;
}

export type VoucherCenterAction =
    | {
    type: 'change voucherCenter voucherPackageList';
    voucherPackageList: any[];
} | {
    type: 'change voucherCenter userCode';
    userCode: string;
}