import React, {useEffect, useState} from 'react';
import {DatePicker, Spin} from "antd";
import ShortMessageServices from '@/services/shortMessageServices';
const _shortMessageServices = new ShortMessageServices();
import {Chart, Tooltip, Axis, Legend, SmoothLine, Point} from 'viser-react';
import {IState} from '@/store';
import {CustomEmpty} from '@/component/customEmpty';
import {useDispatch, useMappedState} from "redux-react-hook";
const mapState = (state: IState) => {
    return {
        chartDate: state.ShortMessageStatistic.chartDate,
        chartData: state.ShortMessageStatistic.chartData
    };
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
const DataSet = require('@antv/data-set');

import {
    ItemChartWrap,
    ItemChartHeader,
    ItemChartTitle,
    ItemChartContent,
    ItemChartHeaderOp
} from './ui';
import moment from "moment";
import {error} from "@/util/golbalModalMessage";

const ItemChart: React.ComponentType = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const {
        chartDate,
        chartData
    } = useMappedState(mapState);
    useEffect(() => {
        setLoading(true);
        _shortMessageServices.getChartStatistic({
            type: 'month',
            start: `${chartDate}-1`,
            end: `${chartDate}-12`
        }, (res: any) => {
            dispatch({
                type: 'change shortMessageStatistic chartData',
                chartData: res.data.map((item: any) => ({
                    time: item.time,
                    count: parseInt(item.count)
                }))
            });
            setLoading(false);
        }, (err: any) => {
            error(err && err.message ? err.message : err.toString());
            setLoading(false);
        });
    }, [chartDate]);

    useEffect(() => {
        const dv = new DataSet.View().source(chartData);
        dv.transform({
            type: 'rename',
            map: {
                count: "短信数量",
            }
        }).rows;
        dv.transform({
            type: 'fold',
            fields: ['短信数量'],
            key: 'type',
            value: 'value',
        });
        console.log(dv.rows);
        setData(dv.rows);
    }, [chartData]);

    const scale = [{
        dataKey: 'time',
        min: 0,
        max: 1,
    }];
    return (
        <ItemChartWrap>
            <Spin spinning={loading}>
            <ItemChartHeader>
                <ItemChartTitle>年度短信通知统计</ItemChartTitle>
                <ItemChartHeaderOp>
                    <DatePicker
                        value={moment(chartDate, 'YYYY')}
                        onPanelChange={(value) => {
                            if (value) {
                                dispatch({
                                    type: 'change shortMessageStatistic chartDate',
                                    chartDate: value.format('YYYY')
                                });
                                setOpen(false);
                            }
                        }}
                        allowClear={false}
                        mode={'year'}
                        onOpenChange={() => setOpen(!open)}
                        open={open}
                        placeholder={'选择年份'}
                        format={'YYYY年'}/>
                </ItemChartHeaderOp>
            </ItemChartHeader>
            <ItemChartContent>
                {
                    chartData && chartData.length > 0 ? <Chart forceFit height={395} data={data} scale={scale}>
                        <Tooltip/>
                        <Axis/>
                        <Legend/>
                        <SmoothLine position="time*value" color="type"/>
                        <Point position="time*value" color="type" shape="circle"/>
                    </Chart> : <CustomEmpty/>
                }
            </ItemChartContent>
            </Spin>
        </ItemChartWrap>
    );
};

export {
    ItemChart
};