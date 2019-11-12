import React, {useEffect, useState} from 'react';
import {Chart, Tooltip, Axis, Bar, Coord, Legend} from 'viser-react';
import {useMappedState, useDispatch} from 'redux-react-hook';
import {DatePicker, Pagination, Spin} from "antd";

const {RangePicker} = DatePicker;
import {
    AttendTotalWrapper,
    CardHeader,
    CardHeaderTitle, FooterPagination, StatisticOperate
} from './ui';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const DataSet = require('@antv/data-set');

import {IState} from "@/store";
import {error} from "@/util/golbalModalMessage";
import MeetingStatisticServices from '@/services/meetingStatisticServices';
import moment from "moment";
import {CustomEmpty} from "@/component/customEmpty";

const _meetingStatisticServices = new MeetingStatisticServices();
const mapState = (state: IState) => {
    return {
        attendTotal: state.MeetingStatistic.attendTotal,
        attendTotalDate: state.MeetingStatistic.attendTotalDate,
        attendTotalPage: state.MeetingStatistic.attendTotalPage,
        attendTotalCount: state.MeetingStatistic.attendTotalCount
    };
};

const AttendTotal = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState();
    const [loading, setLoading] = useState();
    const {
        attendTotal,
        attendTotalDate,
        attendTotalPage,
        attendTotalCount
    } = useMappedState(mapState);
    useEffect(() => {
        setLoading(true);
        _meetingStatisticServices.getRoomRank({
            page: 1,
            'start_time': attendTotalDate[0],
            'end_time': attendTotalDate[1]
        }, (res: any) => {
            dispatch({
                type: 'change meetingStatistic attendTotal',
                attendTotal: res.data.rooms.map((item: any) => {
                    return {
                        count: parseInt(item.count) || 0,
                        minutes: parseInt(item.minutes) || 0,
                        roomId: item.roomId,
                        name: item.name
                    };
                }),
                attendTotalCount: parseInt(res.data.count.count) || 0
            });
            setLoading(false);
        }, (err: any) => {
            error(err.message ? err.message : err.toString());
            setLoading(false);
        });
    }, [attendTotalDate, dispatch]);
    useEffect(() => {
        setLoading(true);
        _meetingStatisticServices.getRoomRank({
            page: attendTotalPage,
            'start_time': attendTotalDate[0],
            'end_time': attendTotalDate[1]
        }, (res: any) => {
            dispatch({
                type: 'change meetingStatistic attendTotal',
                attendTotal: res.data.rooms.map((item: any) => {
                    return {
                        count: parseInt(item.count) || 0,
                        minutes: parseInt(item.minutes) || 0,
                        roomId: item.roomId,
                        name: item.name
                    };
                }),
                attendTotalCount: parseInt(res.data.count) || 0
            });
            setLoading(false);
        }, (err: any) => {
            error(err.message ? err.message : err.toString());
            setLoading(false);
        });
    }, [attendTotalDate, attendTotalPage, dispatch]);
    useEffect(() => {
        const dv = new DataSet.View().source(attendTotal);
        dv.transform({
            type: 'rename',
            map: {
                minutes: "时长统计",
                count: "参会次数"
            }
        }).rows;
        dv.transform({
            type: 'fold',
            fields: ['时长统计', '参会次数'],
            key: 'type',
            value: 'value',
        });
        const data = dv.rows;
        setData(data);
    }, [attendTotal]);

    return (
        <AttendTotalWrapper>
            <Spin delay={100} spinning={loading}>
                <CardHeader>
                    <CardHeaderTitle>会议室预约率统计</CardHeaderTitle>
                    <StatisticOperate>
                        <RangePicker
                            value={[moment(attendTotalDate[0], 'YYYY-MM-DD'), moment(attendTotalDate[1], 'YYYY-MM-DD')]}
                            format={"YYYY年MM月DD日"}
                            allowClear={false}
                            onChange={(dates: any) => {
                                dispatch({
                                    type: 'change meetingStatistic attendTotalDate',
                                    attendTotalDate: [dates[0].format('YYYY-MM-DD'), dates[1].format('YYYY-MM-DD')]
                                });
                            }}/>
                    </StatisticOperate>
                </CardHeader>
                <div style={{height: '500px'}}>
                    {
                        data && data.length > 0 ? <Chart width={1100} height={490} data={data} padding={"auto"}>
                            <Coord type="rect" direction="LT"/>
                            <Tooltip/>
                            <Legend position={"top-right"}/>
                            <Axis dataKey="value" position="right"/>
                            <Axis dataKey="name" label={{offset: 12}}/>
                            <Bar position="name*value"
                                 color={['type', ['rgba(35, 146, 255, 1)', 'rgba(255, 192, 0, 1)']]}
                                 adjust={[{type: 'dodge', marginRatio: 1 / 32}]}/>
                        </Chart> : <div style={{padding: 20}}><CustomEmpty/></div>
                    }
                </div>
                <FooterPagination>
                    <Pagination style={{lineHeight: '49px'}}
                                pageSize={10}
                                onChange={(page: number) => {
                                    dispatch({
                                        type: 'change meetingStatistic attendTotalPage',
                                        attendTotalPage: page
                                    });
                                }}
                                showLessItems={true} current={attendTotalPage} total={attendTotalCount}/>
                </FooterPagination>
            </Spin>
        </AttendTotalWrapper>
    );
};

export {
    AttendTotal
};