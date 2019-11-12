export interface ListObjects {
    id: string;
    name: string;
    code: string;
    department: string;
}

export interface AccessUserBlackState {
    list: ListObjects[];
    search: string | undefined;
    page: number;
    limit: number;
    total: number;
    loading: boolean;
    selectRows: string[];
}

export type AccessUserBlackAction =
    | {
    type: 'change accessUserBlack search';
    search: string | undefined;
} | {
    type: 'change accessUserBlack page';
    page: number;
} | {
    type: 'change accessUserBlack limit';
    page: number;
    limit: number;
} | {
    type: 'change accessUserBlack list';
    list: ListObjects[];
    page: number;
    total: number;
    limit: number;
} | {
    type: 'change accessUserBlack selectRows';
    selectRows: string[];
};