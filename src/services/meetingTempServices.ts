import axios from 'axios';

axios.defaults.withCredentials = true;

class MeetingTempServices {
    getTempsListInfo(params: any, successCallBack: any, errorCallback: any): void {
        axios.get(`/api/v1.0/meetingTemp/?page=${params.page}&limit=${params.limit}&search=${params.search}`)
            .then(function(response) {
                successCallBack(response);
            })
            .catch(function(error) {
                errorCallback(error);
            });
    }
}

export default MeetingTempServices;