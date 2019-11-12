import axios from 'axios';

axios.defaults.withCredentials = true;

class MeetingStatisticServices {
    getStatistic(successCallBack: any, errorCallback: any): void {
        axios.get(`/meetingcloud/apps/meeting/api/v1/getWeekWebStatistic`)
            .then(function(response) {
                if (response.data.code) {
                    errorCallback(response.data);
                } else {
                    successCallBack(response.data);
                }
            })
            .catch(function(error) {
                errorCallback(error);
            });
    }

    getPersonalRank(params: any, successCallBack: any, errorCallback: any): void {
        axios.get(`/meetingcloud/apps/meeting/api/v1/personalRank`, {
            params: {
                ...params
            }
        })
            .then(function(response) {
                if (response.data.code) {
                    errorCallback(response.data);
                } else {
                    successCallBack(response.data);
                }
            })
            .catch(function(error) {
                errorCallback(error);
            });
    }

    getCompanyRank(params: any, successCallBack: any, errorCallback: any): void {
        axios.get(`/meetingcloud/apps/meeting/api/v1/companyRank`, {
            params: {
                ...params
            }
        })
            .then(function(response) {
                if (response.data.code) {
                    errorCallback(response.data);
                } else {
                    successCallBack(response.data);
                }
            })
            .catch(function(error) {
                errorCallback(error);
            });
    }

    getRoomRank(params: any, successCallBack: any, errorCallback: any): void {
        axios.get(`/meetingcloud/apps/meeting/api/v1/roomRank`, {
            params: {
                ...params
            }
        })
            .then(function(response) {
                if (response.data.code) {
                    errorCallback(response.data);
                } else {
                    successCallBack(response.data);
                }
            })
            .catch(function(error) {
                errorCallback(error);
            });
    }
}

export default MeetingStatisticServices;