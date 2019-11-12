import axios from 'axios';

axios.defaults.withCredentials = true;

class ShortMessageServices {
    getTotalStatistic(success: (res: any) => void, error: (res: any) => void) {
        axios.get(`/meetingcloud/apps/message/api/v1/getDateOverview`)
            .then((res) => {
                if (res.data.code) {
                    error(res.data);
                } else {
                    success(res.data);
                }
            }).catch((err) => {
                error(err);
        });
    }
    getChartStatistic(params: {
        type: string;
        start: string;
        end: string;
    }, success: (res: any) => void, error: (res: any) => void) {
        axios.get(`/meetingcloud/apps/message/api/v1/getYearStatistics`, {
            params: {
                ...params
            }
        })
            .then((res) => {
                if (res.data.code) {
                    error(res.data);
                } else {
                    success(res.data);
                }
            }).catch((err) => {
            error(err);
        });
    }
    getVoucherPackageList(success: (res: any) => void, error: (res: any) => void) {
        axios.get(`/meetingcloud/apps/message/api/v1/getPackageList`)
            .then((res) => {
                if (res.data.code) {
                    error(res.data);
                } else {
                    success(res.data);
                }
            }).catch((err) => {
            error(err);
        });
    }
    getUserBindId(success: (res: any) => void, error: (res: any) => void) {
        axios.get(`/meetingcloud/apps/message/api/v1/getBindingId`)
            .then((res) => {
                if (res.data.code) {
                    error(res.data);
                } else {
                    success(res.data);
                }
            }).catch((err) => {
            error(err);
        });
    }
    getShotMessageSet(success: (res: any) => void, error: (res: any) => void) {
        axios.get(`/meetingcloud/apps/message/api/v1/getMessageConf`)
            .then((res) => {
                if (res.data.code) {
                    error(res.data);
                } else {
                    success(res.data);
                }
            }).catch((err) => {
            error(err);
        });
    }
    postShotMessageSet(params: {
        userCode: string;
        host: string;
        mobile: string;
    }, success: (res: any) => void, error: (res: any) => void) {
        axios.post(`/meetingcloud/apps/message/api/v1/bindId`, params)
            .then((res) => {
                if (res.data.code) {
                    error(res.data);
                } else {
                    success(res.data);
                }
            }).catch((err) => {
            error(err);
        });
    }
    getVoucherRecord(params: {
        search: string;
        start_time: string;
        end_time: string;
        status: string | number;
        page: string | number;
    }, success: (res: any) => void, error: (res: any) => void) {
        axios.get(`/meetingcloud/apps/message/api/v1/getOrderList`, {
            params: {
                ...params
            }
        })
            .then((res) => {
                if (res.data.code) {
                    error(res.data);
                } else {
                    success(res.data);
                }
            }).catch((err) => {
            error(err);
        });
    }
    getCanGetInvoiceVoucher(params: {
        search: string;
        start_time: string;
        end_time: string;
    }, success: (res: any) => void, error: (res: any) => void) {
        axios.get(`/meetingcloud/apps/message/api/v1/invoiceAskfor`, {
            params: {
                ...params
            }
        })
            .then((res) => {
                if (res.data.code) {
                    error(res.data);
                } else {
                    success(res.data);
                }
            }).catch((err) => {
            error(err);
        });
    }
    getInvoiceList(params: {
        search: string;
        start_time: string;
        end_time: string;
        status: string;
        page: number;
    }, success: (res: any) => void, error: (res: any) => void) {
        axios.get(`/meetingcloud/apps/message/api/v1/getInvoiceList`, {
            params: {
                ...params
            }
        })
            .then((res) => {
                if (res.data.code) {
                    error(res.data);
                } else {
                    success(res.data);
                }
            }).catch((err) => {
            error(err);
        });
    }
    postInvoiceInfo(data: any, success: (res: any) => void, error: (res: any) => void) {
        axios.post(`/meetingcloud/apps/message/api/v1/addInvoice`, data)
            .then((res) => {
                if (res.data.code) {
                    error(res.data);
                } else {
                    success(res.data);
                }
            }).catch((err) => {
            error(err);
        });
    }
    getLastInvoiceLog(success: (res: any) => void, error: (res: any) => void) {
        axios.get(`/meetingcloud/apps/message/api/v1/getLastInvoiceLog`)
            .then((res) => {
                if (res.data.code) {
                    error(res.data);
                } else {
                    success(res.data);
                }
            }).catch((err) => {
            error(err);
        });
    }
    getPayLink(params: {
        payType: string;
        id: string;
    }, success: (res: any) => void, error: (res: any) => void) {
        axios.get(`/meetingcloud/apps/message/api/v1/getPayUrl`, {
            params: {
                ...params
            }
        })
            .then((res) => {
                if (res.data.code) {
                    error(res.data);
                } else {
                    success(res.data);
                }
            }).catch((err) => {
            error(err);
        });
    }
    getContinuePay(data: {
        payType: string;
        id: string;
    }, success: (res: any) => void, error: (res: any) => void) {
        axios.post(`/meetingcloud/apps/message/api/v1/payEnd`, data)
            .then((res) => {
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

export default ShortMessageServices;