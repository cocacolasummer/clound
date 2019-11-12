export enum Status {
    ALL = '',
    PENDING = '0',
    PROCESSING = '1',
    SOLVED = '2',
    REJECTED = '3',
    COMPLETED = '4',
    END = '5'
}

export enum LogisticsType {
    ALL = '',
    INSIDE = '1',
    RENT = '2'
}

export const LogisticsTypeOptions = {
    [LogisticsType.ALL]: {
        name: '全部'
    },
    [LogisticsType.INSIDE]: {
        name: '内部后勤'
    },
    [LogisticsType.RENT]: {
        name: '租凭后勤'
    }
};

export const StatusSetting = {
    [Status.ALL]: {
        name: '全部',
        color: '#fff'
    },
    [Status.PENDING]: {
        name: '待处理',
        color: '#FF7B11'
    },
    [Status.PROCESSING]: {
        name: '处理中',
        color: '#15C0A9'
    },
    [Status.SOLVED]: {
        name: '已处理',
        color: '#2392FF'
    },
    [Status.REJECTED]: {
        name: '已拒绝',
        color: '#FF3F63'
    },
    [Status.COMPLETED]: {
        name: '已完成',
        color: '#FFC000'
    },
    [Status.END]: {
        name: '已结束',
        color: '#757575'
    }
};

export interface LogisticsListState {
    userType: string;
    search: string;
    date: string;
    status: string;
    listType: string;
    page: number;
    limit: number;
    total: number;
    loading: boolean;
    list: any;
}

export type LogisticsListAction =
    | {
    type: 'change logisticsList search';
    search: string;
} | {
    type: 'change logisticsList page';
    page: number;
} | {
    type: 'change logisticsList limit';
    limit: number;
    page: number;
} | {
    type: 'change logisticsList userType';
    userType: string;
} | {
    type: 'change logisticsList date';
    date: string;
} | {
    type: 'change logisticsList status';
    status: string;
} | {
    type: 'change logisticsList listType';
    listType: string;
} | {
    type: 'change logisticsList list';
    list: any;
    total: number;
    limit: number;
    page: number;
};