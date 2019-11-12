import axios from 'axios';

axios.defaults.withCredentials = true;

export interface DataVoteList {
    id: number | string;
    title: string;
    creator: string;
    options: [];
    selectCount: number;
    chartType: number;
    chartData: [];
    hasAttend: number;
    startTime: string;
    endTime: string;
}

export interface DataVote {
    limit: number;
    page: number;
    list: DataVoteList[];
    total: number;
}

class VoteServices {
    getVoteList(params: {
        search: string;
    }, success: (data: DataVote) => void, error: (err: Error) => void): void {
        axios.get(`/meetingcloud/apps/vote/api/v1/vote`, {
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
    postNewVote(data: any, success: (data: any) => void, error: (err: Error) => void): void {
        axios.post(`/meetingcloud/apps/vote/api/v1/vote`, data).then((res) => {
            if (res.data.code) {
                error(res.data);
            } else {
                success(res.data);
            }
        }).catch((err) => {
            error(err);
        });
    }
    postMyVoteById(id: string, data: any, success: (data: any) => void, error: (err: Error) => void): void {
        axios.post(`/meetingcloud/apps/vote/api/v1/user/vote/${id}`, data).then((res) => {
            if (res.data.code) {
                error(res.data);
            } else {
                success(res.data);
            }
        }).catch((err) => {
            error(err);
        });
    }
    getVoteDetail(id: string, success: (data: any) => void, error: (err: Error) => void): void {
        axios.get(`/meetingcloud/apps/vote/api/v1/vote/${id}`).then((res) => {
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

export default VoteServices;
