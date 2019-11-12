export interface ListObjects {
    id: string;
    name: string;
    description?: string;
    updateTime: string;
    imgUrl?: string;
    isSnapshot: string | number;
}

export interface AccessGroupState {
    list: ListObjects[];
    search: string | undefined;
    page: number;
    limit: number;
    total: number;
    loading: boolean;
    selectRows: string[];
    listType: string;
}

export type AccessGroupAction =
    | {
    type: 'change accessGroup search';
    search: string | undefined;
} | {
    type: 'change accessGroup page';
    page: number;
} | {
    type: 'change accessGroup limit';
    page: number;
    limit: number;
} | {
    type: 'change accessGroup list';
    list: ListObjects[];
    page: number;
    total: number;
    limit: number;
} | {
    type: 'change accessGroup listType';
    listType: string;
} | {
    type: 'change accessGroup selectRows';
    selectRows: string[];
};