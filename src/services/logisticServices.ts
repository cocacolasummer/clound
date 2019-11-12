import axios from 'axios';

axios.defaults.withCredentials = true;

class LogisticServices {
    getLogisticList(params: {
        search?: string;
        page?: number;
        limit?: number;
        status?: string;
        listType?: string;
        date?: string;
    }, success: (data: {
        page: number;
        limit: number;
        total: number;
        list: any;
    }) => void, error: (err: Error | string) => void): void {
        axios.get(`/api/v1.0/logistic/list`, {
            params: {
                ...params
            }
        }).then((res) => {
            success(res.data);
        }).catch((err) => {
            error(err);
        });
    }

    getGoodsType(success: (data: any) => void, error: (err: Error | string) => void): void {
        axios.get(`/api/v1.0/logistic/goodstype`).then((res) => {
            success(res.data);
        }).catch((err) => {
            error(err);
        });
    }

    getGoodsList(params: {
        type: string;
    }, success: (data: any) => void, error: (err: Error | string) => void): void {
        axios.get(`/api/v1.0/logistic/goodslist`, {
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

export default LogisticServices;
