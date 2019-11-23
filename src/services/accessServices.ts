import axios from 'axios';
import {ListObjects} from '@/store/access/userType';
import {DataObjects} from '@/store/access/accessPassRecord';
import {ListObjects as AccessPassRecordByRoom} from '@/store/access/accessPassRecordByRoom';

axios.defaults.withCredentials = true;

class AccessServices {
 
    AdddeviceGroup(data: any, success: (data: any) => void, error: (err: Error) => void): void {
        axios.post(`/meetingcloud/apps/accesscontrol/api/v1/deviceGroupAdd`, data).then((res) => {
            if (res.data.code) {
                error(res.data);
            } else {
                success(res.data);
            }
        }).catch((err) => {
            error(err);
        });
    }

    deviceGroupList(params: any, successCallBack: any, errorCallback: any): void {
        axios.get(`/meetingcloud/apps/accesscontrol/api/v1/deviceGroupList`, {
            params: {
                ...params
            }
        })
            .then(function(response) {
                if (!response.data.code) {
                    successCallBack(response.data);
                } else {
                    errorCallback(response.data);
                }
            })
            .catch(function(error) {
                errorCallback(error);
            });
    }
   
    deviceGroupDel(data: any, success: (data: any) => void, error: (err: Error) => void): void {
        axios.post(`/meetingcloud/apps/accesscontrol/api/v1/deviceGroupDel`, data).then((res) => {
            if (res.data.code) {
                error(res.data);
            } else {
                success(res.data);
            }
        }).catch((err) => {
            error(err);
        });
    }

    deviceGroupDetail(data: any, success: (data: any) => void, error: (err: Error) => void): void {
        axios.post(`/meetingcloud/apps/accesscontrol/api/v1/deviceGroupDetail`, data).then((res) => {
            if (res.data.code) {
                error(res.data);
            } else {
                success(res.data);
            }
        }).catch((err) => {
            error(err);
        });
    }

    allDeviceGroup(successCallBack: any, errorCallback: any): void {
        axios.get(`/meetingcloud/apps/accesscontrol/api/v1/allDeviceGroup`)
            .then(function(response) {
                if (!response.data.code) {
                    successCallBack(response.data);
                } else {
                    errorCallback(response.data);
                }
            })
            .catch(function(error) {
                errorCallback(error);
            });
    }

    meetingroom(successCallBack: any, errorCallback: any): void {
        axios.get(`/meetingcloud/apps/assets/api/v1/meeting`)
            .then(function(response) {
                if (!response.data.code) {
                    successCallBack(response.data);
                } else {
                    errorCallback(response.data);
                }
            })
            .catch(function(error) {
                errorCallback(error);
            });
    }

    deviceAdd(data: any, success: (data: any) => void, error: (err: Error) => void): void {
        axios.post(`/meetingcloud/apps/accesscontrol/api/v1/deviceAdd`, data).then((res) => {
            if (res.data.code) {
                error(res.data);
            } else {
                success(res.data);
            }
        }).catch((err) => {
            error(err);
        });
    }

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