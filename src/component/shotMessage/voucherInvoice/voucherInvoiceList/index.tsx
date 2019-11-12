import React, {useEffect} from 'react';
import {getAllRangeQuickSet} from '@/util/rangePickerUtil';
import {
    ShowListHeader,
    ShowListOperateNoForm,
    ShowListTitle,
    ShowListWrapper,
    ShowListFooter
} from "@/baseUI/BaseShowList";

import {Button, DatePicker, Radio, Input, Pagination} from "antd";

const {Search} = Input;
const {RangePicker} = DatePicker;

import {VoucherInvoiceTable} from './table';
import {VoucherInvoiceCrow} from './crow';
import {CSSTransition} from "react-transition-group";
import ShortMessageServices from '@/services/shortMessageServices';
import {error} from "@/util/golbalModalMessage";
const _shortMessageServices = new ShortMessageServices();

import {IState} from "@/store";
import {useDispatch, useMappedState} from "redux-react-hook";
import moment from "moment";

const mapState = (state: IState) => {
    return {
        date: state.VoucherInvoiceList.date,
        page: state.VoucherInvoiceList.page,
        limit: state.VoucherInvoiceList.limit,
        total: state.VoucherInvoiceList.total,
        search: state.VoucherInvoiceList.search,
        status: state.VoucherInvoiceList.status,
        crowMount: state.VoucherInvoiceList.crowMount
    };
};
const VoucherInvoiceList: React.ComponentType = () => {
    const dispatch = useDispatch();
    const {
        date,
        search,
        status,
        page,
        limit,
        total,
        crowMount
    } = useMappedState(mapState);
    useEffect(() => {
        _shortMessageServices.getInvoiceList({
            'end_time': date[1],
            search: search,
            'start_time': date[0],
            status: status,
            page: 1
        }, (res: any) => {
            dispatch({
                type: 'change voucherInvoiceList list',
                list: res.data.data,
                page: res.data.current_page,
                total: res.data.total,
                limit: res.data.per_page,
            });
        }, (err: any) => {
            error(err && err.message ? err.message : err.toString());
        });
    }, [date, search, status]);
    return (
        <CSSTransition
            in={true}
            timeout={1000}
            unmountOnExit
            appear={true}
        >
        <ShowListWrapper>
            <ShowListHeader>
                <ShowListTitle>发票列表</ShowListTitle>
                <ShowListOperateNoForm>
                    <Radio.Group value={status} style={{marginRight: 15}}
                                 onChange={(e) => {
                                     dispatch({
                                         type: 'change voucherInvoiceList status',
                                         status: e.target.value
                                     });
                                 }}
                                 buttonStyle={"solid"}>
                        <Radio.Button value={"0"}>开票中</Radio.Button>
                        <Radio.Button value={"1"}>已开票</Radio.Button>
                    </Radio.Group>
                    <RangePicker
                        onChange={(dates: any) => {
                            dispatch({
                                type: 'change voucherInvoiceList date',
                                date: [dates[0].format('YYYY-MM-DD'), dates[1].format('YYYY-MM-DD')]
                            });
                        }}
                        ranges={getAllRangeQuickSet()}
                        value={[moment(date[0]), moment(date[1])]} format={['YYYY年MM月DD日', 'YYYY年-MM月DD日']}
                        allowClear={false}
                        style={{marginRight: 15}}/>
                    <Search placeholder={"请输入搜索内容"}
                            onSearch={(value) => {
                                dispatch({
                                    type: 'change voucherInvoiceList search',
                                    search: value
                                });
                            }}
                            style={{width: 150, marginRight: 15}}/>
                    <Button type={"primary"}>导出Excel</Button>
                </ShowListOperateNoForm>
            </ShowListHeader>
            <VoucherInvoiceTable/>
            <ShowListFooter>
                <Pagination current={page}
                            onChange={page => dispatch({
                                type: 'change voucherInvoiceList page',
                                page: page,
                            })}
                            pageSize={limit} total={total}/>
            </ShowListFooter>
            {
                crowMount ? <VoucherInvoiceCrow/> : null
            }
        </ShowListWrapper>
        </CSSTransition>
    );
};

export {
    VoucherInvoiceList
};
