import React from 'react';
import {Status} from './ui';

const statusObj: any = {
    '0': {
        name: '待审核',
        color: '#3c70f5'
    },
    '1': {
        name: '已预约',
        color: 'blue'
    },
    '2': {
        name: '已取消',
        color: '#9a9a9a'
    },
    '3': {
        name: '未开始',
        color: '#2db7f5'
    },
    '4': {
        name: '进行中',
        color: '#87d068'
    },
    '5': {
        name: '已结束',
        color: '#f50'
    },
    '6': {
        name: '审核拒绝',
        color: 'red'
    },
    '7': {
        name: '已过期',
        color: 'orange'
    }
};

interface MeetingStatusProps {
    type: number | string;
}

const MeetingStatus: React.ComponentType<MeetingStatusProps> = (props: MeetingStatusProps) => {
    return (
        <Status type={statusObj[props.type + ''].color}>
            <small></small>
            {statusObj[props.type].name}
        </Status>
    );
};

export {
    MeetingStatus
};