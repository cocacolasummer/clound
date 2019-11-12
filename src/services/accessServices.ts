import axios from 'axios';
import {ListObjects} from '@/store/access/userType';
import {DataObjects} from '@/store/access/accessPassRecord';
import {ListObjects as AccessPassRecordByRoom} from '@/store/access/accessPassRecordByRoom';

axios.defaults.withCredentials = true;

class AccessServices {
    getUserTypeList(params: {
        search?: string;
        page?: number;
        limit?: number;
    }, success: (data: {
        page: number;
        limit: number;
        total: number;
        list: ListObjects[];
    }) => void, error: (err: Error) => void): void {
        axios.get(`/api/v1.0/access/userTypeList`, {
            params: {
                ...params
            }
        }).then((res) => {
            success(res.data);
        }).catch((err) => {
            error(err);
        });
    }

    getGroupList(params: {
        search?: string;
        page?: number;
        limit: number;
    }, success: (data: {
        page: number;
        limit: number;
        total: number;
        list: ListObjects[];
    }) => void, error: (err: Error) => void): void {
        axios.get(`/api/v1.0/access/groupList`, {
            params: {
                ...params
            }
        }).then((res) => {
            success(res.data);
        }).catch((err) => {
            error(err);
        });
    }

    getPassRecord(params: {
        search?: string;
    }, success: (data: {
        data: DataObjects[];
    }) => void, error: (err: Error) => void): void {
        axios.get(`/api/v1.0/access/passRecord`, {
            params: {
                ...params
            }
        }).then((res) => {
            success(res.data);
        }).catch((err) => {
            error(err);
        });
    }

    getPassRecordByRoom(params: {
        id: string;
        page?: number;
        limit?: number;
        search?: string;
        date?: string[];
        userType?: string;
    }, success: (data: {
        page: number;
        limit: number;
        total: number;
        list: AccessPassRecordByRoom[];
    }) => void, error: (err: Error) => void): void {
        axios.get(`/api/v1.0/access/passRecordByRoom`, {
            params: {
                ...params
            }
        }).then((res) => {
            success(res.data);
        }).catch((err) => {
            error(err);
        });
    }

    getPassStatisticByRoom(params: {
        chartType?: string;
    }, success: (data: {
        title: string;
        chartData: [];
    }) => void, error: (err: Error) => void): void {
        axios.get(`/api/v1.0/access/passStatisticByRoom`, {
            params: {
                ...params
            }
        }).then((res) => {
            success(res.data);
        }).catch((err) => {
            error(err);
        });
    }
}

export default AccessServices;