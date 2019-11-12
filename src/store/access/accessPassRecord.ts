export interface CharDataObj {
    day: string;
    count: number;
}

export interface RoomObj {
    id: string;
    name: string;
    charData: CharDataObj[];
}

export interface DataObjects {
    addressName: string;
    roomList: RoomObj[];
}

export interface AccessPassRecordState {
    data: DataObjects[];
    search: string | undefined;
    loading: boolean;
}

export type AccessPassRecordAction =
    | {
    type: 'change accessPassRecord search';
    search: string | undefined;
} | {
    type: 'change accessPassRecord data';
    data: DataObjects[];
};
