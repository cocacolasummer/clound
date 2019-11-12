import React, {useEffect, useRef, useState} from 'react';
import QueueAnim from 'rc-queue-anim';

import {
    CountImgCom,
    UserImgCom,
    TimeImgCom,
    RemarkImgCom
} from '@/assert/img/meeting/template';
import {useMappedState} from 'redux-react-hook';

import {
    ComTotalWrapper,
    ComTotalItem,
    ComTotalIcon,
    ComTotalTitle,
    ComTotalCount,
    ComTotalContent
} from './ui';

import {IState} from "@/store";

const mapState = (state: IState) => {
    return {
        comCount: state.MeetingStatistic.comCount
    };
};

const ComTotal = () => {
    const {comCount} = useMappedState(mapState);
    const _meetingCountInt = useRef<number>();
    const _userCountInt = useRef<number>();
    const _timeCountInt = useRef<number>();
    const _remarkCountInt = useRef<number>();
    const [meetingCount, setMeetingCount] = useState(0);
    const [userCount, setUserCount] = useState(0);
    const [timeCount, setTimeCount] = useState(0);
    const [remarkCount, setRemarkCount] = useState(0);

    useEffect(() => {

        if (comCount.meeting_count > meetingCount) {
            let oldState = meetingCount;
            _meetingCountInt.current = setInterval(() => {
                oldState += Math.round((comCount.meeting_count - meetingCount) / 10);
                setMeetingCount(oldState);
                if (oldState >= comCount.meeting_count) {
                    clearInterval(_meetingCountInt.current);
                    setMeetingCount(comCount.meeting_count);
                }
            }, 50);
        } else if (comCount.meeting_count < meetingCount) {
            let oldState = meetingCount;
            _meetingCountInt.current = setInterval(() => {
                oldState -= Math.round((meetingCount - comCount.meeting_count) / 10);
                setMeetingCount(oldState);
                if (oldState <= comCount.meeting_count) {
                    clearInterval(_meetingCountInt.current);
                    setMeetingCount(comCount.meeting_count);
                }
            }, 50);
        }
        return () => {
            clearInterval(_meetingCountInt.current);
        };
    }, [comCount.meeting_count, meetingCount]);

    useEffect(() => {

        if (comCount.attender_count > userCount) {
            let oldState = userCount;
            _userCountInt.current = setInterval(() => {
                oldState += Math.round((comCount.attender_count - userCount) / 10);
                setUserCount(oldState);
                if (oldState >= comCount.attender_count) {
                    clearInterval(_userCountInt.current);
                    setUserCount(comCount.attender_count);
                }
            }, 50);
        } else if (comCount.attender_count < userCount) {
            let oldState = userCount;
            _userCountInt.current = setInterval(() => {
                oldState -= Math.round((userCount - comCount.attender_count) / 10);
                setUserCount(oldState);
                if (oldState <= comCount.attender_count) {
                    clearInterval(_userCountInt.current);
                    setUserCount(comCount.attender_count);
                }
            }, 50);
        }
        return () => {
            clearInterval(_userCountInt.current);
        };
    }, [comCount.attender_count, userCount]);

    useEffect(() => {

        if (comCount.meeting_minutes > timeCount) {
            let oldState = timeCount;
            _timeCountInt.current = setInterval(() => {
                oldState += Math.round((comCount.meeting_minutes - timeCount) / 10);
                setTimeCount(oldState);
                if (oldState >= comCount.meeting_minutes) {
                    clearInterval(_userCountInt.current);
                    setTimeCount(comCount.meeting_minutes);
                }
            }, 50);
        } else if (comCount.attender_count < timeCount) {
            let oldState = timeCount;
            _timeCountInt.current = setInterval(() => {
                oldState -= Math.round((timeCount - comCount.meeting_minutes) / 10);
                setTimeCount(oldState);
                if (oldState <= comCount.meeting_minutes) {
                    clearInterval(_userCountInt.current);
                    setTimeCount(comCount.meeting_minutes);
                }
            }, 50);
        }
        return () => {
            clearInterval(_timeCountInt.current);
        };
    }, [comCount.meeting_minutes, comCount.attender_count, timeCount]);

    useEffect(() => {

        if (comCount.sign_count > remarkCount) {
            let oldState = remarkCount;
            _remarkCountInt.current = setInterval(() => {
                oldState += Math.round((comCount.sign_count - remarkCount) / 10);
                setRemarkCount(oldState);
                if (oldState >= comCount.sign_count) {
                    clearInterval(_remarkCountInt.current);
                    setRemarkCount(comCount.sign_count);
                }
            }, 50);
        } else if (comCount.sign_count < remarkCount) {
            let oldState = remarkCount;
            _remarkCountInt.current = setInterval(() => {
                oldState -= Math.round((remarkCount - comCount.sign_count) / 10);
                setRemarkCount(oldState);
                if (oldState <= comCount.sign_count) {
                    clearInterval(_remarkCountInt.current);
                    setRemarkCount(comCount.sign_count);
                }
            }, 50);
        }
        return () => {
            clearInterval(_remarkCountInt.current);
        };
    }, [comCount.sign_count, remarkCount]);

    return (
        <QueueAnim component={ComTotalWrapper} delay={300}>
            <ComTotalItem key={13}>
                <ComTotalIcon>
                    <img src={CountImgCom}/>
                </ComTotalIcon>
                <ComTotalContent>
                    <ComTotalTitle type='1'>企业会议次数</ComTotalTitle>
                    <ComTotalCount type='1'>{meetingCount}</ComTotalCount>
                </ComTotalContent>
            </ComTotalItem>
            <ComTotalItem key={14}>
                <ComTotalIcon>
                    <img src={UserImgCom}/>
                </ComTotalIcon>
                <ComTotalContent>
                    <ComTotalTitle type='2'>企业会议参与人次</ComTotalTitle>
                    <ComTotalCount type='2'>{userCount}</ComTotalCount>
                </ComTotalContent>
            </ComTotalItem>
            <ComTotalItem key={15}>
                <ComTotalIcon>
                    <img src={TimeImgCom}/>
                </ComTotalIcon>
                <ComTotalContent>
                    <ComTotalTitle type='3'>企业会议时间/分钟</ComTotalTitle>
                    <ComTotalCount type='3'>{timeCount}</ComTotalCount>
                </ComTotalContent>
            </ComTotalItem>
            <ComTotalItem key={16}>
                <ComTotalIcon>
                    <img src={RemarkImgCom}/>
                </ComTotalIcon>
                <ComTotalContent>
                    <ComTotalTitle>企业会议签到次数</ComTotalTitle>
                    <ComTotalCount>{remarkCount}</ComTotalCount>
                </ComTotalContent>
            </ComTotalItem>
        </QueueAnim>
    );
};

export {
    ComTotal
};