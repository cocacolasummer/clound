export interface SeatListState {
    page: number;
    limit: number;
    list: any;
    search: string;
    total: number;
}

export type SeatListAction =
    | {
    type: 'change seatlist data';
    list: any;
    page: number;
    limit: number;
    total: number;
} | {
    type: 'change seatlist page';
    page: number;
} | {
    type: 'change seatlist limit';
    limit: number;
    page: number;
} | {
    type: 'change seatlist search';
    search: string;
} | {
    type: 'change seatlist delete';
};
