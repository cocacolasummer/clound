import React, {Fragment, useEffect, useState} from 'react';
import {Avatar, Progress, DatePicker, Pagination, Spin} from 'antd';
import moment from 'moment';

const {RangePicker} = DatePicker;
import {useDispatch, useMappedState} from 'redux-react-hook';
import {CustomEmpty} from "@/component/customEmpty";
import MeetingStatisticServices from '@/services/meetingStatisticServices';

const _meetingStatisticServices = new MeetingStatisticServices();
import {
    RankOneImg,
    RankTwoImg,
    RankThreeImg
} from '@/assert/img/meeting/template';

import {
    StatisticOperate,
    CardHeader,
    CardHeaderTitle,
    ComRankWrapper,
    ComRankContent,
    ComRankListTH,
    ComRankListItem,
    ComRankListRank,
    ComRankListName,
    ComRankListCount, FooterPagination
} from './ui';

import {
    UIGrid,
    UICol
} from '@/baseUI/Grid';

import {IState} from "@/store";
import {error} from "@/util/golbalModalMessage";

const mapState = (state: IState) => {
    return {
        comRank: state.MeetingStatistic.comRank,
        comRankDate: state.MeetingStatistic.comRankDate,
        comRankPage: state.MeetingStatistic.comRankPage,
        comRankCount: state.MeetingStatistic.comRankCount
    };
};

const ComRank = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const {
        comRankDate,
        comRank,
        comRankPage,
        comRankCount
    } = useMappedState(mapState);
    useEffect(() => {
        setLoading(true);
        _meetingStatisticServices.getPersonalRank({
            page: 1,
            'start_time': comRankDate[0],
            'end_time': comRankDate[1]
        }, (res: any) => {
            dispatch({
                type: 'change meetingStatistic comRank',
                comRank: res.data.list,
                comRankCount: parseInt(res.data.count) || 0
            });
            setLoading(false);
        }, (err: any) => {
            error(err.message ? err.message : err.toString());
            setLoading(false);
        });
    }, [comRankDate, dispatch]);
    useEffect(() => {
        setLoading(true);
        _meetingStatisticServices.getPersonalRank({
            page: comRankPage,
            'start_time': comRankDate[0],
            'end_time': comRankDate[1]
        }, (res: any) => {
            dispatch({
                type: 'change meetingStatistic comRank',
                comRank: res.data.list,
                comRankCount: parseInt(res.data.count) || 0
            });
            setLoading(false);
        }, (err: any) => {
            error(err.message ? err.message : err.toString());
            setLoading(false);
        });
    }, [comRankDate, comRankPage, dispatch]);
    const listItem = comRank && comRank.map((item: any, index: number) => {
        let rankItem;
        const rank = (comRankPage - 1) * 5 + index + 1;
        switch (rank) {
            case 1:
                rankItem = <img src={RankOneImg} alt=""/>;
                break;
            case 2:
                rankItem = <img src={RankTwoImg} alt=""/>;
                break;
            case 3:
                rankItem = <img src={RankThreeImg} alt=""/>;
                break;
            default:
                rankItem = <span>{rank}</span>;
        }
        return (
            <ComRankListItem key={index}>
                <ComRankListRank span={3}>
                    {rankItem}
                </ComRankListRank>
                <ComRankListName span={5}>
                    {item.avatar ? <Avatar src={item.avatar}/> : null}
                    <span style={{marginLeft: '10px'}}>{item.displayname}</span>
                </ComRankListName>
                <ComRankListCount span={16}>
                    <UIGrid>
                        <UICol span={14}>
                            <Progress
                                strokeColor={{
                                    '0%': '#108ee9',
                                    '100%': '#87d068',
                                }}
                                status="active"
                                showInfo={false}
                                percent={(item.countMinutes / comRank[0].countMinutes) * 100}
                            />
                        </UICol>
                        <UICol span={10}>
                            <small>{item.countMinutes}分钟<span>{item.countTimes}次</span></small>
                        </UICol>
                    </UIGrid>
                </ComRankListCount>
            </ComRankListItem>
        );
    });
    return (
        <ComRankWrapper>
            <Spin spinning={loading}>
                <CardHeader>
                    <CardHeaderTitle>个人参会排名</CardHeaderTitle>
                    <StatisticOperate>
                        <RangePicker
                            value={[moment(comRankDate[0], 'YYYY-MM-DD'), moment(comRankDate[1], 'YYYY-MM-DD')]}
                            format={"YYYY年MM月DD日"}
                            allowClear={false}
                            onChange={(dates: any) => {
                                dispatch({
                                    type: 'change meetingStatistic comRankDate',
                                    comRankDate: [dates[0].format('YYYY-MM-DD'), dates[1].format('YYYY-MM-DD')]
                                });
                            }}/>
                    </StatisticOperate>
                </CardHeader>
                <ComRankContent>
                    {
                        comRank && comRank.length > 0 ? <Fragment>
                            <ComRankListTH>
                                <UICol span={3}>排名</UICol>
                                <UICol span={5}>姓名</UICol>
                                <UICol span={16}>时长/次数</UICol>
                            </ComRankListTH>
                            {listItem}
                        </Fragment> : <CustomEmpty/>
                    }
                </ComRankContent>
                <FooterPagination>
                    <Pagination style={{lineHeight: '49px'}}
                                pageSize={5}
                                onChange={(page: number) => {
                                    dispatch({
                                        type: 'change meetingStatistic comRankPage',
                                        comRankPage: page
                                    });
                                }}
                                showLessItems={true} current={comRankPage} total={comRankCount}/>
                </FooterPagination>
            </Spin>
        </ComRankWrapper>
    );
};

export {
    ComRank
};