export interface LogisticsClassifyState {
    show: boolean;
    mount: boolean;
    data: any;
}

export type LogisticsClassifyAction =
    | {
    type: 'change logisticsClassify show';
} | {
    type: 'change logisticsClassify unmount';
} | {
    type: 'change logisticsClassify hide';
} | {
    type: 'change logisticsClassify data';
    data: any;
};