import React, {useEffect, useState} from 'react';
import {DatePicker, Pagination, Spin} from "antd";

const {RangePicker} = DatePicker;
import {Chart, Tooltip, Axis, Legend, Coord, Pie, Guide} from 'viser-react';
import {useMappedState} from 'redux-react-hook';
import {CustomEmpty} from "@/component/customEmpty";
import MeetingStatisticServices from '@/services/meetingStatisticServices';

const _meetingStatisticServices = new MeetingStatisticServices();
import {useDispatch} from "redux-react-hook";
import {
    RoomTotalWrapper,
    CardHeader,
    CardHeaderTitle,
    FooterPagination, StatisticOperate
} from './ui';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const DataSet = require("@antv/data-set");

import {IState} from "@/store";
import {error} from "@/util/golbalModalMessage";
import moment from "moment";

const mapState = (state: IState) => {
    return {
        roomTotal: state.MeetingStatistic.roomTotal,
        roomTotalDate: state.MeetingStatistic.roomTotalDate,
        roomTotalPage: state.MeetingStatistic.roomTotalPage,
        roomTotalCount: state.MeetingStatistic.roomTotalCount
    };
};

const scale = [{
    dataKey: 'percent',
    min: 0,
    formatter: '.0%',
}];

const RoomTotal = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();
    const {
        roomTotal,
        roomTotalDate,
        roomTotalPage,
        roomTotalCount
    } = useMappedState(mapState);

    const setInitialToolTips = (name: string, count: number) => {
        const titleDom = document.querySelector('#pieTotalTitle');
        titleDom && (titleDom.innerHTML = `${name}<br><span style="color:#8c8c8c;font-size:20px">${count || 0}</span>分钟`);
    };
    useEffect(() => {
        setLoading(true);
        _meetingStatisticServices.getCompanyRank({
            page: 1,
            'start_time': roomTotalDate[0],
            'end_time': roomTotalDate[1]
        }, (res: any) => {
            dispatch({
                type: 'change meetingStatistic roomTotal',
                roomTotal: res.data.list,
                roomTotalCount: parseInt(res.data.count) || 0
            });
            setLoading(false);
        }, (err: any) => {
            error(err.message ? err.message : err.toString());
            setLoading(false);
        });
    }, [dispatch, roomTotalDate]);
    useEffect(() => {
        setLoading(true);
        _meetingStatisticServices.getCompanyRank({
            page: roomTotalPage,
            'start_time': roomTotalDate[0],
            'end_time': roomTotalDate[1]
        }, (res: any) => {
            dispatch({
                type: 'change meetingStatistic roomTotal',
                roomTotal: res.data.list,
                roomTotalCount: parseInt(res.data.count) || 0
            });
            setLoading(false);
        }, (err: any) => {
            error(err.message ? err.message : err.toString());
            setLoading(false);
        });
    }, [dispatch, roomTotalDate, roomTotalPage]);
    useEffect(() => {
        const mapRoomTotal = roomTotal.map((item: any) => {
            return {
                name: item.name,
                count: parseInt(item.count_meeting),
                minutes: parseInt(item.sum_minutes)
            };
        });
        const dv = new DataSet.View().source(mapRoomTotal);
        dv.transform({
            type: 'percent',
            field: 'minutes',
            dimension: 'name',
            as: 'percent'
        });
        setData(dv.rows);
    }, [roomTotal]);

    const container = `
        <div class="g2-legend" style="right: 0 !important;">
            <table class="g2-legend-list" style="list-style-type:none;margin:0;padding:0;width: 250px"></table>
        </div>
    `;
    const lagendCustom: any = (value: any, color: any, checked: any, index: any) => {
        const item = data[index];
        const checkedSet = checked ? 'checked' : 'unChecked';
        return `
            <tr class="g2-legend-list-item item-${index} ${checkedSet}" data-value="${value}" data-color="${color}"
                style="cursor: pointer; font-size: 14px; margin-right: 0 !important; white-space: nowrap;"
            >
                 <td style="display: inline-block; width: 76px; border: none; padding: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                   <i class="g2-legend-marker" style="width:10px;height:10px;display:inline-block;margin-right:10px;background-color: ${color}"></i>
                   <span class="g2-legend-text">${value}</span>
                </td>
                <td style="display: inline-block; width: 50px; text-align: left;border: none;padding:0; color: ${color}">${Math.round(item && item.percent * 100)}%</td>
                <td style="display: inline-block; width: 100px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"><span style="color: ${color};">${item && item.minutes}</span>分钟</td>
            </tr>
        `;
    };

    const totalCount = roomTotal.length > 1 ? roomTotal.reduce((total: any, item: any, index: number) => {
        if (index === 1) {
            return parseInt(total['sum_minutes']) + parseInt(item['sum_minutes']);
        }
        return total + parseInt(item['sum_minutes']);
    }) : ((roomTotal[0] && roomTotal[0]['sum_minutes']) || 0);

    const guidConfig: any = {
        type: 'html',
        position: ['50%', '50%'],
        html: `<div style="color:#8c8c8c;font-size: 14px;text-align: center;width: 10em;" id="pieTotalTitle">累计时长<br><span style="color:#8c8c8c;font-size:20px">${totalCount}</span>分钟</div>`,
        alignX: 'middle',
        alignY: 'middle'
    };

    const pieEvent = {
        onMouseEnter: (e: any) => {
            setInitialToolTips(e.data._origin['name'], e.data._origin['minutes']);
        },
        onMouseLeave: () => {
            setInitialToolTips('累计时长', totalCount);
        }
    };

    return (
        <RoomTotalWrapper>
            <Spin delay={100} spinning={loading}>
                <CardHeader>
                    <CardHeaderTitle>企业部门参会统计排名</CardHeaderTitle>
                    <StatisticOperate>
                        <RangePicker
                            value={[moment(roomTotalDate[0], 'YYYY-MM-DD'), moment(roomTotalDate[1], 'YYYY-MM-DD')]}
                            format={"YYYY年MM月DD日"}
                            allowClear={false}
                            onChange={(dates: any) => {
                                dispatch({
                                    type: 'change meetingStatistic roomTotalDate',
                                    roomTotalDate: [dates[0].format('YYYY-MM-DD'), dates[1].format('YYYY-MM-DD')]
                                });
                            }}/>
                    </StatisticOperate>
                </CardHeader>
                <div style={{height: 300, textAlign: 'left'}}>
                    {
                        data && data.length > 0 ?
                            <Chart height={300} padding={[10, 220, 10, 10]} data={data} scale={scale}>
                                <Tooltip showTitle={false}/>

                                <Guide {...guidConfig}/>
                                <Axis/>
                                <Legend width={250} position={"right-center"} useHtml={true} containerTpl={container}
                                        itemTpl={lagendCustom}/>
                                <Coord type="theta" radius={0.75} innerRadius={0.6}/>
                                <Pie {...pieEvent} position="percent" color="name"
                                     style={{stroke: '#fff', lineWidth: 1}}
                                />
                            </Chart> : <div style={{padding: 20}}><CustomEmpty/></div>
                    }
                </div>
                <FooterPagination>
                    <Pagination style={{lineHeight: '49px'}}
                                pageSize={5}
                                onChange={(page: number) => {
                                    dispatch({
                                        type: 'change meetingStatistic roomTotalPage',
                                        roomTotalPage: page
                                    });
                                }}
                                showLessItems={true} current={roomTotalPage} total={roomTotalCount}/>
                </FooterPagination>
            </Spin>
        </RoomTotalWrapper>
    );
};

export {
    RoomTotal
};