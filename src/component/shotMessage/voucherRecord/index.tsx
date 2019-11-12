import React, {useEffect, useState} from 'react';

import {
    ShowListWrapper,
    ShowListHeader,
    ShowListTitle,
    ShowListOperateNoForm,
    ShowListFooter
} from '@/baseUI/BaseShowList';
import {Button, Input, DatePicker, Spin, Pagination, Radio} from "antd";

const {Search} = Input;
const {RangePicker} = DatePicker;

import {VoucherRecordTable} from './table';
import {CSSTransition} from "react-transition-group";

import {useDispatch, useMappedState} from "redux-react-hook";
import {IState} from "@/store";
import moment from "moment";
import ShortMessageServices from '@/services/shortMessageServices';
import {error} from "@/util/golbalModalMessage";
import {getAllRangeQuickSet} from "@/util/rangePickerUtil";
const _shortMessageServices = new ShortMessageServices();

const mapState = (state: IState) => {
    return {
        search: state.VoucherRecord.search,
        date: state.VoucherRecord.date,
        status: state.VoucherRecord.status,
        page: state.VoucherRecord.page,
        total: state.VoucherRecord.total,
        limit: state.VoucherRecord.limit
    };
};

const VoucherRecord: React.ComponentType = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const {
        search,
        date,
        status,
        page,
        limit,
        total
    } = useMappedState(mapState);
    useEffect(() => {
        setLoading(true);
        _shortMessageServices.getVoucherRecord({
            'end_time': date[1],
            page: 1,
            search: search,
            'start_time': date[0],
            status: status
        }, (res: any) => {
            dispatch({
                type: 'change voucherRecord list',
                list: res.data.data,
                page: res.data.current_page,
                total: res.data.total,
                limit: res.data.per_page
            });
            setLoading(false);
        }, (err: any) => {
            error(err && err.message ? err.message : err.toString());
            setLoading(false);
        });
    }, [search, date, status]);
    useEffect(() => {
        setLoading(true);
        _shortMessageServices.getVoucherRecord({
            'end_time': date[1],
            page: page,
            search: search,
            'start_time': date[0],
            status: status
        }, (res: any) => {
            dispatch({
                type: 'change voucherRecord list',
                list: res.data.data,
                page: res.data.current_page,
                total: res.data.total,
                limit: res.data.per_page
            });
            setLoading(false);
        }, (err: any) => {
            error(err && err.message ? err.message : err.toString());
            setLoading(false);
        });
    }, [page]);
    return (
        <CSSTransition
            in={true}
            timeout={1000}
            unmountOnExit
            appear={true}
        >
        <ShowListWrapper>
            <Spin spinning={loading}>
            <ShowListHeader>
                <ShowListTitle>充值记录</ShowListTitle>
                <ShowListOperateNoForm>
                    <Radio.Group value={status}
                                 onChange={(e) => {
                                     dispatch({
                                         type: 'change voucherRecord status',
                                         status: e.target.value
                                     });
                                 }}
                                 style={{marginRight: 15}} buttonStyle={"solid"}>
                        <Radio.Button value={"0"}>全部</Radio.Button>
                        <Radio.Button value={"1"}>充值成功</Radio.Button>
                        <Radio.Button value={"-1"}>充值失败</Radio.Button>
                    </Radio.Group>
                    <RangePicker
                        onChange={(dates: any) => {
                            dispatch({
                                type: 'change voucherRecord date',
                                date: [dates[0].format('YYYY-MM-DD'), dates[1].format('YYYY-MM-DD')]
                            });
                        }}
                        ranges={getAllRangeQuickSet()}
                        value={[moment(date[0]), moment(date[1])]} format={['YYYY年MM月DD日', 'YYYY年-MM月DD日']}
                        allowClear={false}
                        style={{marginRight: 15}}/>
                    <Search placeholder={"请输入搜索内容"}
                            defaultValue={search}
                            onSearch={(value) => {
                                dispatch({
                                    type: 'change voucherRecord search',
                                    search: value
                                });
                            }}
                            style={{width: 150, marginRight: 15}}/>
                    <Button type={"primary"}>导出Excel</Button>
                </ShowListOperateNoForm>
            </ShowListHeader>
            <VoucherRecordTable/>
            <ShowListFooter>
                <Pagination current={page}
                            onChange={page => dispatch({
                                type: 'change voucherRecord page',
                                page: page,
                            })}
                            pageSize={limit} total={total}/>
            </ShowListFooter>
            </Spin>
        </ShowListWrapper>
        </CSSTransition>
    );
};

export {
    VoucherRecord
};