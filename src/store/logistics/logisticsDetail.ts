export interface LogisticsDetailState {
    show: boolean;
    mount: boolean;
    showId: string;
    data: any;
}

export type LogisticsDetailAction =
    | {
    type: 'change logisticsDetail show';
    showId: string;
} | {
    type: 'change logisticsDetail hide';
} | {
    type: 'change logisticsDetail unmount';
} | {
    type: 'change logisticsDetail data';
    data: any;
};

