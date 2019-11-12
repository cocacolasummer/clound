export interface VoteListState {
    page: number;
    limit: number;
    total: number;
    list: any;
    search: string;
    date: string;
    listType: string;
}

export type VoteListAction =
    | {
    type: 'change votelist data';
    list: any;
    page: number;
    limit: number;
    total: number;
} | {
    type: 'change votelist page';
    page: number;
} | {
    type: 'change votelist limit';
    limit: number;
    page: number;
} | {
    type: 'change votelist search';
    search: string;
} | {
    type: 'change votelist type';
    listType: string;
} | {
    type: 'change votelist date';
    date: string;
} | {
    type: 'change votelist total';
    total: number;
}
