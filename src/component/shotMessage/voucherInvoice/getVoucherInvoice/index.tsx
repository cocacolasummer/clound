import React, {useEffect} from 'react';
import {IState} from '@/store';

const mapState = (state: IState) => {
    return {
        crowMount: state.GetVoucherInvoice.crowMount,
        list: state.GetVoucherInvoice.list,
        date: state.GetVoucherInvoice.date,
        search: state.GetVoucherInvoice.search,
        selectKeys: state.GetVoucherInvoice.selectKey,
        balance: state.GetVoucherInvoice.balance,
        selectKey: state.GetVoucherInvoice.selectKey,
    };
};
import ShortMessageServices from '@/services/shortMessageServices';

const _shortMessageServices = new ShortMessageServices();

import {
    ShowListHeader,
    ShowListOperateNoForm,
    ShowListTitle,
    ShowListWrapper
} from "@/baseUI/BaseShowList";
import {
    GetInvoiceFooter,
    FooterInvoiceLeft,
    FooterInvoiceRight
} from './ui';
import {GetInvoiceStepCrow} from './crow';
import {Button, DatePicker, Input} from "antd";

const {Search} = Input;
const {RangePicker} = DatePicker;
import {GetVoucherInvoiceTable} from './table';
import {useMappedState, useDispatch} from "redux-react-hook";
import {CSSTransition} from "react-transition-group";
import {error} from "@/util/golbalModalMessage";
import moment from "moment";
import {getAllRangeQuickSet} from "@/util/rangePickerUtil";

const GetVoucherInvoice: React.ComponentType = () => {
    const dispatch = useDispatch();
    const {
        crowMount,
        date,
        search,
        balance,
        selectKey,
        list
    } = useMappedState(mapState);

    useEffect(() => {
        _shortMessageServices.getCanGetInvoiceVoucher({
            'end_time': date[1],
            search: search,
            'start_time': date[0]
        }, (res: any) => {
            dispatch({
                type: 'change getVoucherInvoice list',
                list: res.data.data,
                balance: res.data.balance
            });
        }, (err: any) => {
            error(err && err.message ? err.message : err.toString());
        });
    }, [date, search]);

    const getSelectTotal = () => {
        const data = list.filter((item: any) => {
            return selectKey.indexOf(item.id + '') !== -1;
        });
        console.log(data);
        let total = 0;
        if(data.length === 1) {
            total = parseFloat(data[0].fee);
        }else if(data.length === 0) {
            total = 0;
        }else {
            total = data.reduce((total: any, item: any, index: number) => {
                if(index === 1) {
                    return parseFloat(total.fee) + parseFloat(item.fee);
                }
                return total + parseFloat(item.fee);
            });
        }
        return total;
    };

    return (
        <CSSTransition
            in={true}
            timeout={1000}
            unmountOnExit
            appear={true}
        >
        <ShowListWrapper>
            <ShowListHeader>
                <ShowListTitle>发票索取</ShowListTitle>
                <ShowListOperateNoForm>
                    <RangePicker
                        onChange={(dates: any) => {
                            dispatch({
                                type: 'change getVoucherInvoice date',
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
                                    type: 'change getVoucherInvoice search',
                                    search: value
                                });
                            }}
                            style={{width: 150, marginRight: 15}}/>
                    <Button type={"primary"}>导出Excel</Button>
                </ShowListOperateNoForm>
            </ShowListHeader>
            <GetVoucherInvoiceTable/>
            <GetInvoiceFooter>
                <FooterInvoiceLeft>
                    本月剩余次数：<strong>{balance}</strong>
                </FooterInvoiceLeft>
                <FooterInvoiceRight>
                    待开票金额：<strong>￥{
                    getSelectTotal()
                }</strong>
                    <Button type={"primary"}
                            disabled={balance < 1 || selectKey.length < 1}
                    onClick={(): void => {
                        dispatch({
                            type: 'change getVoucherInvoice crowShow'
                        });
                    }}>索取发票</Button>
                </FooterInvoiceRight>
            </GetInvoiceFooter>
            {
                crowMount ? <GetInvoiceStepCrow/> : null
            }
        </ShowListWrapper>
        </CSSTransition>
    );
};

export {
    GetVoucherInvoice
};
