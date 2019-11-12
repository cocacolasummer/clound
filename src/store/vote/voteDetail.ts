export interface VoteDetailState {
    show: boolean;
    mount: boolean;
    detailId: string;
    data: any;
}

export type VoteDetailAction =
    | {
    type: 'change voteDetail show';
    detailId: string;
} | {
    type: 'change voteDetail unmount';
    mount: boolean;
} | {
    type: 'change voteDetail hide';
    show: boolean;
} | {
    type: 'change voteDetail data';
    data: any;
}

