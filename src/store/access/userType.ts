export interface ListObjects {
    id: string;
    name: string;
    updateTime: string;
}

export interface AccessUserTypState {
    list: ListObjects[] | undefined;
    search: string | undefined;
    page: number;
    limit: number;
    total: number;
    loading: boolean;
}

export type AccessUserTypeAction =
    | {
    type: 'change accessUserType search';
    search: string | undefined;
} | {
    type: 'change accessUserType page';
    page: number;
} | {
    type: 'change accessUserType limit';
    page: number;
    limit: number;
} | {
    type: 'change accessUserType list';
    list: ListObjects[];
    page: number;
    total: number;
    limit: number;
};
