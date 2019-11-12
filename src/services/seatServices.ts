import axios from 'axios';

axios.defaults.withCredentials = true;

class SeatServices {
    getSeatList(params: any, success: any, error: any) {
        axios.get(`/meetingcloud/apps/seateditor/api/v1/seat/list`, {
            params: {
                ...params
            }
        }).then((res) => {
            success(res.data);
        }).catch((err) => {
            error(err);
        });
    }

    getSeat(params: any, success: any, error: any) {
        axios.get(`/meetingcloud/apps/seateditor/api/v1/seat/${params.id}`).then((res) => {
            success(res.data);
        }).catch((err) => {
            error(err);
        });
    }

    addSeat(params: any, success: any, error: any) {
        axios.post(`/meetingcloud/apps/seateditor/api/v1/seat/add`, {...params}).then((res) => {
            success(res.data);
        }).catch((err) => {
            error(err);
        });
    }

    updateSeat(params: any, success: any, error: any) {
        axios.put(`/meetingcloud/apps/seateditor/api/v1/seat/update/${params.id}`, {...params}).then((res) => {
            success(res.data);
        }).catch((err) => {
            error(err);
        });
    }

    deleteSeat(params: any, success: any, error: any) {
        axios.delete(`/meetingcloud/apps/seateditor/api/v1/seat/delete/${params.id}`).then((res) => {
            success(res.data);
        }).catch((err) => {
            error(err);
        });
    }
}

export default SeatServices;