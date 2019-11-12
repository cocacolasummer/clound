import React from 'react';
import {Table} from "antd";
import {IState} from "@/store";
import {useMappedState, useDispatch} from "redux-react-hook";

const mapState = (state: IState) => {
    return {
        list: state.GetVoucherInvoice.list,
        selectKey: state.GetVoucherInvoice.selectKey
    };
};

const GetVoucherInvoiceTable: React.ComponentType = () => {
    const dispatch = useDispatch();
    const {list, selectKey} = useMappedState(mapState);
    const tableHeader: any = [
        {
            title: '订单号',
            dataIndex: 'order_number',
            key: 'order_number',
            align: 'center'
        },
        {
            title: '充值时间',
            dataIndex: 'success_time',
            key: 'success_time',
            align: 'center'
        },
        {
            title: '套餐名称',
            dataIndex: 'type_name',
            key: 'type_name',
            align: 'center'
        },
        {
            title: '充值金额(元)',
            dataIndex: 'fee',
            key: 'fee',
            align: 'center'
        }
    ];
    const rowSelection = {
        selectedRowKeys: selectKey,
        onChange: (keys: any) => {
            dispatch({
                type: 'change getVoucherInvoice selectKey',
                selectKey: keys
            });
        }
    };
    return (
        <Table rowKey={(record: any): string => record.id + ''} rowSelection={rowSelection} dataSource={list} pagination={false} columns={tableHeader}/>
    );
};

export {
    GetVoucherInvoiceTable
};