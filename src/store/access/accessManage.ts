export interface ListObjects {
    id: string;
    name: string;
    passTypeName: string[];
    passTypeId?: string[];
    groupId?: string;
    groupName: string;
    monday: string[];
    tuesday: string[];
    wednesday: string[];
    thursday: string[];
    friday: string[];
    saturday: string[];
    sunday: string[];
    imgUrl?: string;
}

export interface AccessManageState {
    list: ListObjects[];
    search: string | undefined;
    page: number;
    limit: number;
    total: number;
    loading: boolean;
    selectRows: string[];
    listType: string;
}

export type AccessManageAction =
    | {
    type: 'change accessManage search';
    search: string | undefined;
} | {
    type: 'change accessManage page';
    page: number;
} | {
    type: 'change accessManage limit';
    page: number;
    limit: number;
} | {
    type: 'change accessManage list';
    list: ListObjects[];
    page: number;
    total: number;
    limit: number;
} | {
    type: 'change accessManage listType';
    listType: string;
} | {
    type: 'change accessManage selectRows';
    selectRows: string[];
};
