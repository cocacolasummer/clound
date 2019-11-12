import React from 'react';
import {Button} from 'antd';

import {
    VideoMeetingWrapper,
    VideoMeetingItem,
    VideoMeetingItemTitle,
    VideoMeetingItemKey,
    VideoMeetingItemStatus
} from './ui';

const data = [
    {
        name: '前端组终端1号',
        key: '001010',
        online: 1
    },
    {
        name: '前端组终端1号',
        key: '001010',
        online: 0
    },
    {
        name: '前端组终端1号',
        key: '001010',
        online: 0
    },
    {
        name: '前端组终端1号',
        key: '001010',
        online: 0
    }
];

const DetailVideoMeeting = () => {

    const MeetingVideoItems = data.map((item, index) => {
        return (
            <VideoMeetingItem key={index}>
                <VideoMeetingItemTitle>{item.name}</VideoMeetingItemTitle>
                <VideoMeetingItemKey><span>序号:</span>{item.key}</VideoMeetingItemKey>
                <Button disabled={item.online !== 1} type={'primary'} block>邀请</Button>
                <VideoMeetingItemStatus
                    type={item.online === 1 ? 'online' : ''}><span></span>{item.online === 1 ? '在线' : '离线'}
                </VideoMeetingItemStatus>
            </VideoMeetingItem>
        );
    });

    return (
        <VideoMeetingWrapper>
            {MeetingVideoItems}
        </VideoMeetingWrapper>
    );
};

export {
    DetailVideoMeeting
};