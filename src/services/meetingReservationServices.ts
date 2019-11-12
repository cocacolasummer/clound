import axios from 'axios';
import {objDeepCopy, translateDataToTree, treeToList, arrayUnique} from '@/util/zTreeDataToTree';

axios.defaults.withCredentials = true;

class MeetingReservationServices {
    getResAddressListInfo(successCallBack: any, errorCallback: any): void {
        axios.get(`/meetingcloud/apps/meetingroom/api/v1/location`)
            .then(function(response: any) {
                if (!response.data.code) {
                    successCallBack({
                        data: treeToList(response.data.data)
                    });
                } else {
                    errorCallback(response.data.message);
                }

            })
            .catch(function(error) {
                errorCallback(error);
            });
    }

    getRoomDeviceById(successCallBack: any, errorCallback: any): void {
        axios.get(`/meetingcloud/apps/assets/api/v1/getAssets`)
            .then(function(response: any) {
                if (!response.data.code) {
                    successCallBack(response.data);
                } else {
                    errorCallback(response.data.message);
                }
            })
            .catch(function(error) {
                errorCallback(error);
            });
    }

    getResRoomListInfo(params: any, successCallBack: any, errorCallback: any): void {
        if (params.locationId) {
            axios.get(`/meetingcloud/apps/meetingroom/api/v1/getRoomsByLocationId`, {
                params: {
                    locationId: params.locationId,
                    date: params.date,
                    'meeting_type': params.meetingType
                }
            })
                .then(function(response) {
                    successCallBack(response.data);
                })
                .catch(function(error) {
                    errorCallback(error);
                });
        } else {
            axios.get(`/meetingcloud/apps/meetingroom/api/v1/room`, {
                params: {
                    date: params.date,
                    'meeting_type': params.meetingType
                }
            })
                .then(function(response) {
                    successCallBack(response.data);
                })
                .catch(function(error) {
                    errorCallback(error);
                });
        }
    }

