import axios from 'axios';

axios.defaults.withCredentials = true;

class GlobalServices {
    getDepartment(success: any, error: any): void {
        axios.get(`/meetingcloud/apps/department/api/v1/self`).then((res: any) => {
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

export default GlobalServices;
