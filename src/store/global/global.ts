export interface GlobalState {
    loginUserId: string;
    globalUser: any;
}

export type GlobalAction =
    | {
    type: 'change global loginUser';
    loginUserId: string;
    globalUser: any;
}