    getResMeetingList(params: any, successCallBack: any, errorCallback: any): void {
        axios.get(`/meetingcloud/apps/meeting/api/v1/meetingListNew`, {
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

    getResUserList(successCallBack: any, errorCallback: any): void {
        axios.get(`/meetingcloud/apps/department/api/v1/userTree`)
            .then(function(response: any) {
                if (!response.data.code) {
                    successCallBack(translateDataToTree(objDeepCopy(response.data.data)));
                } else {
                    errorCallback(response.message);
                }
            })
            .catch(function(error) {
                errorCallback(error);
            });
    }

    getResMeetingById(params: any, successCallBack: any, errorCallback: any): void {
        axios.get(`/api/v1.0/meetingItem/?id=${params.id}`)
            .then(function(response) {
                successCallBack(response);
            })
            .catch(function(error) {
                errorCallback(error);
            });
    }

    getResMeetingRoomList(successCallBack: any, errorCallback: any): void {
        axios.get(`/meetingcloud/apps/meetingroom/api/v1/room`)
            .then(function(response: any) {
                if (!response.data.code) {
                    successCallBack(response.data);
                }
            })
            .catch(function(error) {
                errorCallback(error);
            });
    }

    addMeetingWithAgenda(params: any, success: any, error: any): void {
        axios.post(`/meetingcloud/apps/meeting/api/v1/meeting`, {...params}).then((res) => {
            if (res.data.code) {
                error(res.data);
            } else {
                success(res.data);
            }
        }).catch((err) => {
            error(err);
        });
    }

    updateMeetingWithAgenda(id: string, params: any, success: any, error: any): void {
        axios.put(`/meetingcloud/apps/meeting/api/v1/meeting/${id}`, {...params}).then((res) => {
            if (res.data.code) {
                error(res.data);
            } else {
                success(res.data);
            }
        }).catch((err) => {
            error(err);
        });
    }

    cancelMeeting(id: string, success: any, error: any): void {
        axios.put(`/meetingcloud/apps/meeting/api/v1/cancelMeeting/${id}`, {}).then((res) => {
            if (res.data.code) {
                error(res.data);
            } else {
                success(res.data);
            }
        }).catch((err) => {
            error(err);
        });
    }

    passMeeting(id: string, params: any, success: any, error: any): void {
        axios.put(`/meetingcloud/apps/meeting/api/v1/audit/meeting/${id}`, {...params}).then((res) => {
            if (res.data.code) {
                error(res.data);
            } else {
                success(res.data);
            }
        }).catch((err) => {
            error(err);
        });
    }

    replayMeeting(id: string, params: any, success: any, error: any): void {
        axios.put(`/meetingcloud/apps/meeting/api/v1/meetingReply/${id}`, {...params}).then((res) => {
            if (res.data.code) {
                error(res.data);
            } else {
                success(res.data);
            }
        }).catch((err) => {
            error(err);
        });
    }

    addMeetingTempWithAgenda(params: any, success: any, error: any): void {
        axios.post(`/meetingcloud/apps/meeting/api/v1/createMeetingModel`, {...params}).then((res) => {
            success(res.data);
        }).catch((err) => {
            error(err);
        });
    }

    getCheckSet(success: any, error: any): void {
        axios.get(`/meetingcloud/apps/meeting/api/v1/getAudit`).then((res) => {
            success(res.data);
        }).catch((err) => {
            error(err);
        });
    }

    getCheckUserList(success: any, error: any): void {
        axios.get(`/meetingcloud/apps/meeting/api/v1/auditor`).then((res) => {
            success(res.data);
        }).catch((err) => {
            error(err);
        });
    }

    getMeetingDetailById(id: string, success: any, error: any): void {
        axios.get(`/meetingcloud/apps/meeting/api/v1/meeting/${id}`).then((res) => {
            success(res.data);
        }).catch((err) => {
            error(err);
        });
    }

    getRemarkDetailList(id: string, success: any, error: any): void {
        axios.get(`/meetingcloud/apps/meeting/api/v1/meeting/getAttenders/${id}`).then((res) => {
            if (!res.data.code) {
                success(res.data);
            } else {
                error(res.data);
            }
        }).catch((err) => {
            error(err);
        });
    }

    getQRcodeByMeetingId(id: string, success: any, error: any): void {
        axios.get(`/meetingcloud/apps/meeting/api/v1/meeting/getCheckinCode/${id}`).then((res) => {
            if (!res.data.code) {
                success(res.data);
            } else {
                error(res.data);
            }
        }).catch((err) => {
            error(err);
        });
    }

    getMeetingSummaryById(id: string, success: any, error: any): void {
        axios.get(`/meetingcloud/apps/meeting/api/v1/notes/meeting/${id}`).then((res) => {
            success(res.data);
        }).catch((err) => {
            error(err);
        });
    }

    createMeetingSummaryById(id: string, params: any, success: any, error: any): void {
        axios.post(`/meetingcloud/apps/meeting/api/v1/notes/meeting/${id}`, {...params}).then((res) => {
            if (res.data.code) {
                error(res.data);
            } else {
                success(res.data);
            }
        }).catch((err) => {
            error(err);
        });
    }

    updateMeetingSummaryById(id: string, params: any, success: any, error: any): void {
        axios.put(`/meetingcloud/apps/meeting/api/v1/notes/meeting/${id}`, {...params}).then((res) => {
            if (res.data.code) {
                error(res.data);
            } else {
                success(res.data);
            }
        }).catch((err) => {
            error(err);
        });
    }

    getDepartment(success: any, error: any): void {
        axios.get(`/meetingcloud/apps/department/api/v1/department`).then((res: any) => {
            if (res.data.code) {
                error(res.data);
            } else {
                success(res.data);
            }
        }).catch((err) => {
            error(err);
        });
    }

    getUserByDepartment(department: any, success: any, error: any): void {
        const axiosArr: any = [];
        const getAxios = (id: any) => {
            return axios.get(`/meetingcloud/apps/department/api/v1/getUsers`, {params: {departmentId: id}});
        };
        department.forEach((item: any) => {
            axiosArr.push(getAxios(item));
        });
        axios.all(axiosArr)
            .then((result) => {
                let userArray: any = [];
                result.forEach((item: any) => {
                    if (item.code) {
                        error(item.data);
                    } else {
                        userArray = userArray.concat(item.data.data.users);
                    }
                });
                success(arrayUnique(userArray, 'uid'));
            })
            .catch((err) => {
                error(err);
            });
    }

    getMeetingByTimeInterval(params: any, success: any, error: any): void {
        axios.get(`/meetingcloud/apps/meeting/api/v1/getMeetingByTimeInterval`, {
            params: {
                ...params
            }
        }).then((res) => {
            if (res.data.code) {
                error(res.data);
            } else {
                success(res.data);
            }
        }).catch((err) => {
            error(err);
        });
    }
}

export default MeetingReservationServices;