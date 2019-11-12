import React, {useEffect} from 'react';
import {useMappedState} from 'redux-react-hook';
import Texty from 'rc-texty';
import 'rc-texty/assets/index.css';
import {useDispatch} from "redux-react-hook";
import MeetingStatisticServices from '@/services/meetingStatisticServices';

const _meetingStatisticServices = new MeetingStatisticServices();
import {
    CountImg,
    RemarkImg,
    RemarkPerImg,
    TimeImg
} from '@/assert/img/meeting/template';

import {
    UserCountWrapper,
    UserCountItem,
    UserCountIcon,
    UserCountContent,
    UserCountTitle,
    UserCountTotal
} from './ui';

import {IState} from "@/store";
import {error} from "@/util/golbalModalMessage";

const mapState = (state: IState) => {
    return {
        userCount: state.MeetingStatistic.userCount
    };
};

const UserCount = () => {
    const {userCount} = useMappedState(mapState);
    const dispatch = useDispatch();
    useEffect(() => {
        _meetingStatisticServices.getStatistic((res: any) => {
            dispatch({
                type: 'change meetingStatistic userCount',
                userCount: res.data
            });
        }, (err: any) => {
            error(err.message ? err.message : err.toString());
        });
    }, [dispatch]);

    return (
        <UserCountWrapper>
            <UserCountItem type={'count'} key={1}>
                <UserCountIcon>
                    <img src={CountImg}/>
                </UserCountIcon>
                <UserCountContent>
                    <UserCountTitle><Texty>企业会议次数</Texty></UserCountTitle>
                    <UserCountTotal><Texty type={'left'}
                                           mode={'smooth'}>{`${userCount.meeting_count ? userCount.meeting_count : '0'}`}</Texty></UserCountTotal>
                </UserCountContent>
            </UserCountItem>
            <UserCountItem type={'remark'} key={2}>
                <UserCountIcon>
                    <img src={RemarkImg}/>
                </UserCountIcon>
                <UserCountContent>
                    <UserCountTitle><Texty>企业参会人次</Texty></UserCountTitle>
                    <UserCountTotal><Texty type={'left'}
                                           mode={'smooth'}>{`${userCount.attender_count ? userCount.attender_count : '0'}`}</Texty></UserCountTotal>
                </UserCountContent>
            </UserCountItem>
            <UserCountItem key={3}>
                <UserCountIcon>
                    <img src={TimeImg}/>
                </UserCountIcon>
                <UserCountContent>
                    <UserCountTitle><Texty>企业会议时间/分钟</Texty></UserCountTitle>
                    <UserCountTotal><Texty type={'left'}
                                           mode={'smooth'}>{`${userCount.meeting_minutes ? userCount.meeting_minutes : '0'}`}</Texty></UserCountTotal>
                </UserCountContent>
            </UserCountItem>
            <UserCountItem type={'remarkPer'} key={4}>
                <UserCountIcon>
                    <img src={RemarkPerImg}/>
                </UserCountIcon>
                <UserCountContent>
                    <UserCountTitle><Texty>企业会议签到率</Texty></UserCountTitle>
                    <UserCountTotal><Texty type={'left'}
                                           mode={'smooth'}>{`${userCount.sign_count ? userCount.sign_count : '0'}`}</Texty></UserCountTotal>
                </UserCountContent>
            </UserCountItem>
        </UserCountWrapper>
    );
};

export {
    UserCount
};