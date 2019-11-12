export interface ListObjects {
    id: string;
    name: string;
    group: string;
    passType: string;
}

export interface AccessHolidayPassState {
    list: ListObjects[];
    search: string | undefined;
    page: number;
    limit: number;
    total: number;
    loading: boolean;
    selectRows: string[];
}

export type AccessHolidayPassAction =
    | {
    type: 'change accessHolidayPass search';
    search: string | undefined;
} | {
    type: 'change accessHolidayPass page';
    page: number;
} | {
    type: 'change accessHolidayPass limit';
    page: number;
    limit: number;
} | {
    type: 'change accessHolidayPass list';
    list: ListObjects[];
    page: number;
    total: number;
    limit: number;
} | {
    type: 'change accessHolidayPass selectRows';
    selectRows: string[];
};