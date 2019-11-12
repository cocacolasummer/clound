import React from 'react';
import {Table} from "antd";
import {IState} from "@/store";
import {useMappedState, useDispatch} from "redux-react-hook";

const mapState = (state: IState) => {
    return {
        list: state.VoucherInvoiceList.list
    };
};

const VoucherInvoiceTable: React.ComponentType = () => {
    const dispatch = useDispatch();
    const {
        list
    } = useMappedState(mapState);
    const tableHeader: any = [
        {
            title: '申请时间',
            dataIndex: 'create_time',
            key: 'create_time',
            align: 'center'
        },
        {
            title: '订单号',
            dataIndex: 'order',
            key: 'order',
            align: 'center',
            // eslint-disable-next-line react/display-name
            render: (text: any, record: any, index: number) => {
                return (
                    <a onClick={() => {
                        dispatch({
                            type: 'change voucherInvoiceList crowShow',
                            showData: record
                        });
                    }}>{text}</a>
                );
            }
        },
        {
            title: '发票抬头',
            dataIndex: 'top',
            key: 'top',
            align: 'center'
        },
        {
            title: '发票金额(元)',
            dataIndex: 'count_fee',
            key: 'count_fee',
            align: 'center'
        },
        {
            title: '充值单位',
            dataIndex: 'company_name',
            key: 'company_name',
            align: 'center'
        },
        {
            title: '发票性质',
            dataIndex: 'type',
            key: 'type',
            align: 'center',
            // eslint-disable-next-line react/display-name
            render: (text: any, record: any, index: number) => {
                let content = '';
                switch (record.type) {
                    case "1":
                        content = '纸质发票';
                        break;
                    case "2":
                        content = '电子发票';
                        break;
                }
                return (
                    <span>{content}</span>
                );
            }
        }
    ];
    return (
        <Table rowKey={(record: any): string => record.id + ''} dataSource={list} pagination={false} columns={tableHeader}/>
    );
};

export {
    VoucherInvoiceTable
};